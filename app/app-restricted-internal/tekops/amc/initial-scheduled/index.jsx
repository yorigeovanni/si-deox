import React, { Fragment, useRef, useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text as RnText } from 'react-native';
import * as Utils from '@/utils';
import { useRouter, useFocusEffect } from 'expo-router';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Image, ListItem, Text, Icon, StarRating, Tag } from '@/components';
import { BaseColor, useTheme } from '@/config';
import { useTranslation } from 'react-i18next';
import FlightCardBlue from '@/assets/flight-card-blue.jpg';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import DataGrid from '@/components/internal/data-grid';


// STATE MANAGEMENT
import { current, produce } from "immer"
import { useStore } from '@tanstack/react-store';
import crudState from '@/crud-state/internal/x_data_amc';


dayjs.extend(utc);
dayjs.extend(customParseFormat);


export default () => {
  const router = useRouter();
  const viewMode = useStore(crudState, (state) => state.viewMode);
  const title = useStore(crudState, (state) => state.title);
  const model = useStore(crudState, (state) => state.model);
  const fields = useStore(crudState, (state) => state.fields);
  const limit = useStore(crudState, (state) => state.limit);
  const offset = useStore(crudState, (state) => state.offset);
  const sort = useStore(crudState, (state) => state.sort);
  const domain = useStore(crudState, (state) => state.domain);



  const setViewMode = useCallback((viewMode) => {
    crudState.setState(currentState => produce(currentState, draftState => {
      draftState.viewMode = viewMode
    }))
  }, []);



  const setSort = useCallback((sort) => {
    crudState.setState(currentState => produce(currentState, draftState => {
      draftState.sort = sort
    }))
  }, []);


  const setLimit = useCallback((sort) => {

  }, []);


  const onBack = useCallback(() => {
    router.back();
  }, [router]);


  const onAddClick = useCallback(() => {
    router.push('./add', { relativeToDirectory: true });
  }, [router]);


  const onSearch = useCallback(() => {
    router.push('./search', { relativeToDirectory: true });
  }, [router]);


  const onFilter = useCallback(() => {
    router.push('./filters', { relativeToDirectory: true });
  }, [router]);



  console.log('KUDA -CULIK =====================')
  console.log(sort)
  console.log('KUDA -CULIK =====================')




  return (<DataGrid
    title={title || 'AIRPORT DATA'}
    model={model}
    fields={fields || {}}
    viewMode={viewMode || 'grid'}
    limit={limit}
    offset={offset || 0}
    sort={[...sort] || []}
    domain={domain || []}


    setViewMode={setViewMode}
    setLimit={setLimit}
    setSort={setSort}
    onBack={onBack}
    onFilter={onFilter}
    onSearch={onSearch}
    onAddClick={onAddClick}
    //componentRender
    GridRender={GridRender}
    ListRender={ListRender}
    BlockRender={BlockRender}

  />);
}





//X-RON (Extra Remain Over Night)


