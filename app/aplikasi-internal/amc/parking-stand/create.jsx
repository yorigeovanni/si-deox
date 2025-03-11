import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { DynamicForm } from "@/components/ui/DynamicForm";
import createRequest from "@/services/api-secure-internal";


export default function AddScheduledPage() {
  const router = useRouter();
  const { post } = createRequest();
  const model = "x_data_parking_stand";
  const formFields = [
    [
      {
        name: "x_name",
        title: "NAMA PARKING STAND",
        type: "char",
        icon: ()=> <Ionicons name={'airplane'} size={20} color="#6b7280" />,
        rules: {
          required: "this Field is required",
        },
      },
      {
        name: "x_studio_wingspan",
        title: "WING SPAN",
        type: "number",
        icon: ()=> <Ionicons name={'airplane'} size={20} color="#6b7280" />,
        rules: {
          required: "this Field is required",
        },
      },
      {
        name: "x_studio_max_length",
        title: "MAX LENGTH",
        type: "number",
        icon: ()=> <Ionicons name={'airplane'} size={20} color="#6b7280" />,
        rules: {
          required: "this Field is required",
        },
      },
      {
        name: "x_studio_surface",
        title: "PERMUKAAN",
        type: "char",
        icon: ()=> <Ionicons name={'airplane'} size={20} color="#6b7280" />,
        rules: {
          required: "this Field is required",
        },
      }
    ],
    [
        {
          name: "x_studio_location",
          title: "LOKASI",
          type: "map-single-point",
          icon: ()=> <Ionicons name={'airplane'} size={20} color="#6b7280" />,
          rules: {
            required: "this Field is required",
          },
        }
      ]
  ];

/*
  const handleSubmit = async (data) => {
    try {
      await post("/mobile-data", {
        jsonrpc: "2.0",
        method: "call",
        params: {
          model: "x_data_amc",
          method: "save",
          args: [],
          kwargs: {
            ...data,
            x_studio_status: "SCHEDULE",
          },
        },
      });
      router.back();
    } catch (error) {
      //console.error("Error saving scheduled flight:", error);
      throw error;
    }
  };
*/
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient colors={["#009688", "#00796B"]} className="pt-12 pb-6">
        <View className="px-6 flex-row items-center justify-between py-4">
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-col items-end justify-end">
            <Text className="text-white text-2xl font-bold">
              NEW PARKING STAND
            </Text>
            <Text className="text-white/80">AMC - DEO AIRPORT</Text>
          </View>
        </View>
      </LinearGradient>

      <DynamicForm
        basecolor="#009688"
        fields={formFields}
        onBack={() => router.back()}
        id={null}
        model={model}
      />
    </SafeAreaView>
  );
}
