import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator, TextInput, Modal, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { ImageGrid } from "@/components/ui/ImageGrid";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { LoadingSpinner, ThreeDotsLoader } from "@/components/ui/LoadingIndicators";

import { fetchModelData } from "@/services/queryClient";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import createRequest from "@/services/api-secure-internal";
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
const blurhash = "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_DEV;

//================================= GROUP ID ACCESS =================================
const allowedGroupIds = [56, 80];
const x_studio_tags = [1]; // FASILITAS
const query_keys = ["humas_fasilitas"];
const model = 'x_humas_berita';
const fields = {
  x_studio_sequence: {},
  x_studio_content: {},
  x_studio_publish: {},
  x_studio_show_in_home: {},
  create_uid: { fields: { display_name: {} } },
  create_date: {},
  write_uid: { fields: { display_name: {} } },
  write_date: {}
}
//===================================================================================


export default function ContentFasilitas() {
  const router = useRouter();
  const firstTimeRef = useRef(true);
  const { internalUser } = useSelector((state) => state.auth);
  const { user, loading } = internalUser;
  const [refreshing, setRefreshing] = useState(false);


  const [{ domain, order, searchQuery },setParams] = useState({
    domain: [["x_studio_tags", "in", x_studio_tags]],
    searchQuery: "",
    order: "create_date DESC",
  });

  const { 
    data, 
    isLoading, 
    isError, 
    refetch, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage  
  } = useInfiniteQuery({
    queryKey: query_keys,
    queryFn: async ({ pageParam = 0 }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const result = await fetchModelData(post, {
          model: model,
          selectedFields: fields,
          order: order,
          limit: 20,
          count_limit: 100001,
          domain: domain,
          offset: pageParam,
        });
        return {
          data: result?.records || [],
          offset: pageParam,
          totalData: result?.length || 0,
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





  const canCreate = useMemo(() => {
    if(loading){
      return false;
    }
    return allowedGroupIds.includes(user?.department_id?.id);
  }, [user, loading]);




  useFocusEffect(
    useCallback(() => {
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



  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };



  const renderHeader = () => {
    return (
      <Fragment>
        <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row items-start justify-start">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 mt-1 bg-red-100 rounded-full items-center justify-center"
            >
              <Ionicons name="arrow-back" size={22} color="#991B1B" />
            </TouchableOpacity>

            <View className=" flex-col items-start justify-start ml-3">
              <Text className="text-xl font-bold text-red-700">
                PUBLIKASI FASILITAS
              </Text>
              <Text className="text-xs text-red-800">HUMAS - DEO AIRPORT</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <View className=" flex-col items-end justify-end">
              <TouchableOpacity className="w-10 h-10 mt-1 rounded-full items-center justify-center">
                <Ionicons name="search" size={22} color="#991B1B" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {canCreate && (
        <View className="bg-white p-2 mb-3">
          <View className="flex-row pt-2 border-gray-100 justify-between">
            <TouchableOpacity
              onPress={() =>
                router.push("./create", { relativeToDirectory: true })
              }
              className="flex-1 flex-row items-center justify-center"
            >
              <Image
                source={{
                  uri: `${baseURL}/web/image?model=hr.employee&id=${user.id}&field=image_1024`,
                }}
                style={{
                  borderRadius: 35,
                  width: 35,
                  height: 35,
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
              <View className=" bg-slate-100 rounded-full p-3 w-[85%] ml-3">
                <Text className="ml-2 font-medium text-gray-400">
                publikasi kontent baru ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </Fragment>
    );
  };
  


  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
        <Text className="text-gray-500 mt-2">Loading more content...</Text>
      </View>
    );
  };
  

  const renderEmpty = () => (
    <View className="py-8 flex items-center justify-center">
      <Ionicons name="document-text-outline" size={48} color="#9ca3af" />
      <Text className="text-gray-500 mt-4 text-center">No content found</Text>
    </View>
  );


  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        {renderHeader()}
        <LoadingSkeleton/>
      </SafeAreaView>
    );
  }


  if(isError){
    return(
      <SafeAreaView className="flex-1 bg-slate-50">
        {renderHeader()}
        <ErrorState  
        variant="network"
        action={refetch}
      />
    </SafeAreaView>)
  }

  const dataFlat= data?.pages.flatMap((page) => page.data) ?? [];


  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {renderHeader()}
      <FlatList
        data={dataFlat}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {return <ItemCard item_record={item} user={user} />}}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}







function ItemCard({ item_record, user }) {
  const queryClient = useQueryClient();
  const [showFullContent, setShowFullContent] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imagePublishHelper, setImagePublishHelper] = useState([]);
  const [imagePublishSelected, setImagePublishSelected] = useState(null);
  const [showModalPublish, setShowModalPublish] = useState(false);
  const [textTitlePublish, setTextTitlePublish] = useState("");
  const [textDescriptionPublish, setTextDescriptionPublish] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const contentMaxLength = 150;


  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async (data) => {
      const { data: result } = await post(`/mobile/api/internal/mobile-data`, {
        params: {
          model: model,
          method: "web_save",
          args: [[item_record.id], data],
          kwargs: {
            specification: fields,
          },
        },
      });
      return result;
    },
    onMutate: async (newUpdate) => {
      await queryClient.cancelQueries({ queryKey: query_keys });
      const previousData = queryClient.getQueryData(query_keys);
      queryClient.setQueryData(query_keys, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              data: page.data?.map((item) =>
                item.id === newUpdate.id ? { ...item, ...newUpdate } : item
              ),
            };
          }),
        };
      });
      return { previousData, newUpdate };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: query_keys });
    },
    onError: (err, newUpdate, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(query_keys, context.previousData);
      }
      Alert.alert("Error", "Failed update Data. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: query_keys });
    },
  });


  const canEdit = useMemo(() => {
    return allowedGroupIds.includes(user?.department_id?.id);
  }, [user]);


  const handleEdit = () => {
    setShowMenu(false);
  };

  const handlePublish = useCallback(() => {
    setShowMenu(false);
    mutate({
      ...item_record,
      x_studio_publish: true,
    });
  }, [item_record, mutate, queryClient]);

  const handleUnPublish = useCallback(() => {
    setShowMenu(false);
    mutate({
      ...item_record,
      x_studio_publish: false,
      x_studio_show_in_home: false,
    });
  }, [item_record, mutate, queryClient]);


  const handlePublishShowOnHome = useCallback(() => {
    setShowMenu(false);
    const imagesPost = [];
    item_record.x_studio_content
      .filter((content) => {
        return content.type === "image";
      })
      .forEach((content) => {
        if (Array.isArray(content.value) && content.value.length > 0) {
          content.value.forEach((image) => {
            imagesPost.push(image);
          });
        }
      });
    setImagePublishHelper(imagesPost);
    setShowModalPublish(true);
  }, [item_record]);



  const handleNotPublishShowOnHome = useCallback(() => {
    setShowMenu(false);
    mutate({
      ...item_record,
      x_studio_show_in_home: false,
    });
  }, [item_record, mutate, queryClient]);

  const cancelShowOnMenu = useCallback(() => {
    setShowMenu(false);
    setImagePublishHelper([]);
    setShowModalPublish(false);
    setImagePublishSelected(null);
    setTextTitlePublish("");
    setTextDescriptionPublish("");
  }, []);

  const handleSubmitShowOnMenu = useCallback(() => {
    if (!textTitlePublish) {
      Alert.alert("Empty Title", "Please insert Text Title.");
      return;
    }
    if (!imagePublishSelected) {
      Alert.alert("Empty Content", "Please select image cover.");
      return;
    }
    mutate(
      {
        ...item_record,
        x_studio_show_in_home: true,
        x_name: textTitlePublish,
        x_studio_description: textDescriptionPublish,
        x_studio_image_cover: imagePublishSelected,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(query_keys);
          setImagePublishHelper([]);
          setShowModalPublish(false);
          setImagePublishSelected(null);
          setTextTitlePublish("");
          setTextDescriptionPublish("");
        },
        onError: (err) => {
          Alert.alert("Error", "Failed set Banner. Please try again.");
        },
      }
    );
  }, [
    item_record,
    imagePublishSelected,
    textTitlePublish,
    textDescriptionPublish,
    mutate,
    queryClient,
  ]);

  const handleDelete = () => {
    setShowMenu(false);
  };

  const handleShowMenu = (event) => {
    const { pageY, pageX } = event.nativeEvent;
    setMenuPosition({
      top: pageY + 10,
      right: 20,
    });
    setShowMenu(true);
  };

  return (
    <Fragment>
      <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
        {/* CONTENT Header */}
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="relative">
              <Image
                source={{
                  uri: `${baseURL}/web/image?model=res.users&id=${item_record.create_uid?.id}&field=avatar_128`,
                }}
                style={{
                  borderRadius: 40,
                  width: 40,
                  height: 40,
                }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className=" text-gray-600 font-semibold text-sm">
                  {item_record.create_uid?.display_name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  {dayjs().to(dayjs.utc(item_record?.create_date))}
                </Text>
                <Text className="text-gray-600 text-sm">
                  - {item_record.x_studio_publish ? "Published" : "Draft"}
                </Text>
                <View
                  className={`ml-2 w-2 h-2 rounded-full ${
                    item_record.x_studio_publish
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />
              </View>
            </View>
          </View>

          <View className=" flex-row items-center">
            {item_record.x_studio_show_in_home && (
              <View className="bg-green-500 rounded-full w-8 h-8 items-center justify-center ">
                <Ionicons name="home" size={12} color="#fff" />
              </View>
            )}

            {isPending && (<LoadingSpinner size={16}/>)}

            {item_record?.localCreatePending && (<View className=" flex-row items-center">
              <ThreeDotsLoader size={4}/>
            </View>)}


            {!item_record?.localCreatePending && canEdit && (
              <Fragment>
                <TouchableOpacity
                  onPress={handleShowMenu}
                  className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                <Modal
                  visible={showMenu}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setShowMenu(false)}
                >
                  <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={() => setShowMenu(false)}
                  >
                    <View
                      className="absolute bg-white rounded-xl shadow-xl overflow-hidden w-48 border border-gray-500/30"
                      style={{
                        top: menuPosition.top,
                        right: menuPosition.right,
                      }}
                    >
                      <TouchableOpacity
                        className="flex-row items-center px-4 py-2 border-b border-gray-100"
                        onPress={handleEdit}
                      >
                        <Ionicons
                          name="create-outline"
                          size={18}
                          color="#3b82f6"
                        />
                        <Text className="ml-3 text-gray-700 text-sm">
                          Edit Post
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="flex-row items-center px-4 py-2 border-b border-gray-100"
                        onPress={() =>
                          !item_record.x_studio_publish
                            ? handlePublish()
                            : handleUnPublish()
                        }
                      >
                        <Ionicons
                          name="globe-outline"
                          size={18}
                          color="#10b981"
                        />
                        <Text className="ml-3 text-gray-700 text-sm">
                          {item_record.x_studio_publish
                            ? "Unpublish"
                            : "Publish"}
                        </Text>
                      </TouchableOpacity>

                      {item_record.x_studio_publish && (
                        <TouchableOpacity
                          className="flex-row items-center px-4 py-2 border-b border-gray-100"
                          onPress={() =>
                            item_record.x_studio_show_in_home
                              ? handleNotPublishShowOnHome()
                              : handlePublishShowOnHome()
                          }
                        >
                          <Ionicons name="home" size={18} color="#10b981" />
                          <Text className="ml-3 text-gray-700 text-sm">
                            {item_record.x_studio_show_in_home
                              ? "Unset Banner"
                              : "Set Banner"}
                          </Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        className="flex-row items-center px-4 py-3"
                        onPress={handleDelete}
                      >
                        <Ionicons
                          name="globe-outline"
                          size={18}
                          color="#10b981"
                        />
                        <Text className="ml-3 text-gray-700 text-sm">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </Fragment>
            )}
          </View>
        </View>

        {/* Body Content */}
        <View>
          {Array.isArray(item_record.x_studio_content) &&
            item_record.x_studio_content.map((content, index) => (
              <View key={index}>
                {content.type === "text" && (
                  <View className="px-4 mb-3">
                    <Text className="text-gray-900 text-base leading-6">
                      {content.value.length > contentMaxLength &&
                      !showFullContent
                        ? `${content.value.substring(0, contentMaxLength)}...`
                        : content.value}
                    </Text>
                    {content.value.length > contentMaxLength && (
                      <TouchableOpacity
                        onPress={() => setShowFullContent(!showFullContent)}
                        className="mt-1"
                      >
                        <Text className="text-blue-600 font-medium">
                          {showFullContent ? "Show less" : "Read more"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {content.type === "image" &&
                  Array.isArray(content.value) &&
                  content.value.length > 0 && (
                    <ImageGrid images={content.value} readonly />
                  )}
              </View>
            ))}
        </View>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={showModalPublish}
        onRequestClose={() => setShowModalPublish(false)}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleSubmitShowOnMenu}
            className="bg-orange-500 rounded-md mt-6"
            style={styles.publishButton}
          >
            <Text className=" p-2">PUBLISH</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={cancelShowOnMenu}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <View className="flex-1 mt-28 p-4">
            <View className="flex-row items-center bg-white/10 rounded-xl p-3 mt-6">
              <TextInput
                className="flex-1 text-white "
                placeholder="PUBLISH TITLE ..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={textTitlePublish}
                onChangeText={setTextTitlePublish}
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-center bg-white/10 rounded-xl p-3 mt-6">
              <TextInput
                className="flex-1 text-white "
                placeholder="PUBLISH DESKRIPSI ..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                multiline
                value={textDescriptionPublish}
                onChangeText={setTextDescriptionPublish}
                autoCapitalize="none"
              />
            </View>

            <View className="flex-row items-start  p-4">
              <Text className="text-white/90 mt-2">SELECT IMAGE COVER</Text>
            </View>
            <FlatList
              data={imagePublishHelper}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item, index }) => {
                const isSelected = imagePublishSelected === item.image_src;
                return (
                  <TouchableOpacity
                    onPress={() => setImagePublishSelected(item.image_src)}
                    className="flex-row items-center rounded-xl p-3"
                  >
                    <Image
                      source={{
                        uri: `${baseURL}${item.image_src}`,
                      }}
                      style={{
                        borderRadius: 6,
                        width: 100,
                        height: 100,
                      }}
                      placeholder={{ blurhash }}
                      contentFit="cover"
                      transition={1000}
                    />
                    {isSelected && (
                      <View style={styles.selectionBadge}>
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={24}
                          color="#22C55E"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  publishButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 2,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },

  counter: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  counterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH,
    height: "80%",
  },
  navigation: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    position: "absolute",
    left: 20,
  },
  nextButton: {
    position: "absolute",
    right: 20,
  },
  selectionBadge: {
    position: "absolute",
    bottom: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});
