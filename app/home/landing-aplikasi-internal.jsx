import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";


const mainModules = [
  { name: "pnbp", icon: "cart", color: "#4CAF50", route: "sales" },
  {
    name: "perlengkapan",
    icon: "cube",
    color: "#2196F3",
    route: "inventory",
  },
  {
    name: "Purchase",
    icon: "basket",
    color: "#9C27B0",
    route: "purchase",
  },
  {
    name: "kerjasama",
    icon: "construct",
    color: "#FF9800",
    route: "manufacturing",
  },
  {
    name: "keuangan",
    icon: "calculator",
    color: "#F44336",
    route: "/aplikasi-internal/accounting",
  },
  { name: "CRM", icon: "people", color: "#00BCD4", route: "crm" },
  {
    name: "kepegawaian",
    icon: "person",
    color: "#3F51B5",
    route: "hr",
  },
  {
    name: "Project",
    icon: "briefcase",
    color: "#009688",
    route: "/aplikasi-internal/project",
  },
  {
    name: "Maintenance",
    icon: "build",
    color: "#795548",
    route: "maintenance",
  },
  {
    name: "Repair",
    icon: "hammer",
    color: "#607D8B",
    route: "repair",
    route: "/aplikasi-internal/helpdesk",
  },
  {
    name: "humas",
    icon: "headset",
    color: "#E91E63",
    route: "/aplikasi-internal/humas",
  },
  {
    name: "kendaraan",
    icon: "car",
    color: "#673AB7",
    route: "/aplikasi-internal/kendaraan",
  },
];

const quickAccess = [
  {
    name: "AMC",
    color: "#009688",
    icon: "person-add",
    route: "/aplikasi-internal/amc",
  },
  {
    color: "#2196F3",
    name: "ELBAN",
    icon: "pricetag",
    route: "/aplikasi-internal/elban",
  },
  {
    color: "#9C27B0",
    name: "LISTRIK",
    icon: "construct",
    route: "/aplikasi-internal/listrik",
  },
  {
    color: "#FF9800",
    name: "A2B",
    icon: "stats-chart",
    route: "/aplikasi-internal/a2b",
  },
  {
    color: "#F44336",
    name: "BANGLAND",
    icon: "settings",
    route: "/aplikasi-internal/bangland",
  },
  {
    color: "#00BCD4",
    name: "PKP-PK",
    icon: "settings",
    route: "/aplikasi-internal/pkp-pk",
  },
  {
    color: "#E91E63",
    name: "AVSEC",
    icon: "settings",
    route: "/aplikasi-internal/avsec",
  },
  {
    color: "#3F51B5",
    name: "IT-DEV",
    icon: "settings",
    route: "/aplikasi-internal/it-dev",
  },
];

const recentActivities = [
  {
    id: "1",
    type: "Sale Order",
    number: "SO/2025/0001",
    customer: "Tech Solutions Inc.",
    amount: 25000000,
    status: "Draft",
    date: "Today 10:30",
  },
  {
    id: "2",
    type: "Purchase Order",
    number: "PO/2025/0003",
    customer: "Global Supplies Ltd",
    amount: 15000000,
    status: "Confirmed",
    date: "Today 09:15",
  },
  {
    id: "3",
    type: "Invoice",
    number: "INV/2025/0005",
    customer: "Digital Systems Co",
    amount: 8500000,
    status: "Paid",
    date: "Yesterday",
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};





export default function LandingInternal() {
  const router = useRouter();
  const { internalUser } = useSelector((state) => state.auth);
  const { user, loading } = internalUser;



  useEffect(() => {
    if (!user) {
      setTimeout(()=>{
        router.replace("/auth/login-internal");
      },500)
    }
  }, [user, loading]);



  if (loading) {
    return (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="mt-4 text-gray-600">Loading...</Text>
          </View>
        )
  }


  console.log(user)


  return (
    <Fragment>
      {!user ? (<View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="mt-4 text-gray-600">Loading...</Text>
          </View>) : (<SafeAreaView className="flex-1 bg-[#991B1B]" edges={["top"]}>
      <View className="px-6 py-3 bg-[#991B1B]">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-white/80">Welcome,</Text>
            <Text className="text-white text-2xl font-bold">
              {user?.name}
            </Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            onPress={() => router.push("/aplikasi-internal/account")}
          >
            <Ionicons name="person-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-gray-50 ">
        <LinearGradient colors={["#991B1B", "#500724"]} >
          <View className="px-3 pb-10">
            {/* Quick Stats */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">KEHADIRAN PERSONIL</Text>
                <Text className="text-white text-xl font-bold">
                  Rp 250,000,000
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#4CAF50" />
                  <Text className="text-green-400 ml-1">
                    +15% vs last month
                  </Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl mr-4 w-56">
                <Text className="text-white/80 mb-2">Open Orders</Text>
                <Text className="text-white text-xl font-bold">24</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="time" size={16} color="#FFC107" />
                  <Text className="text-yellow-400 ml-1">5 need attention</Text>
                </View>
              </View>

              <View className="bg-white/10 backdrop-blur-lg p-4 rounded-xl w-56">
                <Text className="text-white/80 mb-2">Inventory Value</Text>
                <Text className="text-white text-xl font-bold">
                  Rp 1,500,000,000
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="alert" size={16} color="#FF5722" />
                  <Text className="text-orange-400 ml-1">
                    3 items low stock
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>

        <View className="px-6 -mt-6">
          {/* Main Modules */}
          <View className="bg-white rounded-xl p-4  mb-6">
            <Text className="text-lg font-bold mb-4">MODUL MANAGEMENT</Text>
            <View className="flex-row flex-wrap justify-start items-center">
              {mainModules.map((module, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[25%] items-center mb-6"
                  onPress={() => module.route && router.push(module.route)}
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                    style={{ backgroundColor: module.color }}
                  >
                    <Ionicons name={module.icon} size={24} color="white" />
                  </View>
                  <Text className="text-center text-xs">{module.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Access */}
          <View className="bg-white rounded-xl p-4  mb-6">
            <Text className="text-lg font-bold mb-4">
              UNIT TEKNIS - OPERASIONAL
            </Text>
            <View className="flex-row flex-wrap justify-start items-center">
              {quickAccess.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[25%] items-center mb-6"
                  onPress={() => item.route && router.push(item.route)}
                >
                  <View className=" w-14 h-14 rounded-xl items-center justify-center mb-2"
                  style={{ backgroundColor: item.color }}
                  >
                    <Ionicons name={item.icon} size={20} color="#ffffff" />
                  </View>
                  <Text className="text-xs ">{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activities */}
          <View className="bg-white rounded-xl p-4 mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Recent Activities</Text>
              <TouchableOpacity>
                <Text className="text-primary">View All</Text>
              </TouchableOpacity>
            </View>

            {recentActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <View>
                  <Text className="font-semibold">{activity.number}</Text>
                  <Text className="text-gray-600">{activity.customer}</Text>
                  <Text className="text-gray-500 text-sm">{activity.date}</Text>
                </View>
                <View className="items-end">
                  <Text className="font-bold">
                    {formatCurrency(activity.amount)}
                  </Text>
                  <View
                    className={`px-2 py-1 rounded-full mt-1 ${
                      activity.status === "Paid"
                        ? "bg-green-100"
                        : activity.status === "Due"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        activity.status === "Paid"
                          ? "text-green-600"
                          : activity.status === "Due"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {activity.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>)}
    </Fragment>
  );
}
