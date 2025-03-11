import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
    StyleSheet,
  } from "react-native";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Ionicons } from "@expo/vector-icons";
  import { useEffect, useState } from "react";
  import { useRouter, useLocalSearchParams } from "expo-router";
  import { ImageGrid } from "@/components/ui/ImageGrid";
  import { ImagePicker } from "@/components/ui/ImagePicker";
  import { fetchModelById, updateModelData } from "@/services/queryClient";
  import createRequest from "@/services/api-secure-internal";



const { post } = createRequest();
  //================================= GROUP ID ACCESS =================================
  const allowedGroupIds = [56, 80];
  const allowedGroupIdsAdmin = [56];
  const x_studio_tags = [3]; // INFORMASI
  //===================================================================================
  
  
  
  
  const ContentType = {
    TEXT: "text",
    IMAGE: "image",
  };
  
  export default function CreatePostScreen() {
    const queryClient = useQueryClient();
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [contents, setContents] = useState([{ type: ContentType.TEXT, value: "" }]);
    const [currentEditingIndex, setCurrentEditingIndex] = useState(0);
    const [showMediaPicker, setShowMediaPicker] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const { 
        data : dataRecord, 
        isLoading : loadingRecord, 
        isError : errorLoadRecord 
    } = useQuery({
      queryKey : ['humas_pengaduan', id],
      queryFn: () => fetchModelById(post,{
        model : 'x_mobile_pengaduan', 
        id : parseInt(id), 
        fields : {
          x_studio_mobile_number : {},
          x_studio_content_response: {},
          x_studio_sequence: {},
          x_studio_content: {},
          x_studio_is_submit: {},
          create_date: {},
        }
      }),
      enabled: !!id,
  });


  const { mutate, isError, error, isPending }  = useMutation({
    mutationFn: async ({ id, data }) => {

      return updateModelData(post,{
        model : 'x_mobile_pengaduan' ,
        id, 
        data
      });
    }
  })


     
  
    const handleAddContent = (type) => {
      const newContent = { type, value: type === ContentType.TEXT ? "" : [] };
      setContents([...contents, newContent]);
      setCurrentEditingIndex(contents.length);
    };
  
    const handleContentChange = (index, value) => {
      const newContents = [...contents];
      newContents[index].value = value;
      setContents(newContents);
    };
  
    const handleRemoveContent = (index) => {
      const newContents = contents.filter((_, i) => i !== index);
      setContents(newContents);
      if (currentEditingIndex >= index) {
        setCurrentEditingIndex(Math.max(0, currentEditingIndex - 1));
      }
    };
  
    const closeAllModals = () => {
      setShowMediaPicker(false);
      setSelectedImages([]);
    };
  




    const handlePost = async () => {
      if (
        contents.every(
          (content) =>
            (content.type === ContentType.TEXT && !content.value.trim()) ||
            (content.type !== ContentType.TEXT && !content.value.length)
        )
      ) {
        Alert.alert("Empty Content", "Please add some content to your post.");
        return;
      }
      mutate({
        id: parseInt(id),
        data: {
            x_studio_content_response: contents
        }
        },
        {
          onSuccess: () => {
            router.back();
            setTimeout(() => {
              queryClient.invalidateQueries(["aplikasi_internal_humas_content_pengaduan", id]);
            },1000)
          },
          onError: (err) => {
            console.log(err);
            Alert.alert("Error", "Failed to create post. Please try again.");
          },
        }
      );
    };



  
  
    const handleImageSelect = (imageUri) => {
      if (selectedImages.includes(imageUri)) {
        setSelectedImages((prev) => prev.filter((img) => img !== imageUri));
      } else {
        if (selectedImages.length >= 10) {
          Alert.alert("Maximum Photos", "You can only select up to 10 photos.");
          return;
        }
        setSelectedImages((prev) => [...prev, imageUri]);
      }
    };
  
    const handleAddSelectedImages = () => {
      if (selectedImages.length > 0) {
        const newContents = [...contents];
        const insertIndex = currentEditingIndex + 1;
        newContents.splice(insertIndex, 0, {
          type: ContentType.IMAGE,
          value: selectedImages,
        });
        setContents(newContents);
        setCurrentEditingIndex(insertIndex);
        closeAllModals();
      }
    };



    useEffect(()=>{
        if(loadingRecord || errorLoadRecord){
            return;
        }
        if(dataRecord.x_studio_content_respons){
            setContents(dataRecord.x_studio_content);
        }
        //console.log(dataRecord.x_studio_content_response);
       // console.log(dataRecord.x_studio_content)
        //setContents(dataRecord.x_studio_content);
    },[loadingRecord, loadingRecord, dataRecord])




    if(loadingRecord){
        return <ActivityIndicator />
    }


  
    return (
      <SafeAreaView className=" flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className=" flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 38 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
  
            <Text style={styles.headerTitle}>Response Pengaduan</Text>
  
            <TouchableOpacity
              style={[
                styles.postButton,
                !contents.length && styles.postButtonDisabled,
              ]}
              onPress={handlePost}
              disabled={isPending || !contents.length}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.postButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
  
        
  
          <ScrollView style={styles.content}>
            {contents.map((content, index) => {
              return (
                <View key={index} style={styles.contentBlock}>
                  {content.type === ContentType.TEXT && (
                    <TextInput
                      style={styles.input}
                      placeholder="content descriptions ..."
                      multiline
                      value={content.value}
                      onChangeText={(text) => handleContentChange(index, text)}
                      onFocus={() => setCurrentEditingIndex(index)}
                    />
                  )}
  
                  {content.type === ContentType.IMAGE && (
                    <View style={styles.imageContent}>
                      <ImageGrid
                        images={content.value}
                        onRemoveImage={() => handleRemoveContent(index)}
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
  
          {/* Bottom Toolbar */}
          <View className=" flex-row bg-gray-100 items-center justify-between px-14">
            <TouchableOpacity
              onPress={() => handleAddContent(ContentType.TEXT)}
              className="flex-row h-10 items-center"
            >
              <Ionicons name="text" size={24} color="#374151" />
              <Text className=" px-2 font-bold text-gray-500">Text</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              className="flex-row h-10 items-center"
              onPress={() => setShowMediaPicker(true)}
            >
              <Ionicons name="images" size={24} color="#ef4444" />
              <Text className=" px-2 font-bold text-gray-500">Gambar</Text>
            </TouchableOpacity>
          </View>
  
        
  
          <ImagePicker
            visible={showMediaPicker}
            onClose={closeAllModals}
            selectedImages={selectedImages}
            onSelectImage={handleImageSelect}
            onAddImages={handleAddSelectedImages}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#111827",
    },
    postButton: {
      backgroundColor: "#3b82f6",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    postButtonDisabled: {
      backgroundColor: "#93c5fd",
    },
    postButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
    content: {
      flex: 1,
    },
    contentBlock: {
      marginBottom: 12,
    },
    input: {
      padding: 16,
      fontSize: 16,
      color: "#111827",
      minHeight: 100,
      textAlignVertical: "top",
    },
    imageContent: {
      position: "relative",
    },
  });
  