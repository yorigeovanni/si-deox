import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { fetchTransactionsRequest } from '@/store/crud-slices/accountingSlice';

const taxReturns = [
  {
    id: '1',
    type: 'VAT',
    period: 'January 2025',
    amount: 25000000,
    status: 'Filed',
    dueDate: '2025-02-20'
  },
  {
    id: '2',
    type: 'Corporate Income Tax',
    period: 'Q4 2024',
    amount: 150000000,
    status: 'Draft',
    dueDate: '2025-03-31'
  },
  {
    id: '3',
    type: 'Withholding Tax',
    period: 'January 2025',
    amount: 12000000,
    status: 'Pending',
    dueDate: '2025-02-25'
  }
];

const taxCalendar = [
  {
    id: '1',
    type: 'VAT Return',
    dueDate: '2025-02-20',
    status: 'Upcoming'
  },
  {
    id: '2',
    type: 'Corporate Tax',
    dueDate: '2025-03-31',
    status: 'Upcoming'
  },
  {
    id: '3',
    type: 'Payroll Tax',
    dueDate: '2025-02-15',
    status: 'Completed'
  }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function TaxesScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.accounting);

  useEffect(() => {
   // dispatch(fetchTransactionsRequest());
  }, []);

  // Filter tax-related transactions
  const taxTransactions = transactions?.filter(transaction => 
    transaction.category === 'tax'
  ) || [];

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
            <Text className="text-white text-2xl font-bold">Tax Management</Text>
            <Text className="text-white/80">Track and manage tax obligations</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Tax Liability</Text>
              <Text className="text-2xl font-bold">Rp 187M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time" size={16} color="#FF9800" />
                <Text className="text-orange-600 text-sm ml-1">2 due soon</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Tax Credits</Text>
              <Text className="text-2xl font-bold">Rp 45M</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">Available</Text>
              </View>
            </View>
          </View>

          {/* Tax Returns */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Tax Returns</Text>
              <TouchableOpacity>
                <Text className="text-[#F44336]">View All</Text>
              </TouchableOpacity>
            </View>

            {taxReturns.map((tax, index) => (
              <TouchableOpacity
                key={tax.id}
                className={`py-4 ${
                  index < taxReturns.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold">{tax.type}</Text>
                    <Text className="text-gray-600">{tax.period}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-full ${
                    tax.status === 'Filed' ? 'bg-green-100' :
                    tax.status === 'Draft' ? 'bg-gray-100' :
                    'bg-yellow-100'
                  }`}>
                    <Text className={`text-xs ${
                      tax.status === 'Filed' ? 'text-green-600' :
                      tax.status === 'Draft' ? 'text-gray-600' :
                      'text-yellow-600'
                    }`}>
                      {tax.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600">Due: {tax.dueDate}</Text>
                  <Text className="font-bold">{formatCurrency(tax.amount)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tax Calendar */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Tax Calendar</Text>
            {taxCalendar.map((event, index) => (
              <TouchableOpacity
                key={event.id}
                className={`flex-row items-center justify-between py-3 ${
                  index < taxCalendar.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${
                    event.status === 'Upcoming' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <Ionicons 
                      name={event.status === 'Upcoming' ? 'calendar' : 'checkmark-circle'} 
                      size={20} 
                      color={event.status === 'Upcoming' ? '#2196F3' : '#4CAF50'} 
                    />
                  </View>
                  <View className="ml-3">
                    <Text className="font-semibold">{event.type}</Text>
                    <Text className="text-gray-600">Due: {event.dueDate}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Tax Documents */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Tax Documents</Text>
            <View className="flex-row flex-wrap justify-between">
              <TouchableOpacity className="w-[48%] bg-gray-50 p-4 rounded-lg mb-4">
                <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mb-2">
                  <Ionicons name="document-text" size={20} color="#F44336" />
                </View>
                <Text className="font-semibold">Tax Forms</Text>
                <Text className="text-gray-600 text-sm">Access all tax forms</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="w-[48%] bg-gray-50 p-4 rounded-lg mb-4">
                <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mb-2">
                  <Ionicons name="receipt" size={20} color="#2196F3" />
                </View>
                <Text className="font-semibold">Receipts</Text>
                <Text className="text-gray-600 text-sm">Tax payment receipts</Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-gray-50 p-4 rounded-lg">
                <View className="w-10 h-10 bg-green-100 rounded-lg items-center justify-center mb-2">
                  <Ionicons name="download" size={20} color="#4CAF50" />
                </View>
                <Text className="font-semibold">Reports</Text>
                <Text className="text-gray-600 text-sm">Download tax reports</Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-[48%] bg-gray-50 p-4 rounded-lg">
                <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mb-2">
                  <Ionicons name="folder" size={20} color="#9C27B0" />
                </View>
                <Text className="font-semibold">Archives</Text>
                <Text className="text-gray-600 text-sm">Previous year records</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}