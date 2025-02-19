import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { fetchTransactionsRequest } from '@/store/crud-slices/accountingSlice';

const accountingActions = [
  { id: '1', name: 'Invoices', icon: 'receipt', color: '#F44336', route: '/aplikasi-internal/accounting/invoices' },
  { id: '2', name: 'Bills', icon: 'document-text', color: '#E53935', route: '/aplikasi-internal/accounting/bills' },
  { id: '3', name: 'Journal', icon: 'book', color: '#D32F2F', route: '/aplikasi-internal/accounting/journal' },
  { id: '4', name: 'Reports', icon: 'stats-chart', color: '#C62828', route: '/aplikasi-internal/accounting/reports' },
  { id: '5', name: 'Budgets', icon: 'calculator', color: '#B71C1C', route: '/aplikasi-internal/accounting/budgets' },
  { id: '6', name: 'Taxes', icon: 'cash', color: '#D50000', route: '/aplikasi-internal/accounting/taxes' },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
};

export default function AccountingScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
   // dispatch(fetchTransactionsRequest());
  }, []);

  const recentTransactions = transactions?.slice(0, 5) || [];

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
            <Text className="text-white text-2xl font-bold">Accounting</Text>
            <Text className="text-white/80">Financial Management</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Revenue (MTD)</Text>
              <Text className="text-2xl font-bold">Rp 350M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">+12%</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Expenses (MTD)</Text>
              <Text className="text-2xl font-bold">Rp 180M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-down" size={16} color="#F44336" />
                <Text className="text-red-600 text-sm ml-1">+5%</Text>
              </View>
            </View>
          </View>

          {/* Accounting Actions */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between">
              {accountingActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  className="w-[30%] items-center mb-6"
                  onPress={() => router.push(action.route)}
                >
                  <View 
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                    style={{ backgroundColor: action.color }}
                  >
                    <Ionicons name={action.icon} size={24} color="white" />
                  </View>
                  <Text className="text-center text-sm">{action.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Orders */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Recent Transactions</Text>
              <TouchableOpacity>
                <Text className="text-[#F44336]">View All</Text>
              </TouchableOpacity>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#F44336" />
            ) : error ? (
              <Text className="text-red-600 text-center py-4">Error loading transactions</Text>
            ) : (
              recentTransactions.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <View>
                    <Text className="font-semibold">{transaction.id}</Text>
                    <Text className="text-gray-600">{transaction.party}</Text>
                    <Text className="text-gray-500 text-sm">{transaction.date}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold">
                      {formatCurrency(transaction.amount)}
                    </Text>
                    <View className={`px-2 py-1 rounded-full mt-1 ${
                      transaction.status === 'Paid' ? 'bg-green-100' :
                      transaction.status === 'Due' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <Text className={`text-xs ${
                        transaction.status === 'Paid' ? 'text-green-600' :
                        transaction.status === 'Due' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {transaction.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Vendor Analysis */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Top Vendors</Text>
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                    <Text className="font-bold text-purple-600">OS</Text>
                  </View>
                  <View className="ml-3">
                    <Text className="font-semibold">Office Supplies Co</Text>
                    <Text className="text-gray-500 text-sm">15 orders this month</Text>
                  </View>
                </View>
                <Text className="font-bold">Rp 45M</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                    <Text className="font-bold text-blue-600">TH</Text>
                  </View>
                  <View className="ml-3">
                    <Text className="font-semibold">Tech Hardware Ltd</Text>
                    <Text className="text-gray-500 text-sm">8 orders this month</Text>
                  </View>
                </View>
                <Text className="font-bold">Rp 32M</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}