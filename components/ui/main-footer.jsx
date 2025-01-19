import { View, Text } from 'react-native';

export default function MainFooter() {
  return (

    <View className="flex flex-col items-center justify-center bg-white pt-3 pb-6 border-t border-red-800/25">
      <Text className="text-red-800 text-xs font-bold">BLU UPBU KELAS I DOMINE EDUARD OSOK - SORONG </Text>
      <Text className="text-red-800 text-xs">DIREKTORAT JENDERAL PERHUBUNGAN UDARA </Text>
      <Text className="text-red-800 text-xs">KEMENTERIAN PERHUBUNGAN</Text>
    </View>
  );
}

