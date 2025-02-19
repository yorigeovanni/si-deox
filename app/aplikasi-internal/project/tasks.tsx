import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const tasks = [
  {
    id: 'T001',
    title: 'Design System Update',
    description: 'Update the design system components to match new brand guidelines',
    assignee: 'Sarah Johnson',
    dueDate: '2025-02-28',
    priority: 'High',
    status: 'In Progress',
    progress: 60,
    tags: ['Design', 'UI/UX']
  },
  {
    id: 'T002',
    title: 'API Integration',
    description: 'Integrate payment gateway API for new checkout process',
    assignee: 'Michael Brown',
    dueDate: '2025-03-05',
    priority: 'Medium',
    status: 'To Do',
    progress: 0,
    tags: ['Backend', 'API']
  },
  {
    id: 'T003',
    title: 'User Testing',
    description: 'Conduct user testing sessions for new features',
    assignee: 'John Smith',
    dueDate: '2025-02-25',
    priority: 'Low',
    status: 'Completed',
    progress: 100,
    tags: ['Testing', 'UX Research']
  }
];

const quickStats = [
  { title: 'Total Tasks', value: '24', icon: 'checkbox', color: '#009688' },
  { title: 'In Progress', value: '8', icon: 'time', color: '#FFC107' },
  { title: 'Completed', value: '12', icon: 'checkmark-circle', color: '#4CAF50' },
  { title: 'Overdue', value: '4', icon: 'alert-circle', color: '#F44336' },
];

export default function TasksScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
            <Text className="text-white text-2xl font-bold">Tasks</Text>
            <Text className="text-white/80">Manage project tasks</Text>
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
                placeholder="Search tasks..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <Ionicons name="filter" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Status Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {['all', 'to do', 'in progress', 'completed'].map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFilterStatus(status)}
                className={`mr-3 px-4 py-2 rounded-full ${
                  filterStatus === status ? 'bg-teal-600' : 'bg-white'
                }`}
              >
                <Text className={`${
                  filterStatus === status ? 'text-white' : 'text-gray-700'
                } capitalize`}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="add-circle" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">New Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="funnel" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Sort</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tasks List */}
          {filteredTasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-4">
                  <Text className="text-xl font-bold">{task.title}</Text>
                  <Text className="text-gray-600 mt-1">{task.description}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${
                  task.priority === 'High' ? 'bg-red-100' :
                  task.priority === 'Medium' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <Text className={`text-xs ${
                    task.priority === 'High' ? 'text-red-600' :
                    task.priority === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {task.priority}
                  </Text>
                </View>
              </View>

              <View className="flex-row flex-wrap mb-4">
                {task.tags.map((tag, index) => (
                  <View 
                    key={index} 
                    className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-gray-600 text-sm">{tag}</Text>
                  </View>
                ))}
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-600">Progress</Text>
                  <Text className="font-medium">{task.progress}%</Text>
                </View>
                <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <View 
                    className={`h-full rounded-full ${
                      task.status === 'Completed' ? 'bg-green-500' :
                      task.status === 'In Progress' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </View>
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">{task.assignee}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="calendar" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">Due: {task.dueDate}</Text>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="create" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="person" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Assign</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="checkmark-circle" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Complete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}