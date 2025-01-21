import React from 'react';
import { View } from 'react-native';
import { Cell } from './cell';
import { sum } from '@/utils';

export function Col({
  data,
  style,
  width,
  heightArr,
  flex,
  textStyle,
  ...props
}) {
  if (!data) return null;

  return (
    <View
      // Tailwind className (opsional), misalnya agar default "flex-col" dsb.
      className=""
      style={[
        // Jika props.width ada, gunakan itu. Jika tidak ada, default flex:1
        width ? { width } : { flex: 1 },
        // Jika props.flex ada, gunakan juga
        flex && { flex },
        // style tambahan dari luar
        style,
      ]}
    >
      {data.map((item, i) => {
        const height = heightArr && heightArr[i];
        return (
          <Cell
            key={i}
            data={item}
            width={width}
            height={height}
            textStyle={textStyle}
            {...props}
          />
        );
      })}
    </View>
  );
}

export function Cols({
  data,
  style,
  widthArr,
  heightArr,
  flexArr,
  textStyle,
  ...props
}) {
  if (!data) return null;

  // Hitung total lebar jika ada widthArr
  const totalWidth = widthArr ? sum(widthArr) : 0;

  return (
    <View
      // Gunakan Tailwind untuk arah horizontal
      className="flex-row"
      style={[
        // Jika totalWidth dihitung, pakai style inline
        totalWidth && { width: totalWidth },
        style,
      ]}
    >
      {data.map((item, i) => {
        const flex = flexArr && flexArr[i];
        const colWidth = widthArr && widthArr[i];

        return (
          <Col
            key={i}
            data={item}
            width={colWidth}
            heightArr={heightArr}
            flex={flex}
            textStyle={textStyle}
            {...props}
          />
        );
      })}
    </View>
  );
}