function GridRender({ item, index }) {
  const router = useRouter();
  return (
    <ListItem
      grid
      image={FlightCardBlue}
      title={item.x_studio_reg_number}
      subtitle={item.x_studio_operator?.display_name}
      rate={`${item.x_studio_extra_arrivals_flight_number?.length} ARRIVALS`}
      status={'RON'} // REMAIN OVER NIGHT
      location={item?.create_date ? dayjs.utc(item?.create_date, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY HH:mm") : '-'}
      favorite={true}
      style={{
        marginLeft: 15,
        marginBottom: 15,
      }}
    //onPress={() => onView(item)}
    // onPressTag={() => { /**onReview(item) */ }}
    />
  )
}



function ListRender({ item, index }) {
  const router = useRouter();
  return (
    <ListItem
      list
      image={FlightCardBlue}
      title={item.title}
      subtitle={item.category?.title}
      location={item.address}
      phone={item.phone}
      rate={item.rate}
      status={item.status}
      numReviews={item.numRate}
      favorite={false}
      style={{
        marginBottom: 15,
      }}
    // onPress={() => onView(item)}
    // onPressTag={() => { /**onReview(item) */ }}
    />
  )
}





function BlockRender({ item, index }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();


  return (<ListItem block>
    <View>
      <TouchableOpacity onPress={() => router.push(`./view/${item.id}`, { relativeToDirectory: true })}>
        <Image source={FlightCardBlue} style={styles.blockImage} />
        <View className=' absolute top-4 left-4 flex-col'>
          <RnText className=' text-xl font-extrabold text-gray-700 '>{item.x_studio_operator?.display_name}</RnText>
        </View>
        <View className=' absolute top-4 right-4 flex-col'>
          <RnText className=' text-xl font-extrabold text-gray-700 '>{item.x_studio_type_pesawat?.display_name}</RnText>
        </View>

        <View className=' absolute top-16 left-6 flex-col'>
          <View className='mt-2 p-1 rounded'>
            <RnText className='text-gray-700 text-sm font-extrabold'>ARRIVALS</RnText>
          </View>
          {item.x_studio_extra_arrivals_flight_number?.map((flight_number, index) => {
            return (<View className='mt-2 bg-gray-200 p-1 rounded' key={index}>
              <RnText className=' text-sm'>{flight_number.x_studio_flight_number} ({flight_number.x_studio_from?.display_name} - {flight_number.x_studio_destination?.display_name})</RnText>
            </View>)
          })}
        </View>

        <View className=' absolute top-16 right-6 flex-col'>
          <View className='mt-2 p-1 rounded'>
            <RnText className='text-gray-700 text-sm font-extrabold'>DEPARTURES</RnText>
          </View>
          {item.x_studio_extra_departures_flight_number?.map((flight_number, index) => {
            return (<View className='mt-2 bg-gray-200 p-1 rounded' key={index}>
              <RnText className=' text-sm'>{flight_number.x_studio_flight_number} ({flight_number.x_studio_from?.display_name} - {flight_number.x_studio_destination?.display_name})</RnText>
            </View>)
          })}
        </View>


        <View style={{ position: 'absolute', bottom: 5, left: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Tag rate onPress={() => { }}>
              {item.x_studio_extra_arrivals_flight_number?.length}
            </Tag>
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text caption1 whiteColor semibold >
                FLIGHT NUMBER
              </Text>
              <Text caption1 whiteColor bold>
                ARRIVALS
              </Text>
              <StarRating
                disabled={true}
                starSize={10}
                maxStars={5}
                rating={4}
                selectedStar={() => { }}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 5, right: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Tag rate onPress={() => { }}>
              {item.x_studio_extra_departures_flight_number?.length}
            </Tag>
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text caption1 whiteColor semibold >
                FLIGHT NUMBER
              </Text>
              <Text caption1 whiteColor bold>
                DEPARTURES
              </Text>
              <StarRating
                disabled={true}
                starSize={10}
                maxStars={5}
                rating={4}
                selectedStar={() => { }}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>


      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>



        <View className='flex-row items-center justify-between'>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View className='flex-col py-1 px-2 rounded-md bg-gray-200'>
              <RnText className='text-sm text-gray-700 leading-4' style={{ paddingHorizontal: 4 }}>
                STA
              </RnText>
              <IconMaterial
                name="flight"
                size={24}
                color={colors.primaryLight}
                style={{
                  transform: [{ rotate: '-45deg' }]
                }}
              />
            </View>
            <View className='flex-col'>
              <RnText className='text-sm text-gray-700 font-bold' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_sta ? `${dayjs.utc(item?.x_studio_sta, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm")}` : '--:--'}
              </RnText>
              <RnText className='text-sm text-gray-500' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_sta ? `${dayjs.utc(item?.x_studio_sta, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY")}` : 'XX-XX-XXXX'}
              </RnText>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View className='flex-col py-1 px-2 rounded-md bg-gray-200'>
              <RnText className='text-sm text-gray-700 leading-4' style={{ paddingHorizontal: 4 }}>
                ATA
              </RnText>
              <IconMaterial
                name="flight"
                size={24}
                color={colors.primaryLight}
                style={{
                  transform: [{ rotate: '-90deg' }]
                }}
              />
            </View>
            <View className='flex-col'>
              <RnText className='text-sm text-gray-700 font-bold' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_ata ? `${dayjs.utc(item?.x_studio_ata, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm")}` : '--:--'}
              </RnText>
              <RnText className='text-sm text-gray-500' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_ata ? `${dayjs.utc(item?.x_studio_ata, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY")}` : 'XX-XX-XXXX'}
              </RnText>
            </View>
          </View>

        </View>

        <View className='flex-row items-center justify-between'>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View className='flex-col py-1 px-2 rounded-md bg-gray-200'>
              <RnText className='text-sm text-gray-700 leading-4' style={{ paddingHorizontal: 4 }}>
                STD
              </RnText>
              <IconMaterial
                name="flight"
                size={24}
                color={colors.primaryLight}
                style={{
                  transform: [{ rotate: '45deg' }]
                }}
              />
            </View>
            <View className='flex-col'>
              <RnText className='text-sm text-gray-700 font-bold' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_std ? `${dayjs.utc(item?.x_studio_std, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm")}` : '--:--'}
              </RnText>
              <RnText className='text-sm text-gray-500' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_std ? `${dayjs.utc(item?.x_studio_std, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY")}` : 'XX-XX-XXXX'}
              </RnText>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View className='flex-col py-1 px-2 rounded-md bg-gray-200'>
              <RnText className='text-sm text-gray-700 leading-6' style={{ paddingHorizontal: 4 }}>
                ATD
              </RnText>
              <IconMaterial
                name="flight"
                size={24}
                color={colors.primaryLight}
                style={{
                  transform: [{ rotate: '90deg' }]
                }}
              />
            </View>
            <View className='flex-col'>
              <RnText className='text-sm text-gray-700 font-bold' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_atd ? `${dayjs.utc(item?.x_studio_atd, "YYYY-MM-DD HH:mm:ss").local().format("HH:mm")}` : '--:--'}
              </RnText>
              <RnText className='text-sm text-gray-500' style={{ paddingHorizontal: 4 }}>
                {item?.x_studio_atd ? `${dayjs.utc(item?.x_studio_atd, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YYYY")}` : 'XX-XX-XXXX'}
              </RnText>
            </View>
          </View>


        </View>

        <View className='flex-row items-center justify-between'>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View className='flex-col'>
              <RnText className='text-sm text-gray-500' style={{ paddingHorizontal: 4 }}>
                Updated - {dayjs.utc(item?.write_date, "YYYY-MM-DD HH:mm:ss").local().format("DD-MM-YY HH:mm")}
              </RnText>
              <RnText className='text-sm text-gray-700 font-bold' style={{ paddingHorizontal: 4 }}>
                {((item.write_uid?.display_name).length > 25) ? (((item.write_uid?.display_name).substring(0, 25 - 3)) + '...') : item.write_uid?.display_name}
              </RnText>

            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push(`./edit/${item.id}`, { relativeToDirectory: true })}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginRight: 32 }}>
            <View className='flex-row py-1 px-2 rounded-md bg-orange-500 items-center justify-center\'>
              <RnText className='text-sm text-center text-white leading-4' style={{ paddingHorizontal: 4 }}>
                UPDATE
              </RnText>
              <IconMaterial
                name="flight"
                size={24}
                color={'#ffffff'}
                style={{
                  transform: [{ rotate: '90deg' }]
                }}
              />
            </View>
          </TouchableOpacity>

        </View>


      </View>



    </View>
  </ListItem>)
}





const styles = StyleSheet.create({
  blockImage: {
    height: Utils.scaleWithPixel(200),
    width: '100%',
  },
  tagStatus: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  iconLike: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  blockContentRate: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  blockLineMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  blockLinePhone: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  //list css
  listImage: {
    height: Utils.scaleWithPixel(140),
    width: Utils.scaleWithPixel(120),
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  listContent: {
    flexDirection: 'row',
  },
  listContentRight: { paddingLeft: 10, paddingVertical: 5, flex: 1 },
  lineRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  listTagStatus: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  iconListLike: {
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  //gird css
  girdImage: {
    borderRadius: 8,
    height: Utils.scaleWithPixel(120),
    width: '100%',
  },
  girdContent: {
    flex: 1,
  },
  tagGirdStatus: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  iconGirdLike: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallContentRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  smallImage: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  moreButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
})


