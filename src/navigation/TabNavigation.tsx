/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerNavigation from './DrawerNavigation';

const Tabs = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        // Tab bar common options
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: '#ffffff'},

        // Dynamic Tab Bar Icon
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Product':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Contact':
              iconName = focused ? 'call' : 'call-outline';
              break;
            case 'Drawer':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle-outline'; // Fallback for undefined routes
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      {/* Tabs with Icons */}
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Product" component={ProductScreen} />
      <Tabs.Screen name="Cart" component={CartScreen} />
      <Tabs.Screen name="Contact" component={ContactScreen} />
      <Tabs.Screen name="Drawer" component={DrawerNavigation} options={{}} />
    </Tabs.Navigator>
  );
};

export default TabNavigation;
