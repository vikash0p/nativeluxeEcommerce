/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserScreen from '../screens/UserScreen';
import NotificationScreen from '../screens/NotificationScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CustomHeader from "../components/ReusableComponents/CustomHeader";


const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(5); // Example notification count
  const [unreadFavorites, setUnreadFavorites] = useState(10); // Example notification count

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBarStyle,

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
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={size} color={color} />
              {/* Badge for Cart Tab */}

              {/* Badge for Notification Tab */}
              {route.name === 'Notification' && unreadNotifications > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{unreadNotifications}</Text>
                </View>
              )}
              {route.name === 'Favorite' && unreadFavorites > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{unreadFavorites}</Text>
                </View>
              )}
            </View>
          );
        },
      })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen
        name="Product"
        component={ProductScreen}
        options={{tabBarLabel: 'Products'}}
      />
      <Tabs.Screen name="Favorite" component={FavoriteScreen} options={{
        tabBarLabel: 'Favorites',
        headerShown: true,
        header: () => <CustomHeader data={{title: 'Favorites'}} />,
      }} />
      <Tabs.Screen name="Notification" component={NotificationScreen} />
      <Tabs.Screen name="User" component={UserScreen} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingBottom: 8,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabNavigation;
