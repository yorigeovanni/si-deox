import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_API_DEV;

export default function ProfileScreen() {
  const router = useRouter();
  const { internalUser } = useSelector((state) => state.auth);
  const { user, loading } = internalUser;

  return (
    <ScrollView className="flex-1">
      <View className="bg-red-800">
        <View className="items-center px-6 pt-8 pb-16">
          <Image
            source={{
              uri: `${baseURL}/web/image?model=hr.employee&id=${user.id}&field=image_1024`,
            }}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-bold mt-4 text-white">{user.name}</Text>
          <Text className="text-gray-200 font-semibold text-sm ">
            {user.job_id?.display_name}
          </Text>

          <View className="flex-row mt-6 px-6 items-center ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row px-6 items-center  py-2 rounded-full"
            >
              <Ionicons name="chevron-forward" size={24} color="#ffffff" />
              <Text className="text-white font-semibold text-center">BACK HOME</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary px-6 py-2 rounded-full"
              onPress={() => router.push("/profile/edit")}
            >
              <Text className="text-white font-semibold">EDIT PROFILE</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>

      <View className="flex-row justify-between p-6">
        <View className="items-start">
          <Text className="text-2xl font-bold text-primary">25%</Text>
          <Text className="text-gray-600">KPI</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">450</Text>
          <Text className="text-gray-600">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary">288</Text>
          <Text className="text-gray-600">Following</Text>
        </View>
      </View>

      <View className="bg-white p-6 mt-2">
        <Text className="text-lg font-bold mb-4">My Listings</Text>
        {[1, 2, 3].map((item) => (
          <TouchableOpacity
            key={item}
            className="flex-row items-center mb-4 last:mb-0"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
              }}
              className="w-16 h-16 rounded-lg"
            />
            <View className="flex-1 ml-4 p-3">
              <Text className="font-semibold">Modern Villa</Text>
              <Text className="text-gray-600">Miami, Florida</Text>
              <Text className="text-primary font-bold">$2,500/mo</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
