/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import UserScreen from '../screens/UserScreen';
import AboutScreen from '../screens/AboutScreen';
import BlogScreen from '../screens/BlogScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image} from 'react-native';
import LogoutButton from '../components/ReusableComponents/LogoutButton';
import {useGetUserDetailsQuery} from '../redux-toolkit/features/auth/authApi';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  // Access the user from props passed by DrawerNavigation
  const {user} = props;

  return (
    <DrawerContentScrollView {...props}>
      {/* Header Section */}
      <View className="items-center p-6 mb-4 bg-indigo-600">
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          className="w-24 h-24 mb-4 rounded-full"
        />
        <Text className="text-lg font-bold text-white">
          Welcome, {user?.name}
        </Text>
        <Text className="text-sm text-indigo-200">{user?.email}</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
      <View className="px-4 mt-6">
        <LogoutButton />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  const {data} = useGetUserDetailsQuery('Auth');

  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerActiveTintColor: '#4f46e5',
        drawerInactiveTintColor: 'gray',
        drawerLabelStyle: {fontSize: 16, marginLeft: -10},
        drawerIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'User':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'About':
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
              break;
            case 'Blog':
              iconName = focused ? 'book' : 'book-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      drawerContent={props => (
        <CustomDrawerContent {...props} user={data?.result} />
      )}>
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Blog" component={BlogScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
