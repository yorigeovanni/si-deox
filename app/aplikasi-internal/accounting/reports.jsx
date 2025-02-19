import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { fetchTransactionsRequest } from '@/store/crud-slices/accountingSlice';

const reports = [
  {
    id: '1',
    name: 'Balance Sheet',
    icon: 'document-text',
    description: 'View assets, liabilities, and equity',
    lastGenerated: '2025-02-15'
  },
  {
    id: '2',
    name: 'Profit & Loss',
    icon: 'stats-chart',
    description: 'Income and expenses summary',
    lastGenerated: '2025-02-15'
  },
  {
    id: '3',
    name: 'Cash Flow',
    icon: 'cash',
    description: 'Track money movement',
    lastGenerated: '2025-02-14'
  },
  {
    id: '4',
    name: 'Trial Balance',
    icon: 'calculator',
    description: 'Debit and credit balances',
    lastGenerated: '2025-02-14'
  },
  {
    id: '5',
    name: 'Tax Report',
    icon: 'receipt',
    description: 'Tax obligations summary',
    lastGenerated: '2025-02-13'
  },
  {
    id: '6',
    name: 'Aged Receivables',
    icon: 'time',
    description: 'Outstanding customer payments',
    lastGenerated: '2025-02-13'
  }
];

export default function ReportsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.accounting);

  useEffect(() => {
   // dispatch(fetchTransactionsRequest());
  }, []);

  // Calculate report data from transactions
  const reportData = transactions?.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.totalIncome += transaction.amount;
    } else {
      acc.totalExpenses += transaction.amount;
    }
    return acc;
  }, { totalIncome: 0, totalExpenses: 0 }) || { totalIncome: 0, totalExpenses: 0 };

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
            <Text className="text-white text-2xl font-bold">Financial Reports</Text>
            <Text className="text-white/80">Generate and view financial statements</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="download" size={20} color="#F44336" />
                <Text className="text-[#F44336] font-semibold ml-2">Export All</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="calendar" size={20} color="#F44336" />
                <Text className="text-[#F44336] font-semibold ml-2">Date Range</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Reports Grid */}
          <View className="flex-row flex-wrap justify-between">
            {reports.map((report) => (
              <TouchableOpacity
                key={report.id}
                className="bg-white rounded-xl p-4 shadow-sm mb-4 w-[48%]"
              >
                <View className="w-12 h-12 bg-red-50 rounded-xl items-center justify-center mb-3">
                  <Ionicons name={report.icon} size={24} color="#F44336" />
                </View>
                <Text className="font-bold mb-1">{report.name}</Text>
                <Text className="text-gray-600 text-sm mb-2">{report.description}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text className="text-gray-500 text-xs ml-1">
                    Generated: {report.lastGenerated}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Reports */}
          <View className="bg-white rounded-xl p-4 shadow-sm mt-2 mb-6">
            <Text className="text-lg font-bold mb-4">Custom Reports</Text>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
                  <Ionicons name="build" size={20} color="#666" />
                </View>
                <View className="ml-3">
                  <Text className="font-semibold">Report Builder</Text>
                  <Text className="text-gray-600 text-sm">Create custom reports</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
                  <Ionicons name="save" size={20} color="#666" />
                </View>
                <View className="ml-3">
                  <Text className="font-semibold">Saved Reports</Text>
                  <Text className="text-gray-600 text-sm">View saved custom reports</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}