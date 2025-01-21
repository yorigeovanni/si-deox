import React from 'react';
import { View } from 'react-native';


export function Table({ children}) {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (!child || !child.type) {
        return child; 
      }
      if (child?.type?.displayName !== 'ScrollView') {
        return React.cloneElement(child);
      }
      return child;
    });
  };
  return (
    <View className="bg-white">
      {renderChildren()}
    </View>
  );
}
