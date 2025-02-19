import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const milestones = [
  {
    id: 'M001',
    title: 'Project Kickoff',
    description: 'Initial project planning and team alignment',
    date: '2025-01-15',
    status: 'Completed',
    tasks: [
      { title: 'Team Assembly', status: 'Completed' },
      { title: 'Requirements Gathering', status: 'Completed' },
      { title: 'Project Charter', status: 'Completed' }
    ]
  },
  {
    id: 'M002',
    title: 'Design Phase',
    description: 'UI/UX design and prototyping',
    date: '2025-02-28',
    status: 'In Progress',
    tasks: [
      { title: 'Wireframes', status: 'Completed' },
      { title: 'UI Design', status: 'In Progress' },
      { title: 'Usability Testing', status: 'Pending' }
    ]
  },
  {
    id: 'M003',
    title: 'Development Phase',
    description: 'Core feature development',
    date: '2025-04-15',
    status: 'Upcoming',
    tasks: [
      { title: 'Backend Development', status: 'Pending' },
      { title: 'Frontend Development', status: 'Pending' },
      { title: 'Integration', status: 'Pending' }
    ]
  }
];

const quickStats = [
  { title: 'Total Milestones', value: '8', icon: 'flag', color: '#009688' },
  { title: 'Completed', value: '3', icon: 'checkmark-circle', color: '#4CAF50' },
  { title: 'In Progress', value: '2', icon: 'time', color: '#FFC107' },
  { title: 'Upcoming', value: '3', icon: 'calendar', color: '#2196F3' },
];

export default function TimelineScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMilestones = milestones.filter(milestone =>
    milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    milestone.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Text className="text-white text-2xl font-bold">Timeline</Text>
            <Text className="text-white/80">Project milestones and progress</Text>
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
                placeholder="Search milestones..."
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
                <Text className="text-teal-600 font-semibold ml-2">Add Milestone</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="calendar" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Calendar</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Timeline */}
          <View className="relative">
            {/* Vertical Line */}
            <View className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" />

            {/* Milestones */}
            {filteredMilestones.map((milestone, index) => (
              <View key={milestone.id} className="mb-6 pl-12 relative">
                {/* Milestone Dot */}
                <View className={`absolute left-[14px] top-4 w-4 h-4 rounded-full border-2 border-white ${
                  milestone.status === 'Completed' ? 'bg-green-500' :
                  milestone.status === 'In Progress' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />

                <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 mr-4">
                      <Text className="text-xl font-bold">{milestone.title}</Text>
                      <Text className="text-gray-600 mt-1">{milestone.description}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${
                      milestone.status === 'Completed' ? 'bg-green-100' :
                      milestone.status === 'In Progress' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <Text className={`text-xs ${
                        milestone.status === 'Completed' ? 'text-green-600' :
                        milestone.status === 'In Progress' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {milestone.status}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 p-3 rounded-lg mb-3">
                    {milestone.tasks.map((task, taskIndex) => (
                      <View 
                        key={taskIndex}
                        className={`flex-row items-center justify-between py-2 ${
                          taskIndex < milestone.tasks.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <Text className="text-gray-600">{task.title}</Text>
                        <View className={`px-2 py-1 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-100' :
                          task.status === 'In Progress' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          <Text className={`text-xs ${
                            task.status === 'Completed' ? 'text-green-600' :
                            task.status === 'In Progress' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {task.status}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="calendar" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">Due: {milestone.date}</Text>
                  </View>

                  <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                      <Ionicons name="create" size={20} color="#009688" />
                      <Text className="text-teal-600 ml-2">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                      <Ionicons name="list" size={20} color="#009688" />
                      <Text className="text-teal-600 ml-2">Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                      <Ionicons name="checkmark-circle" size={20} color="#009688" />
                      <Text className="text-teal-600 ml-2">Complete</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}