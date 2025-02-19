import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const projectActions = [
  { id: '1', name: 'Tasks', icon: 'checkbox', color: '#009688', route: '/aplikasi-internal/project/tasks' },
  { id: '2', name: 'Timeline', icon: 'time', color: '#00897B', route: '/aplikasi-internal/project/timeline' },
  { id: '3', name: 'Team', icon: 'people', color: '#00796B', route: '/aplikasi-internal/project/team' },
  { id: '4', name: 'Documents', icon: 'document', color: '#00695C', route: '/aplikasi-internal/project/documents' },
  { id: '5', name: 'Budget', icon: 'cash', color: '#004D40', route: '/aplikasi-internal/project/budget' },
  { id: '6', name: 'Reports', icon: 'stats-chart', color: '#00BFA5', route: '/aplikasi-internal/project/reports' },
];

const activeProjects = [
  {
    id: 'P001',
    name: 'Website Redesign',
    progress: 75,
    team: 5,
    deadline: '2025-03-01',
    status: 'On Track'
  },
  {
    id: 'P002',
    name: 'Mobile App Development',
    progress: 45,
    team: 8,
    deadline: '2025-04-15',
    status: 'At Risk'
  },
  {
    id: 'P003',
    name: 'Marketing Campaign',
    progress: 90,
    team: 4,
    deadline: '2025-02-28',
    status: 'Completed'
  }
];

export default function ProjectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <LinearGradient colors={['#009688', '#00796B']}>
          <View className="px-6 py-2 flex-row justify-between">
            <TouchableOpacity 
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className=' flex-col justify-end items-end'>
            <Text className="text-white text-2xl font-bold">Project Management</Text>
            <Text className="text-white/80">Track and manage projects</Text>
            </View>
          </View>
        </LinearGradient>

        <View className="p-6">
          {/* Quick Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-gray-600 mb-1">Active Projects</Text>
              <Text className="text-2xl font-bold">12</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time" size={16} color="#FF9800" />
                <Text className="text-orange-600 text-sm ml-1">4 due soon</Text>
              </View>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Team Utilization</Text>
              <Text className="text-2xl font-bold">85%</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text className="text-green-600 text-sm ml-1">+5%</Text>
              </View>
            </View>
          </View>

          {/* Project Actions */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between">
              {projectActions.map((action) => (
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

          {/* Active Projects */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Active Projects</Text>
              <TouchableOpacity>
                <Text className="text-[#009688]">View All</Text>
              </TouchableOpacity>
            </View>
            {activeProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 last:mb-0"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className="font-semibold">{project.name}</Text>
                    <Text className="text-gray-600">{project.id}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-full ${
                    project.status === 'On Track' ? 'bg-green-100' :
                    project.status === 'At Risk' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    <Text className={`text-xs ${
                      project.status === 'On Track' ? 'text-green-600' :
                      project.status === 'At Risk' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {project.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <Ionicons name="people" size={16} color="#666" />
                    <Text className="text-gray-600 ml-1">{project.team} members</Text>
                  </View>
                  <Text className="text-gray-600">Due: {project.deadline}</Text>
                </View>

                <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <View 
                    className={`h-full rounded-full ${
                      project.progress >= 90 ? 'bg-green-500' :
                      project.progress >= 50 ? 'bg-blue-500' :
                      'bg-orange-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </View>
                <Text className="text-right text-sm text-gray-600 mt-1">
                  {project.progress}% Complete
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Project Overview */}
          <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Text className="text-lg font-bold mb-4">Project Overview</Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-teal-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="time" size={24} color="#009688" />
                </View>
                <Text className="font-bold">12</Text>
                <Text className="text-sm text-center">Active</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="alert" size={24} color="#FFC107" />
                </View>
                <Text className="font-bold">3</Text>
                <Text className="text-sm text-center">At Risk</Text>
              </View>
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                </View>
                <Text className="font-bold">8</Text>
                <Text className="text-sm text-center">Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}