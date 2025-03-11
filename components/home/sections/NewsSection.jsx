import { View, Text, Image } from 'react-native';

export const NewsSection = ({ news }) => {
  return (
    <View className="p-4">
      {news.map((item) => (
        <View
          key={item.id}
          className="bg-white rounded-xl overflow-hidden mb-4"
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="text-lg font-bold mb-2">{item.title}</Text>
            <Text className="text-gray-500 mb-2">{item.date}</Text>
            <Text className="text-gray-600">{item.content}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};