import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { DynamicForm } from "@/components/ui/DynamicForm";
import createRequest from "@/services/api-secure-internal";

export default function EditEquipmentForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { post } = createRequest();
  const formFields = [
    [
      {
        name: "x_studio_reg_number",
        title: "REG NUMBER",
        type: "char",
        icon: () => <Ionicons name={"airplane"} size={20} color="#6b7280" />,
        rules: {
          required: "Registration number is required",
        },
      },
      {
        name: "x_studio_operator",
        title: "OPERATOR AIRLINES",
        type: "manyToOne",
        targetModel: "x_data_operator",
        icon: "business",
        optionLabel: "x_name",
        optionValue: "id",
        selectedFields: {
          x_name: {},
        },
        rules: {
          required: "Operator is required",
        },
      },
      {
        name: "x_studio_type_pesawat",
        title: "AIRCRAFT TYPE",
        type: "manyToOne",
        targetModel: "x_data_type_pesawat",
        icon: "airplane",
        optionLabel: "x_name",
        optionValue: "id",
        selectedFields: {
          x_name: {},
        },
        rules: {
          required: "Aircraft type is required",
        },
      },
      {
        name: "x_studio_parking_stand",
        title: "PARKING STAND",
        type: "manyToOne",
        targetModel: "x_data_parking_stand",
        icon: "location",
        optionLabel: "x_name",
        optionValue: "id",
        selectedFields: {
          x_name: {},
        },
        rules: {
          required: "Parking stand is required",
        },
      },
    ],

    [
      {
        name: "x_studio_tag_status",
        title: "TAGS / REMARKS",
        type: "tags",
        targetModel: "x_amc_tags",
        icon: "location",
        optionLabel: "x_name",
        optionValue: "id",
        selectedFields: {
          x_name: {},
        },
        rules: {
          required: "Field is required",
        },
      },
      {
        name: "x_studio_ata",
        title: "Actual Time Arrival",
        type: "datetime",
        icon: "time",
        rules: {
         // required: "ATA is required",
        },
      },
      {
        name: "x_studio_block_on",
        title: "Block On",
        type: "datetime",
        icon: "time",
        rules: {
         // required: "Block on time is required",
        },
      },
      {
        name: "x_studio_block_off",
        title: "Block Off",
        type: "datetime",
        icon: "time",
        rules: {
         // required: "Block off time is required",
        },
      },
      {
        name: "x_studio_atd",
        title: "Actual Time Departure",
        type: "datetime",
        icon: "time",
        rules: {
          //required: "ATD is required",
        },
      },
      
    ],
  
    [
      {
        type: "lines",
        canCreate : true,
        canEdit : true,
        canDelete : true,
        name: "x_studio_extra_departures_flight_number",
        label: "FLIGHT NUMBER DEPARTURES",
        placeholder: "FLIGHT NUMBER DEPARTURES",
        defaultValue: [],
        rules: {
          required: "field is required",
        },
        formFiels: [
          [
            {
              name: "x_studio_from",
              title: "FROM",
              type: "manyToOne",
              targetModel: "x_data_airport",
              icon: "business",
              optionValue: "id",
              optionLabel: "x_name",
              selectedFields: {
                x_name: {},
              },
              defaultValue: { id: 2, x_name: "SOQ" },
              rules: {
                required: "Operator is required",
              },
              tableColWidth: 180,
              render: (row, value) => {
                //console.log(value);
                return value.x_name;
              },
            },
            {
              name: "x_studio_destination",
              label: "DESTINATION",
              placeholder: "DEST",
              type: "manyToOne",
              targetModel: "x_data_airport",
              icon: "business",
              optionValue: "id",
              optionLabel: "x_name",
              selectedFields: {
                x_name: {},
              },
              defaultValue: null,
              rules: {
                required: "field is required",
              },
              tableColWidth: 180,
              render: (row, value) => {
                //console.log(value);
                return value.x_name;
              },
            },
            {
              name: "x_studio_flight_number",
              label: "FLIGHT NUMBER",
              placeholder: "FLIGHT NUMBER",
              icon: () => <Ionicons name={"airplane"} size={20} color="#6b7280" />,
              type: "char",
              defaultValue: "",
              rules: {
                required: "field is required",
              },
              tableColWidth: 180,
              render: (row, value) => {
                return value;
              },
            },
          ],
        ],
      },
    ],
  ];

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
              Add New Flight
            </Text>
            <Text className="text-white/80">Create a new scheduled flight</Text>
          </View>
        </View>
      </LinearGradient>

      <DynamicForm
        fields={formFields}
        basecolor="#009688"
        //onSubmit={handleSubmit}
        onBack={() => router.back()}
        id={parseInt(id)}
        model="x_data_amc"
      />
    </SafeAreaView>
  );
}
