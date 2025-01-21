import React from 'react';
import { View } from 'react-native';
import { Cell } from './cell';
import { sum } from '@/utils';

export function Row({ data, widthArr, ...props}) {
  if (!data) return null;


  return (
    <View className="flex-row overflow-hidden items-center justify-center">
      {data.map((item, i) => {
        const wth = widthArr && widthArr[i];
        return (
          <Cell
            key={i}
            data={item}
            width={wth}
            {...props}
          />
        );
      })}
    </View>
  );
}

export function Rows({
  data,
  style,
  widthArr,
  heightArr,
  flexArr,
  textStyle,
}) {
  if (!data) return null;

 
  const totalWidth = widthArr ? sum(widthArr) : 0;

  return (
    <View style={[totalWidth && { width: totalWidth }]}>
      {data.map((item, i) => {
        return (
          <Row key={i} data={item}  widthArr={widthArr}/>
        );
      })}
    </View>
  );
}
