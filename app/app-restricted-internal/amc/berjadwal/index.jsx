import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';



export default function DataHarian() {
  const [tableHead] = useState([
    'DATE',
    'OPERATOR',
    'REG. NUMBER',
    'FLIGHT NUMBER ARRIVAL',
    'FLIGHT NUMBER DEPARTURE',
    'FROM',
    'DESTINATION',
    'Head8',
    'Head9',
  ]);
  const [widthArr] = useState([120, 150, 200, 240, 240, 140, 160, 180, 200]);


  const tableData = [];
  for (let i = 0; i < 10; i++) {
    const rowData = [];
    for (let j = 0; j < 9; j++) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <View className="flex-1 bg-white pt-8">
      <View className=' flex-1 flex-col'>
        <View className='flex-row justify-between p-4'>
          <Text className='text-red-700'>Header</Text>
          <Text className='text-red-700'>+ DATA BARU</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View className="bg-white">
              <View className="flex-row overflow-hidden items-center justify-center">
                {tableHead.map((item, index) => {
                  return (<View style={[
                    { width: widthArr[index] },
                  ]} key={index} className="h-12 bg-gray-100 p-2 border-b border-gray-200">
                    <Text className={`bg-gray-100 p-2 text-center text-sm text-gray-700 font-bold `}>
                      {item}
                    </Text>
                  </View>)
                })}
              </View>
            </View>


            <ScrollView className="mt-[-1px]">


              <View className="bg-white">
                {tableData.map((rowData, index) => {
                  return (<View key={index} className="flex-row ">
                    {rowData.map((item, i) => {
                      return (
                        <Text
                          key={i}
                          style={[{ width: widthArr[i] }]}
                          className={`p-2 text-center border-b border-gray-200 text-sm text-gray-700 w-28`}
                        >
                          {item}
                        </Text>
                      )
                    })}
                  </View>)

                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        <View className='flex-row justify-between bg-red-800 p-4 h-20'>
        <Text className='text-white'>Footer</Text>
      </View>
      </View>

      
    </View>
  );
}
