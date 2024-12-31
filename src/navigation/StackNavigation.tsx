/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {RootStackParamList} from './navigationTypes';
import TabNavigation from './TabNavigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import CartScreen from '../screens/CartScreen';
import CustomHeader from '../components/ReusableComponents/CustomHeader';
import SearchScreen from '../screens/SearchScreen';
import ViewMore from '../screens/ViewMore';
import SingleProduct from '../screens/SingleProduct';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const {filterType , filterValue} = useAppSelector((state: RootState) => state.productQuery);
  const cartData = {
    title: 'Cart',
  };
  const singleProductData = {
    title: 'Product Details',
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="ViewMore"
          component={ViewMore}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: `${filterType} / ${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}`}} />,
          }}
        />
        <Stack.Screen
          name="SingleProduct"
          component={SingleProduct}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={singleProductData} />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={cartData} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
