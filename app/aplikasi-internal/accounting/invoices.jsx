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
  { title: 'Total Invoices', value: 'Rp 520M', icon: 'receipt', color: '#4CAF50' },
  { title: 'Pending', value: 'Rp 185M', icon: 'time', color: '#FFC107' },
  { title: 'Overdue', value: 'Rp 85M', icon: 'alert-circle', color: '#F44336' },
  { title: 'Paid', value: 'Rp 250M', icon: 'checkmark-circle', color: '#2196F3' },
];

export default function InvoicesScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.accounting);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    //dispatch(fetchTransactionsRequest());
  }, []);

  const filteredInvoices = transactions?.filter(invoice =>
    invoice.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.reference.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateInvoice = (invoiceData) => {
   /* dispatch(createTransactionRequest({
      ...invoiceData,
      type: 'income',
      category: 'invoices'
    }));*/
  };

  const handleUpdateInvoice = (id, updates) => {
   // dispatch(updateTransactionRequest({ id, updates }));
  };

  const handleDeleteInvoice = (id) => {
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
            <Text className="text-white text-2xl font-bold">Invoices</Text>
            <Text className="text-white/80">Manage customer invoices</Text>
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
                placeholder="Search invoices..."
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
                <Text className="text-red-600 font-semibold ml-2">New Invoice</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="download" size={20} color="#F44336" />
                <Text className="text-red-600 font-semibold ml-2">Export</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Invoices List */}
          {error ? (
            <View className="bg-red-100 p-4 rounded-xl mb-4">
              <Text className="text-red-600">{error}</Text>
            </View>
          ) : null}

          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#F44336" />
              <Text className="text-gray-600 mt-4">Loading invoices...</Text>
            </View>
          ) : (
            filteredInvoices.map((invoice) => (
              <TouchableOpacity
                key={invoice.id}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-xl font-bold">{invoice.party}</Text>
                    <Text className="text-gray-600">{invoice.reference}</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100' :
                    invoice.status === 'pending' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <Text className={`text-xs ${
                      invoice.status === 'paid' ? 'text-green-600' :
                      invoice.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {invoice.status}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 p-4 rounded-lg mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Amount</Text>
                    <Text className="font-medium">{formatCurrency(invoice.amount)}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Due Date</Text>
                    <Text className="font-medium">{invoice.dueDate}</Text>
                  </View>
                </View>

                <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleUpdateInvoice(invoice.id, { status: 'paid' })}
                  >
                    <Ionicons name="create" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleUpdateInvoice(invoice.id, { status: 'paid' })}
                  >
                    <Ionicons name="download" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center"
                    onPress={() => handleDeleteInvoice(invoice.id)}
                  >
                    <Ionicons name="mail" size={20} color="#F44336" />
                    <Text className="text-red-600 ml-2">Send</Text>
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