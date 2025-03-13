import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useRef, useCallback, useState } from "react";
import  { useSharedValue, withSpring } from "react-native-reanimated";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import { ErrorState } from "@/components/ui/ErrorState";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-portal";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
const { post } = createRequest();
const { width: SCREEN_WIDTH } = Dimensions.get("window");

//================================= GROUP ID ACCESS =================================
const query_keys = ["public-fasilitas", "comments"];
//===================================================================================

export default function CommentModal({currentUserId = "1" }) {
  const queryClient = useQueryClient();
  const firstTimeRef = useRef(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const translateX = useSharedValue(SCREEN_WIDTH);
  const inputRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [...query_keys, id],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const {
          data: { records, length },
        } = await post("/mobile/api/portal/fasilitas/comments", {
          offset: pageParam,
          id: id,
        });
        return {
          data: records || [],
          offset: pageParam,
          totalData: length || 0,
        };
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, pages) => {
      const nextOffset = lastPage.offset + 20;
      return nextOffset < lastPage.totalData ? nextOffset : undefined;
    },
    keepPreviousData: true,
  });

  const {
    mutate,
    isError: isErrorMutate,
    error: errorMutate,
    isPending : isSubmitting,
  } = useMutation({
    mutationFn: async (data) => {
      const { data: result } = await post(
        `/mobile/api/portal/fasilitas/comments/add`,
        {
          id: id,
          ...data,
        }
      );
      return result;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: [...query_keys, id] });
      const previousData = queryClient.getQueryData([...query_keys, id]);
      queryClient.setQueryData([...query_keys, id], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              data: [
                {
                  ...newData,
                  localCreatePending: true,
                },
                ...page.data,
              ],
            };
          }),
        };
      });
      return { previousData, newData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...query_keys, id] });
    },
    onError: (err, newUpdate, context) => {
      console.log(err);
      if (context?.previousData) {
        queryClient.setQueryData([...query_keys, id], context.previousData);
      }
      Alert.alert("Error", "Failed create Data. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [...query_keys, id] });
    },
  });

  useFocusEffect(
    useCallback(() => {
        translateX.value = withSpring(0, {
            damping: 20,
            stiffness: 90
        });
        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            return;
        }
        refetch();
    }, [refetch])
  );




  const onRefresh = useCallback(() => {
    refetch();
  }, []);





  const handleSubmit = () => {
    if (!newComment.trim() || isSubmitting) return;
    mutate({
        x_studio_comment_text:newComment.trim()
    });
    setNewComment("");
  };



  const dataFlat = data?.pages.flatMap((page) => page.data) ?? [];
  

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }} className="bg-white">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Comments</Text>
          <View className="w-10" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <LoadingSpinner size={32} color="#3b82f6" />
            <Text className="text-gray-500 mt-4">Loading comments...</Text>
          </View>
        ) : error ? (
          <ErrorState
            variant="default"
            message="Failed to load comments"
            action={onRefresh}
          />
        ) : (
          <FlatList
            data={dataFlat}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <CommentBubble
                  comment={item}
                  isOwn={item.userId === currentUserId}
                />
              );
            }}
            contentContainerStyle={{ padding: 16 }}
            onRefresh={onRefresh}
            refreshing={isLoading}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center py-8">
                <Text className="text-gray-500 text-center">
                  No comments yet
                </Text>
              </View>
            )}
          />
        )}

        <View
          style={{ paddingBottom: insets.bottom }}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <View className="flex-row items-end bg-gray-100 rounded-2xl p-2">
            <TextInput
              ref={inputRef}
              className="flex-1 max-h-24 px-3 py-2 text-base"
              placeholder="Write a comment..."
              multiline
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              className={`ml-2 p-2 rounded-full ${
                !newComment.trim() || isSubmitting
                  ? "bg-gray-300"
                  : "bg-blue-500"
              }`}
            >
              {isSubmitting ? (
                <LoadingSpinner size={20} color="#fff" />
              ) : (
                <Ionicons
                  name="send"
                  size={20}
                  color={!newComment.trim() ? "#9ca3af" : "#fff"}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}



function CommentBubble({ comment, isOwn }) {
  return (
    <View
      className={`flex-row mb-4 ${comment.isOwn ? "justify-end" : "justify-start"}`}
    >
      {!comment.isOwn && (
        <View className="w-8 h-8 rounded-full bg-gray-200 mr-2">
          <Image
            source={{ uri: comment.user?.avatar }}
            className="w-8 h-8 rounded-full"
          />
        </View>
      )}
      <View
        className={`max-w-[80%] rounded-2xl p-3 ${
            comment.isOwn ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        {!comment.isOwn && (
          <Text className="text-sm font-semibold text-gray-600">
            {comment?.x_studio_phone_number}
          </Text>
        )}
        <Text
          className={`text-xs mb-2 ${
            comment.isOwn ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {dayjs().to(dayjs.utc(comment?.create_date))}
        </Text>
        <Text className={comment.isOwn ? "text-white" : "text-gray-800"}>
          {comment.x_studio_comment_text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
