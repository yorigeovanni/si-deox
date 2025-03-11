import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const teamMembers = [
  {
    id: 'TM001',
    name: 'Sarah Johnson',
    role: 'Project Manager',
    department: 'Engineering',
    email: 'sarah.j@company.com',
    phone: '+1 234 567 890',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    tasks: {
      assigned: 8,
      completed: 5
    },
    skills: ['Project Management', 'Agile', 'Team Leadership']
  },
  {
    id: 'TM002',
    name: 'Michael Brown',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'michael.b@company.com',
    phone: '+1 234 567 891',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'On Leave',
    tasks: {
      assigned: 12,
      completed: 10
    },
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    id: 'TM003',
    name: 'Emily Davis',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'emily.d@company.com',
    phone: '+1 234 567 892',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    status: 'Active',
    tasks: {
      assigned: 6,
      completed: 4
    },
    skills: ['UI Design', 'UX Research', 'Prototyping']
  }
];

const quickStats = [
  { title: 'Team Members', value: '12', icon: 'people', color: '#009688' },
  { title: 'Active', value: '10', icon: 'checkmark-circle', color: '#4CAF50' },
  { title: 'On Leave', value: '2', icon: 'time', color: '#FFC107' },
  { title: 'Tasks', value: '45', icon: 'checkbox', color: '#2196F3' },
];

export default function TeamScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['all', 'engineering', 'design', 'marketing'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || 
      member.department.toLowerCase() === filterDepartment.toLowerCase();
    return matchesSearch && matchesDepartment;
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
            <Text className="text-white text-2xl font-bold">Team</Text>
            <Text className="text-white/80">Manage project team members</Text>
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
                placeholder="Search team members..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <Ionicons name="filter" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Department Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {departments.map((department) => (
              <TouchableOpacity
                key={department}
                onPress={() => setFilterDepartment(department)}
                className={`mr-3 px-4 py-2 rounded-full ${
                  filterDepartment === department ? 'bg-teal-600' : 'bg-white'
                }`}
              >
                <Text className={`${
                  filterDepartment === department ? 'text-white' : 'text-gray-700'
                } capitalize`}>
                  {department}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="person-add" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Add Member</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="people" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Roles</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Team Members List */}
          {filteredMembers.map((member) => (
            <TouchableOpacity
              key={member.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row items-start mb-4">
                <Image
                  source={{ uri: member.avatar }}
                  className="w-16 h-16 rounded-xl"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-xl font-bold">{member.name}</Text>
                      <Text className="text-gray-600">{member.role}</Text>
                      <Text className="text-gray-500">{member.department}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${
                      member.status === 'Active' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <Text className={`text-xs ${
                        member.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {member.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row flex-wrap mb-4">
                {member.skills.map((skill, index) => (
                  <View 
                    key={index} 
                    className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-gray-600 text-sm">sdasdasdas</Text>
                  </View>
                ))}
              </View>

              <View className="bg-gray-50 p-3 rounded-lg mb-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-600">Tasks Assigned</Text>
                    <Text className="font-bold text-lg">{member.tasks.assigned}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Completed</Text>
                    <Text className="font-bold text-lg">{member.tasks.completed}</Text>
                  </View>
                  <View className="h-12 w-[1px] bg-gray-200" />
                  <View>
                    <Text className="text-gray-600">Completion Rate</Text>
                    <Text className="font-bold text-lg">
                      {Math.round((member.tasks.completed / member.tasks.assigned) * 100)}%
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="mail" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">{member.email}</Text>
                </View>
                <View className="flex-row items-center flex-1">
                  <Ionicons name="call" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">{member.phone}</Text>
                </View>
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
                  <Ionicons name="mail" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Message</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}