import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
/*import {
  fetchTransactionsRequest,
  createTransactionRequest,
  updateTransactionRequest,
  deleteTransactionRequest
} from '@/store/crud-slices/accountingSlice';
*/

const quickStats = [
  { title: 'Total Bills', value: 'Rp 267.5M', icon: 'document-text', color: '#4CAF50' },
  { title: 'Pending', value: 'Rp 87.5M', icon: 'time', color: '#FFC107' },
  { title: 'Overdue', value: 'Rp 55M', icon: 'alert-circle', color: '#F44336' },
  { title: 'Paid', value: 'Rp 125M', icon: 'checkmark-circle', color: '#2196F3' },
];

export default function BillsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.accounting);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    //dispatch(fetchTransactionsRequest());
  }, []);

  const filteredBills = transactions?.filter(bill =>
    bill.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.reference.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateBill = (billData) => {
    /*dispatch(createTransactionRequest({
      ...billData,
      type: 'expense',
      category: 'bills'
    }));*/
  };

  const handleUpdateBill = (id, updates) => {
   // dispatch(updateTransactionRequest({ id, updates }));
  };

  const handleDeleteBill = (id) => {
   // dispatch(deleteTransactionRequest(id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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
            <Text className="text-white text-2xl font-bold">Bills</Text>
            <Text className="text-white/80">Manage vendor bills</Text>
          </View>
        </LinearGradient>

        <View className="p-6 -mt-6">
          {/* Quick Stats */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {quickStats.map((stat, index) => (
              <View 
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm mr-4"
                style={{ width: 140 }}
              >
                <View className="flex-row items-center mb-2">
                  <View 
                    className="w-10 h-10 rounded-lg items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Ionicons name={stat.icon} size={20} color={stat.color} />
                  </View>
                </View>
                <Text className="text-2xl font-bold">{stat.value}</Text>
                <Text className="text-gray-600 text-sm">{stat.title}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Search Bar */}
          <View className="bg-white rounded-xl px-4 py-3 mb-6 shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Search bills..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <Ionicons name="filter" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#F44336" />
                <Text className="text-red-600 font-semibold ml-2">New Bill</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="download" size={20} color="#F44336" />
                <Text className="text-red-600 font-semibold ml-2">Export</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bills List */}
          {error ? (
            <View className="bg-red-100 p-4 rounded-xl mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#F44336" />
              <Text className="text-gray-600 mt-4">Loading bills...</Text>
            </View>
          ) : (
            filteredBills.map((bill) => (
              <TouchableOpacity
                key={bill.id}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xl font-bold">{bill.party}</Text>
                    <Text className="text-gray-600">{bill.reference}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    bill.status === 'paid' ? 'bg-green-100' :
                    bill.status === 'pending' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <Text className={`text-xs ${
                      bill.status === 'paid' ? 'text-green-600' :
                      bill.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {bill.status}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 p-4 rounded-lg mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Amount</Text>
                    <Text className="font-medium">{formatCurrency(bill.amount)}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Due Date</Text>
                    <Text className="font-medium">{bill.dueDate}</Text>
                  </View>
                </View>

                <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleUpdateBill(bill.id, { status: 'paid' })}
                  >
                    <Ionicons name="create" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleUpdateBill(bill.id, { status: 'paid' })}
                  >
                    <Ionicons name="cash" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Pay</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleDeleteBill(bill.id)}
                  >
                    <Ionicons name="document-text" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}