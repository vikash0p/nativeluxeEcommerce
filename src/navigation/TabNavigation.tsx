/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import UserScreen from '../screens/UserScreen';
import NotificationScreen from '../screens/NotificationScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  const [unreadNotifications ] = useState(5);
  const [unreadFavorites] = useState(10);

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Product':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            case 'Favorite':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Notification':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'User':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }
          return (
            <View className="items-center relative">
              {focused && (
                <View className="h-[2px] w-16 bg-[#4f46e5] rounded-full absolute -top-2" />
              )}
              <Icon name={iconName} size={size} color={color} />

              {/* Badge for Notification Tab */}
              {route.name === 'Notification' && unreadNotifications > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  <Text className="text-white text-xs font-bold">
                    {unreadNotifications}
                  </Text>
                </View>
              )}
              {/* Badge for Favorite Tab */}
              {route.name === 'Favorite' && unreadFavorites > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
                  <Text className="text-white text-xs font-bold">
                    {unreadFavorites}
                  </Text>
                </View>
              )}
            </View>
          );
        },
      })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Product" component={ProductScreen} />
      <Tabs.Screen name="Favorite" component={FavoriteScreen} />
      <Tabs.Screen name="Notification" component={NotificationScreen} />
      <Tabs.Screen name="User" component={UserScreen} />
    </Tabs.Navigator>
  );
};

export default TabNavigation;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 12, // Tailwind "text-sm"
    fontWeight: '600', // Tailwind "font-semibold"
    marginBottom: 4, // Tailwind "mb-1"
  },
  tabBarStyle: {
    backgroundColor: '#f8f9fa', // Tailwind "bg-gray-100"
    borderTopWidth: 1,
    borderTopColor: '#d1d5db', // Tailwind "border-gray-300"
    height: 70, // Tailwind "h-16"
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
