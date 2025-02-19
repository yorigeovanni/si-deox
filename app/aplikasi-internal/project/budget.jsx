import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

import { Pie, PolarChart } from "victory-native";

import { useFont } from "@shopify/react-native-skia";

import { useState } from 'react';

function randomNumber() {
  return Math.floor(Math.random() * 26) + 125;
}
function generateRandomColor() {
  // Generating a random number between 0 and 0xFFFFFF
  const randomColor = Math.floor(Math.random() * 0xffffff);
  // Converting the number to a hexadecimal string and padding with zeros
  return `#${randomColor.toString(16).padStart(6, "0")}`;
}
const DATA = (numberPoints = 5) =>
  Array.from({ length: numberPoints }, (_, index) => ({
    value: randomNumber(),
    color: generateRandomColor(),
    label: `Label ${index + 1}`,
  }));



  console.log(DATA())

const budgetCategories = [
  {
    id: 'B001',
    name: 'Development',
    allocated: 250000000,
    spent: 150000000,
    remaining: 100000000,
    status: 'On Track',
    expenses: [
      { description: 'Developer Salaries', amount: 100000000 },
      { description: 'Software Licenses', amount: 30000000 },
      { description: 'Cloud Services', amount: 20000000 }
    ]
  },
  {
    id: 'B002',
    name: 'Design',
    allocated: 100000000,
    spent: 85000000,
    remaining: 15000000,
    status: 'At Risk',
    expenses: [
      { description: 'UI/UX Design', amount: 50000000 },
      { description: 'Design Tools', amount: 20000000 },
      { description: 'User Testing', amount: 15000000 }
    ]
  },
  {
    id: 'B003',
    name: 'Marketing',
    allocated: 150000000,
    spent: 60000000,
    remaining: 90000000,
    status: 'Under Budget',
    expenses: [
      { description: 'Digital Marketing', amount: 30000000 },
      { description: 'Content Creation', amount: 20000000 },
      { description: 'Social Media', amount: 10000000 }
    ]
  }
];

const quickStats = [
  { title: 'Total Budget', value: 'Rp 500M', icon: 'cash', color: '#009688' },
  { title: 'Spent', value: 'Rp 295M', icon: 'trending-down', color: '#F44336' },
  { title: 'Remaining', value: 'Rp 205M', icon: 'wallet', color: '#4CAF50' },
  { title: 'Forecast', value: 'Rp 450M', icon: 'analytics', color: '#2196F3' },
];

const spendingData = [
  { x: 'Jan', y: 25000000 },
  { x: 'Feb', y: 35000000 },
  { x: 'Mar', y: 45000000 },
  { x: 'Apr', y: 40000000 },
  { x: 'May', y: 50000000 },
  { x: 'Jun', y: 100000000 },
];

export default function BudgetScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = budgetCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePercentage = (spent, allocated) => {
    return Math.round((spent / allocated) * 100);
  };






  console.log(budgetCategories.map(cat => ({
    x: cat.name,
    y: cat.allocated
  })))

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <LinearGradient
          colors={['#009688', '#00796B']}
          className="pt-12 pb-6"
        >
          <View className="px-6">
            <TouchableOpacity 
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Budget</Text>
            <Text className="text-white/80">Track project finances</Text>
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
                placeholder="Search budget categories..."
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
                <Ionicons name="add-circle" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Add Category</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="document-text" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Report</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Budget Distribution */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Budget Distribution</Text>
            <View style={{ height: 200 }}>
            <PolarChart
            colorScale={['#4CAF50', '#2196F3', '#9C27B0']}
            radius={({ datum }) => 80}
            innerRadius={40}
            labelRadius={({ innerRadius }) => (innerRadius || 0) + 30}
            style={{
              labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' }
            }}
        data={[{"color": "#6558e1", "label": "Label 1", "value": 139}, {"color": "#625681", "label": "Label 2", "value": 141}, {"color": "#a4ddca", "label": "Label 3", "value": 149}, {"color": "#61c28a", "label": "Label 4", "value": 130}, {"color": "#ea2efc", "label": "Label 5", "value": 129}]} 
        labelKey={"label"} // 👈 specify data key for labels
        valueKey={"value"} // 👈 specify data key for values
        colorKey={"color"} // 👈 specify data key for color
      >
        <Pie.Chart />
      </PolarChart>

              {/**<VictoryPie
                data={budgetCategories.map(cat => ({
                  x: cat.name,
                  y: cat.allocated
                }))}
                colorScale={['#4CAF50', '#2196F3', '#9C27B0']}
                radius={({ datum }) => 80}
                innerRadius={40}
                labelRadius={({ innerRadius }) => (innerRadius || 0) + 30}
                style={{
                  labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' }
                }}
              /> */}
            </View>
          </View>

          {/* Monthly Spending */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Monthly Spending</Text>
            {/**<VictoryChart
              theme={VictoryTheme.material}
              height={200}
              padding={{ top: 20, bottom: 40, left: 60, right: 20 }}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `${t/1000000}M`}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 }
                }}
              />
              <VictoryBar
                data={spendingData}
                style={{
                  data: { fill: "#009688" }
                }}
              />
            </VictoryChart> */}
          </View>

          {/* Budget Categories */}
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-xl font-bold">{category.name}</Text>
                  <Text className="text-gray-600">{category.id}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  category.status === 'On Track' ? 'bg-green-100' :
                  category.status === 'At Risk' ? 'bg-red-100' :
                  'bg-blue-100'
                }`}>
                  <Text className={`text-xs ${
                    category.status === 'On Track' ? 'text-green-600' :
                    category.status === 'At Risk' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>
                    {category.status}
                  </Text>
                </View>
              </View>

              <View className="bg-gray-50 p-4 rounded-lg mb-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">Allocated</Text>
                  <Text className="font-medium">{formatCurrency(category.allocated)}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600">Spent</Text>
                  <Text className="font-medium text-red-600">{formatCurrency(category.spent)}</Text>
                </View>
                <View className="flex-row justify-between mb-4">
                  <Text className="text-gray-600">Remaining</Text>
                  <Text className="font-medium text-green-600">{formatCurrency(category.remaining)}</Text>
                </View>

                <View className="mb-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600">Budget Utilization</Text>
                    <Text className="font-medium">
                      {calculatePercentage(category.spent, category.allocated)}%
                    </Text>
                  </View>
                  <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <View 
                      className={`h-full rounded-full ${
                        calculatePercentage(category.spent, category.allocated) > 90 
                          ? 'bg-red-500' 
                          : calculatePercentage(category.spent, category.allocated) > 70 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${calculatePercentage(category.spent, category.allocated)}%` }}
                    />
                  </View>
                </View>
              </View>

              <Text className="font-bold mb-2">Recent Expenses</Text>
              {category.expenses.map((expense, index) => (
                <View 
                  key={index}
                  className={`flex-row justify-between items-center py-2 ${
                    index < category.expenses.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <Text className="text-gray-600">{expense.description}</Text>
                  <Text className="font-medium">{formatCurrency(expense.amount)}</Text>
                </View>
              ))}

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="create" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="add-circle" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="analytics" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Analytics</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}