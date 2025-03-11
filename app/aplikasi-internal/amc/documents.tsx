import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const documents = [
  {
    id: 'DOC001',
    name: 'Project Charter.pdf',
    type: 'PDF',
    size: '2.5 MB',
    category: 'Planning',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2025-02-15',
    lastModified: '2025-02-15',
    status: 'Final',
    tags: ['Documentation', 'Planning']
  },
  {
    id: 'DOC002',
    name: 'Design Specifications.docx',
    type: 'Word',
    size: '1.8 MB',
    category: 'Design',
    uploadedBy: 'Michael Brown',
    uploadDate: '2025-02-14',
    lastModified: '2025-02-14',
    status: 'Draft',
    tags: ['Design', 'Specifications']
  },
  {
    id: 'DOC003',
    name: 'Project Timeline.xlsx',
    type: 'Excel',
    size: '956 KB',
    category: 'Planning',
    uploadedBy: 'Emily Davis',
    uploadDate: '2025-02-13',
    lastModified: '2025-02-13',
    status: 'Final',
    tags: ['Timeline', 'Planning']
  }
];

const quickStats = [
  { title: 'Total Documents', value: '45', icon: 'document-text', color: '#009688' },
  { title: 'Recent Uploads', value: '12', icon: 'cloud-upload', color: '#4CAF50' },
  { title: 'Shared Files', value: '28', icon: 'share', color: '#FFC107' },
  { title: 'Storage Used', value: '2.8 GB', icon: 'server', color: '#2196F3' },
];

const categories = ['All', 'Planning', 'Design', 'Development', 'Testing', 'Documentation'];

export default function DocumentsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconForFileType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'document-text';
      case 'word':
        return 'document';
      case 'excel':
        return 'grid';
      default:
        return 'document';
    }
  };

  const getColorForFileType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '#F44336';
      case 'word':
        return '#2196F3';
      case 'excel':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

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
            <Text className="text-white text-2xl font-bold">Documents</Text>
            <Text className="text-white/80">Manage project documents</Text>
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
                placeholder="Search documents..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity>
                <Ionicons name="filter" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                className={`mr-3 px-4 py-2 rounded-full ${
                  activeCategory === category ? 'bg-teal-600' : 'bg-white'
                }`}
              >
                <Text className={`${
                  activeCategory === category ? 'text-white' : 'text-gray-700'
                }`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="cloud-upload" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">Upload</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <View className="flex-row items-center justify-center">
                <Ionicons name="folder" size={20} color="#009688" />
                <Text className="text-teal-600 font-semibold ml-2">New Folder</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Documents List */}
          {filteredDocuments.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row items-start mb-3">
                <View 
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: `${getColorForFileType(doc.type)}20` }}
                >
                  <Ionicons 
                    name={getIconForFileType(doc.type)} 
                    size={24} 
                    color={getColorForFileType(doc.type)} 
                  />
                </View>
                <View className="flex-1 ml-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-lg font-bold">{doc.name}</Text>
                      <Text className="text-gray-600">{doc.size}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${
                      doc.status === 'Final' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <Text className={`text-xs ${
                        doc.status === 'Final' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {doc.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex-row flex-wrap mb-4">
                {doc.tags.map((tag, index) => (
                  <View 
                    key={index} 
                    className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-gray-600 text-sm">{tag}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Ionicons name="person" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">{doc.uploadedBy}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time" size={16} color="#666" />
                  <Text className="text-gray-600 ml-1">Modified: {doc.lastModified}</Text>
                </View>
              </View>

              <View className="flex-row mt-4 pt-4 border-t border-gray-100">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="download" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Download</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="share" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Share</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                  <Ionicons name="create" size={20} color="#009688" />
                  <Text className="text-teal-600 ml-2">Edit</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}