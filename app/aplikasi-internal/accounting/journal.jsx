import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
/*import {
  fetchTransactionsRequest,
  createTransactionRequest,
  updateTransactionRequest,
  deleteTransactionRequest
} from '@/store/crud-slices/accountingSlice';
*/
export default function JournalScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.accounting);

  useEffect(() => {
   // dispatch(fetchTransactionsRequest());
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
            <Text className="text-white text-2xl font-bold">Journal Entries</Text>
            <Text className="text-white/80">Record and track financial transactions</Text>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#F44336" />
                <Text className="text-red-600 font-semibold ml-2">New Entry</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="filter" size={20} color="#F44336" />
                <Text className="text-red-600 font-semibold ml-2">Filter</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Journal Entries */}
          {error ? (
            <View className="bg-red-100 p-4 rounded-xl mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#F44336" />
              <Text className="text-gray-600 mt-4">Loading journal entries...</Text>
            </View>
          ) : (
            <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Recent Entries</Text>
                <TouchableOpacity>
                  <Text className="text-[#F44336]">View All</Text>
                </TouchableOpacity>
              </View>

              {transactions?.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  className="py-4 border-b border-gray-100 last:border-b-0"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View>
                      <Text className="font-semibold">{entry.description}</Text>
                      <Text className="text-gray-600">{entry.reference}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-gray-500">{entry.date}</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Text className="text-gray-600 text-sm">Ref: {entry.reference}</Text>
                    </View>
                    <View>
                      {entry.type === 'income' ? (
                        <Text className="text-green-600 font-semibold">
                          Dr {formatCurrency(entry.amount)}
                        </Text>
                      ) : (
                        <Text className="text-red-600 font-semibold">
                          Cr {formatCurrency(entry.amount)}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Account Summary */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Account Summary</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="arrow-up" size={24} color="#4CAF50" />
                </View>
                <Text className="font-bold">Rp 26.5M</Text>
                <Text className="text-sm text-center">Total Debits</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="arrow-down" size={24} color="#F44336" />
                </View>
                <Text className="font-bold">Rp 26.5M</Text>
                <Text className="text-sm text-center">Total Credits</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#2196F3" />
                </View>
                <Text className="font-bold">Balanced</Text>
                <Text className="text-sm text-center">Status</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}