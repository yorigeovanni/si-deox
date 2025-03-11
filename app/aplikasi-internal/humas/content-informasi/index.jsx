import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
//import { NetworkToggle } from "@/components/ui/NetworkToggle";
import { useRouter, useFocusEffect } from "expo-router";
import { useModelQuery, useModelMutations } from "@/services/queryClient";
import { ImageGrid } from "@/components/ui/ImageGrid";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const blurhash ="|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_DEV;

//================================= GROUP ID ACCESS =================================
const allowedGroupIds = [56, 80];
const allowedGroupIdsAdmin = [56];
const x_studio_tags = [3]; // INFORMASI
//===================================================================================



export default function ContentFasilitas() {
  const router = useRouter();
  const { internalUser } = useSelector((state) => state.auth);
  const { user, loading } = internalUser;
  const [refreshing, setRefreshing] = useState(false);


  const [
    { domain, limit, offset, order, searchQuery, filterStatus },
    setParams,
  ] = useState({
    domain: [
      ["x_studio_tags", "in", x_studio_tags]
    ],
    searchQuery: "",
    filterStatus: null,
    limit: 5,
    offset: 0,
    order: "create_date DESC",
  });

  const queryOptions = useMemo(
    () => ({
      model: "x_humas_berita",
      selectedFields: {
        x_studio_sequence: {},
        x_studio_content: {},
        x_studio_publish: {},
        x_studio_show_in_home: {},
        create_uid: { fields: { display_name: {} } },
        create_date: {},
        write_uid: { fields: { display_name: {} } },
        write_date: {},
      },
      offset: offset,
      order: order,
      limit: limit,
      count_limit: 100001,
      domain: domain,
    }),
    [domain, limit, offset, order]
  );


  const canCreate = useMemo(() => {
    // HUMAS - DEO AIRPORT
    return allowedGroupIds.includes(user?.department_id?.id);
  }, [user]);


  const posting = useModelQuery(queryOptions);
  useFocusEffect(
    useCallback(() => {
      posting.refetch();
    }, [])
  );

  const onRefresh = useCallback(() => {
    //setRefreshing(true);
    posting.refetch();
  }, []);



  if (posting.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }


  return (
    <SafeAreaView className="flex-1 bg-gray-100">
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
                PUBLIKASI INFORMASI
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

      {canCreate && (<View className="bg-white p-2 mb-3">
        <View className="flex-row pt-2 border-gray-100 justify-between">
          <TouchableOpacity
            onPress={() => router.push("./create", { relativeToDirectory: true })}
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
                tambah informasi  baru ...
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>)}

  

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={posting.isLoading}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Create Post Card */}

        {/* Posts */}
        {(posting.data?.records || []).map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}




function PostCard({ post, user }) {
  const { updateMutation } = useModelMutations("x_humas_berita");
  const [showFullContent, setShowFullContent] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imagePublishHelper, setImagePublishHelper] = useState([]);
  const [imagePublishSelected, setImagePublishSelected] = useState(null);
  const [showModalPublish, setShowModalPublish] = useState(false);
  const [textTitlePublish, setTextTitlePublish] = useState('');
  const [textDescriptionPublish, setTextDescriptionPublish] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const contentMaxLength = 150;


  const canEdit = useMemo(() => {
    // HUMAS - DEO AIRPORT
    return allowedGroupIds.includes(user?.department_id?.id);
  }, [user]);



  const timeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const handleEdit = () => {
    setShowMenu(false);
  };



  const handlePublish = useCallback(() => {
    setShowMenu(false);
    updateMutation.mutate({
      id: post.id,
      data: {
        x_studio_publish: true,
      },
    });
  }, [post]);



  const handleUnPublish = useCallback(() => {
    setShowMenu(false);
    updateMutation.mutate({
      id: post.id,
      data: {
        x_studio_publish: false,
        x_studio_show_in_home: false,
      },
    });
  }, [post]);




  const handlePublishShowOnHome = useCallback(() => {
    setShowMenu(false);
    const imagesPost = [];
    post.x_studio_content
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
  }, [post]);




  const handleNotPublishShowOnHome = useCallback(() => {
    setShowMenu(false);
    updateMutation.mutate({
      id: post.id,
      data: {
        x_studio_show_in_home: false,
      },
    });
  }, [post]);




  const cancelShowOnMenu = useCallback(() => {
    setShowMenu(false);
    setImagePublishHelper([]);
    setShowModalPublish(false);
    setImagePublishSelected(null);
    setTextTitlePublish('');
    setTextDescriptionPublish('')
  }, []);



  const handleSubmitShowOnMenu = useCallback(() => {
    if(!textTitlePublish){
      Alert.alert("Empty Title", "Please insert Text Title.");
      return;
    }
    if(!imagePublishSelected){
      Alert.alert("Empty Content", "Please select image cover.");
      return;
    }
    
    updateMutation.mutate({
      id: post.id,
      data: {
        x_studio_show_in_home: true,
        x_name : textTitlePublish,
        x_studio_description : textDescriptionPublish,
        x_studio_image_cover : imagePublishSelected
      },
    },
    {
      onSuccess: () => {
        setImagePublishHelper([]);
        setShowModalPublish(false);
        setImagePublishSelected(null);
        setTextTitlePublish('');
        setTextDescriptionPublish('')
      },
      onError: (err) => {
        Alert.alert("Error", "Failed set Banner. Please try again.");
      },
    });
  }, [post, imagePublishSelected, textTitlePublish, textDescriptionPublish]);








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
        {/* Post Header */}
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="relative">
              <Image
                source={{
                  uri: `${baseURL}/web/image?model=res.users&id=${post.create_uid?.id}&field=avatar_128`,
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
              {user && (
                <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 items-center justify-center border-2 border-white">
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
              )}
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className=" text-gray-600 font-semibold text-sm">
                  {post.create_uid?.display_name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-500 text-sm">
                  {timeAgo(post.create_date)}
                </Text>
                <Text className="text-gray-600 text-sm">
                  - {post.x_studio_publish ? "Published" : "Draft"}
                </Text>
                <View
                  className={`ml-2 w-2 h-2 rounded-full ${
                    post.x_studio_publish ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </View>
            </View>
          </View>

          <View className=" flex-row items-center">
            {post.x_studio_show_in_home && (
              <View className="bg-green-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs uppercase">
                  HOME BANNER
                </Text>
              </View>
            )}

            {canEdit && (<Fragment>
              <TouchableOpacity
              onPress={handleShowMenu}
              className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
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
                    <Ionicons name="create-outline" size={18} color="#3b82f6" />
                    <Text className="ml-3 text-gray-700 text-sm">
                      Edit Post
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-row items-center px-4 py-2 border-b border-gray-100"
                    onPress={() =>
                      !post.x_studio_publish
                        ? handlePublish()
                        : handleUnPublish()
                    }
                  >
                    <Ionicons name="globe-outline" size={18} color="#10b981" />
                    <Text className="ml-3 text-gray-700 text-sm">
                      {post.x_studio_publish ? "Unpublish" : "Publish"}
                    </Text>
                  </TouchableOpacity>

                  {post.x_studio_publish && (<TouchableOpacity
                    className="flex-row items-center px-4 py-2 border-b border-gray-100"
                    onPress={() => post.x_studio_show_in_home ? handleNotPublishShowOnHome() : handlePublishShowOnHome()}
                  >
                    <Ionicons name="home" size={18} color="#10b981" />
                    <Text className="ml-3 text-gray-700 text-sm">
                      {post.x_studio_show_in_home ? "Unset Banner" : "Set Banner"}
                    </Text>
                  </TouchableOpacity>)}


                  <TouchableOpacity
                    className="flex-row items-center px-4 py-3"
                    onPress={handleDelete}
                  >
                    <Ionicons name="globe-outline" size={18} color="#10b981" />
                    <Text className="ml-3 text-gray-700 text-sm">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
            </Fragment>)}

          </View>
        </View>

        {/* Post Content */}
        <View>
          {Array.isArray(post.x_studio_content) &&
            post.x_studio_content.map((content, index) => (
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

          <TouchableOpacity style={styles.closeButton} onPress={cancelShowOnMenu}>
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
                //keyboardType="email-address"
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
                //keyboardType="email-address"
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
                        <Ionicons name="checkmark-circle-outline" size={24} color="#22C55E" />
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
