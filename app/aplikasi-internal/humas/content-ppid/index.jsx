import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { fetchPosts, likePost } from "@/services/mockSocialService";
import { LinearGradient } from "expo-linear-gradient";
import { ImageGrid } from "@/components/ui/ImageGrid";


const PostCard = ({ post, user, onLike }) => {
  const [isLiking, setIsLiking] = useState(false);
  const likeScale = useRef(new Animated.Value(1)).current;
  const [showFullContent, setShowFullContent] = useState(false);
  const contentMaxLength = 150;

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

  const animateLike = () => {
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 12,
      }),
    ]).start();
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await likePost(post.id);
      onLike(post.id);
      animateLike();
    } finally {
      setIsLiking(false);
    }
  };

  const truncatedContent =
    post.content.length > contentMaxLength && !showFullContent
      ? `${post.content.substring(0, contentMaxLength)}...`
      : post.content;

  return (
    <View className="bg-white mb-3 rounded-2xl shadow-sm overflow-hidden">
      {/* Post Header */}
      <View className="p-4 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="relative">
            <Image
              source={{ uri: user.avatar }}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            {user.verified && (
              <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 items-center justify-center border-2 border-white">
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
            )}
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-900 text-base">
                {user.name}
              </Text>
            </View>
            <Text className="text-gray-500 text-sm">
              {timeAgo(post.timestamp)}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center">
          <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View>
        <View className="px-4 mb-3">
          <Text className="text-gray-900 text-base leading-6">
            {truncatedContent}
          </Text>
          {post.content.length > contentMaxLength && (
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

        {post.images && post.images.length > 0 && (
          <ImageGrid images={post.images} readonly />
        )}
      </View>

      {/* Post Stats */}
      <View className="px-4 py-3 border-t border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View className="flex-row items-center -space-x-2">
              <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">
                <Ionicons name="heart" size={12} color="#fff" />
              </View>
              <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                <Ionicons name="thumbs-up" size={12} color="#fff" />
              </View>
            </View>
            <Text className="text-gray-600 ml-2">{post.likes} likes</Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <Text className="text-gray-600">{post.comments} comments</Text>
            <Text className="text-gray-600">{post.shares} shares</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
          <TouchableOpacity
            onPress={handleLike}
            className="flex-1 flex-row items-center justify-center py-2"
            disabled={isLiking}
          >
            <Animated.View style={{ transform: [{ scale: likeScale }] }}>
              <Ionicons
                name={post.liked ? "heart" : "heart-outline"}
                size={24}
                color={post.liked ? "#ef4444" : "#6b7280"}
              />
            </Animated.View>
            <Text
              className={`ml-2 font-medium ${
                post.liked ? "text-red-500" : "text-gray-600"
              }`}
            >
              Like
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
            <Ionicons name="chatbubble-outline" size={22} color="#6b7280" />
            <Text className="ml-2 font-medium text-gray-600">Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2">
            <Ionicons name="share-social-outline" size={22} color="#6b7280" />
            <Text className="ml-2 font-medium text-gray-600">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  const loadPosts = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const { posts: newPosts, users: newUsers } = await fetchPosts();
      setPosts(newPosts);
      setUsers(newUsers);
    } catch (error) {
      //console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(true);
  }, []);

  const handleLike = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white border-b border-gray-200">
        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className=" flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="search" size={22} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-blue-600">
              Tentang kami
            </Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="search" size={22} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="chatbubbles" size={22} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Create Post Card */}
        <View className="bg-white p-4 mb-3">
          
          <View className="flex-row pt-2 border-gray-100">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center">
              <Ionicons name="images" size={22} color="#ef4444" />
              <Text className="ml-2 font-medium text-gray-600">Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center">
              <Ionicons name="videocam" size={22} color="#3b82f6" />
              <Text className="ml-2 font-medium text-gray-600">Video</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center">
              <Ionicons name="happy" size={22} color="#f59e0b" />
              <Text className="ml-2 font-medium text-gray-600">Feeling</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="bg-white py-4 mb-3"
        >
          {/* Create Story */}
          <View className="px-2">
            <View className="relative">
              <Image
                source={{ uri: users["1"].avatar }}
                className="w-32 h-40 rounded-xl"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                className="absolute inset-0 rounded-xl"
              />
              <View className="absolute bottom-2 left-2 right-2">
                
                <Text className="text-white text-center text-sm font-medium">
                  Create Story
                </Text>
              </View>
            </View>
          </View>

          <View className="px-2">
            <View className="relative">
              <Image
                source={{ uri: users["1"].avatar }}
                className="w-32 h-40 rounded-xl"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                className="absolute inset-0 rounded-xl"
              />
              <View className="absolute bottom-2 left-2 right-2">
                
                <Text className="text-white text-center text-sm font-medium">
                  Create Story
                </Text>
              </View>
            </View>
          </View>

          {/* User Stories */}
          {Object.values(users).map((user, index) => (
            <View key={user.id} className="px-2">
              <View className="relative">
                <Image
                  source={{ uri: users["1"].avatar }}
                  className="w-32 h-40 rounded-xl"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  className="absolute inset-0 rounded-xl"
                />
                <View className="absolute top-2 left-2">
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-9 h-9 rounded-full border-2 border-blue-500"
                  />
                </View>
                <Text className="absolute bottom-2 left-2 right-2 text-white text-sm font-medium">
                  {user.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Posts */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={users[post.userId]}
            onLike={handleLike}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
