import React from 'react';
import { View, Text } from 'react-native';

export function Cell({
  data,
  width,
  height,
  flex,
  style,
  textStyle,
  borderStyle,
  ...props
}) {
  // Jika data adalah elemen React valid, langsung render. Jika bukan, bungkus dalam <Text>.
  const textDom = React.isValidElement(data) ? (data) : (
    <Text className="bg-transparent"  {...props}>
      {data}
    </Text>
  );


  return (
    <View
      className="h-24 flex items-center justify-center border"
      style={[
        width && { width },
        height && { height },
        flex && { flex },
        // Jika tidak ada width/flex/height/style → flex: 1
        !width && !flex && !height && !style && { flex: 1 }
      ]}
    >
      {textDom}
    </View>
  );
}
