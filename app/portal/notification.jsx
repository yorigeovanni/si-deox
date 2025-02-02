import React, {useState} from 'react';
import {RefreshControl, View, FlatList, StyleSheet} from 'react-native';
import {BaseStyle, useTheme} from '@/config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, ListThumbCircle} from '@/components';
import { useRouter } from "expo-router";


export default function Notification({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const router = useRouter();
 // const dispatch = useDispatch();
  const notification = [{"description": "Its time to build a difference ...", "id": "0", "image": 41, "time": "Dec 11, 2019", "title": "Sankhadeep"}, {"description": "Its time to build a difference ...", "id": "1", "image": 42, "time": "Dec 11, 2019", "title": "Sankhadeep"}, {"description": "Its time to build a difference ...", "id": "2", "image": 43, "time": "Dec 11, 2019", "title": "Sankhadeep"}, {"description": "Its time to build a difference ...", "id": "3", "image": 44, "time": "Dec 11, 2019", "title": "Sankhadeep"}, {"description": "Its time to build a difference ...", "id": "4", "image": 45, "time": "Dec 11, 2019", "title": "Sankhadeep"}, {"description": "Its time to build a difference ...", "id": "5", "image": 47, "time": "Dec 11, 2019", "title": "Sankhadeep"}];
  const [refreshing, setRefresh] = useState(false);

  /**
   * Reload wishlist
   */
  const onRefresh = () => {
    setRefresh(true);
   /* dispatch(
      notificationActions.onLoadNotification(null, () => {
        
      }),
    );*/
    setRefresh(false);
  };

  /**
   * render Content list
   */
  const renderContent = () => {
    if (notification?.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={notification}
          keyExtractor={(item, index) => `Notification ${index}`}
          renderItem={({item, index}) => (
            <ListThumbCircle
              image={item.image}
              txtLeftTitle={item.title}
              txtContent={item.description}
              txtRight={item.time}
              style={{marginBottom: 5}}
            />
          )}
        />
      );
    }
    if (notification?.length == 0) {
      return (
        <View style={styles.loadingContent}>
          <View style={{alignItems: 'center'}}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{marginBottom: 4}}
            />
            <Text>{t('data_not_found')}</Text>
          </View>
        </View>
      );
    }

    return (
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        keyExtractor={(item, index) => `Notification${index}`}
        renderItem={({item, index}) => <ListThumbCircle loading={true} />}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('notification')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
            router.back();;
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}



const styles = StyleSheet.create({
    loadingContent: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  });
  