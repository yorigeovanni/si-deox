import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const languages = [
  { id: 'en', name: 'English', region: 'United States', code: 'en-US' },
  { id: 'es', name: 'Español', region: 'España', code: 'es-ES' },
  { id: 'fr', name: 'Français', region: 'France', code: 'fr-FR' },
  { id: 'de', name: 'Deutsch', region: 'Deutschland', code: 'de-DE' },
  { id: 'it', name: 'Italiano', region: 'Italia', code: 'it-IT' },
  { id: 'pt', name: 'Português', region: 'Brasil', code: 'pt-BR' },
  { id: 'ru', name: 'Русский', region: 'Россия', code: 'ru-RU' },
  { id: 'ja', name: '日本語', region: '日本', code: 'ja-JP' },
  { id: 'ko', name: '한국어', region: '대한민국', code: 'ko-KR' },
  { id: 'zh', name: '中文', region: '中国', code: 'zh-CN' },
  { id: 'ar', name: 'العربية', region: 'المملكة العربية السعودية', code: 'ar-SA' },
  { id: 'hi', name: 'हिन्दी', region: 'भारत', code: 'hi-IN' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    // Here you would typically save the language preference
    router.back();
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      className={`flex-row items-center py-4 px-6 ${
        selectedLanguage === item.id ? 'bg-primary/5' : ''
      }`}
      onPress={() => handleLanguageSelect(item.id)}
    >
      <View className="flex-1">
        <Text className={`font-semibold text-lg ${
          selectedLanguage === item.id ? 'text-primary' : 'text-gray-900'
        }`}>
          {item.name}
        </Text>
        <Text className="text-gray-500">{item.region}</Text>
      </View>
      {selectedLanguage === item.id && (
        <Ionicons name="checkmark" size={24} color="#007AFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-200" />
        )}
        className="bg-white"
      />
    </View>
  );
}