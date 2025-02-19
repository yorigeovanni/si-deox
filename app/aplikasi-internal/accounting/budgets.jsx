import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const budgets = [
  {
    id: '1',
    category: 'Operating Expenses',
    budgeted: 150000000,
    actual: 125000000,
    variance: 25000000,
    status: 'Under Budget'
  },
  {
    id: '2',
    category: 'Marketing',
    budgeted: 75000000,
    actual: 82000000,
    variance: -7000000,
    status: 'Over Budget'
  },
  {
    id: '3',
    category: 'IT Infrastructure',
    budgeted: 100000000,
    actual: 98000000,
    variance: 2000000,
    status: 'On Track'
  },
  {
    id: '4',
    category: 'Employee Benefits',
    budgeted: 200000000,
    actual: 195000000,
    variance: 5000000,
    status: 'On Track'
  }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export default function BudgetsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <LinearGradient
          colors={['#F44336', '#D32F2F']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <TouchableOpacity 
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Budgets</Text>
            <Text className="text-white/80">Track and manage financial budgets</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Total Budget</Text>
              <Text className="text-2xl font-bold">Rp 525M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">4.8% utilized</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Remaining</Text>
              <Text className="text-2xl font-bold">Rp 25M</Text>
              <Text className="text-gray-500 text-sm mt-1">for this period</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#F44336" />
                <Text className="text-[#F44336] font-semibold ml-2">New Budget</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="analytics" size={20} color="#F44336" />
                <Text className="text-[#F44336] font-semibold ml-2">Analysis</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Budget List */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Budget Overview</Text>
              <TouchableOpacity>
                <Text className="text-[#F44336]">View All</Text>
              </TouchableOpacity>
            </View>

            {budgets.map((budget, index) => (
              <TouchableOpacity
                key={budget.id}
                className={`py-4 ${
                  index < budgets.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold">{budget.category}</Text>
                    <View className="flex-row items-center mt-1">
                      <View className={`px-2 py-1 rounded-full ${
                        budget.status === 'Under Budget' ? 'bg-green-100' :
                        budget.status === 'Over Budget' ? 'bg-red-100' :
                        'bg-blue-100'
                      }`}>
                        <Text className={`text-xs ${
                          budget.status === 'Under Budget' ? 'text-green-600' :
                          budget.status === 'Over Budget' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {budget.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold">{formatCurrency(budget.budgeted)}</Text>
                    <Text className={`text-sm ${
                      budget.variance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {budget.variance >= 0 ? '+' : ''}{formatCurrency(budget.variance)}
                    </Text>
                  </View>
                </View>

                <View className="mt-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600 text-sm">Progress</Text>
                    <Text className="text-gray-600 text-sm">
                      {formatCurrency(budget.actual)} / {formatCurrency(budget.budgeted)}
                    </Text>
                  </View>
                  <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <View 
                      className={`h-full rounded-full ${
                        budget.status === 'Under Budget' ? 'bg-green-500' :
                        budget.status === 'Over Budget' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${(budget.actual / budget.budgeted) * 100}%` }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Budget Categories */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Budget Categories</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <Text className="font-bold">2</Text>
                <Text className="text-sm text-center">Under Budget</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="trending-up" size={24} color="#2196F3" />
                </View>
                <Text className="font-bold">1</Text>
                <Text className="text-sm text-center">On Track</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="alert-circle" size={24} color="#F44336" />
                </View>
                <Text className="font-bold">1</Text>
                <Text className="text-sm text-center">Over Budget</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}