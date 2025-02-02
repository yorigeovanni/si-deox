import { Tabs } from 'expo-router';
import {BaseColor, useTheme, useFont} from '@/config';
import {  Image} from "react-native";
import {useTranslation} from 'react-i18next';
import {Icon} from '@/components';
import BluLogo from '@/assets/blu.png';

export default function TabLayout() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const font = useFont();


  return (
    <Tabs 
        screenOptions={{ 
          tabBarInactiveTintColor: BaseColor.grayColor,
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: font,
            paddingBottom: 2
          }
        }}
        >
      <Tabs.Screen
        name="index"
        options={{
          title: t('BERANDA'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="home" size={20} solid />;
          },
        }}
      />


<Tabs.Screen
        name="ppid"
        options={{
          title: 'LIBURAN',
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="diagnoses" size={20} solid />;
          },
        }}
      />


    
      <Tabs.Screen
        name="facility"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'HOBI',
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="hands-helping" size={20} solid />;
          },
        }}
      />

<Tabs.Screen
        name="foods"
        options={{
          title: 'KULINER',
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="plane" size={20} solid />;
          },
        }}
      />


<Tabs.Screen
        name="internal"
        options={{
          title: 'INVESTASI',
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="user-shield" size={20} solid />;
          },
        }}
      />

<Tabs.Screen
        name="tentang-kami"
        options={{
          href: null
        }}
      />

     
     
    </Tabs>
  );
}
