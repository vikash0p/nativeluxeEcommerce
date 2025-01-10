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
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import MyReviewScreen from '../screens/MyReviewScreen';
import SettingScreen from '../screens/SettingScreen';
import MyOrderScreen from '../screens/MyOrderScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  const {filterType, filterValue} = useAppSelector(
    (state: RootState) => state.productQuery,
  );
  const {isAuthenticated} = useAppSelector((state: RootState) => state.auth);
  console.log(
    '🚀 ~ file: StackNavigation.tsx:23 ~ isAuthenticated:',
    isAuthenticated,
  );

  const cartData = {
    title: 'Cart',
  };
  const singleProductData = {
    title: 'Product Details',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={  'Success' }
        screenOptions={{headerShown: false}}>
        {/* Conditionally render authentication-related screens */}
        {!isAuthenticated && (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </>
        )}

        {/* Render authenticated screens */}
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="ViewMore"
          component={ViewMore}
          options={{
            headerShown: true,
            header: () => (
              <CustomHeader
                data={{
                  title: `${filterType} / ${filterValue
                    .charAt(0)
                    .toUpperCase()}${filterValue.slice(1)}`,
                }}
              />
            ),
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
        <Stack.Screen
          name="MyOrder"
          component={MyOrderScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'My Orders'}} />,
          }}
        />
        <Stack.Screen
          name="shippingAddress"
          component={ShippingAddressScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'Shipping Address'}} />,
          }}
        />
        <Stack.Screen
          name="paymentMethod"
          component={PaymentMethodScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'Payment Method'}} />,
          }}
        />
        <Stack.Screen
          name="myReview"
          component={MyReviewScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'My Reviews'}} />,
          }}
        />
        <Stack.Screen
          name="setting"
          component={SettingScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'Setting'}} />,
          }}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummaryScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'Order Summary'}} />,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader data={{title: 'Payment'}} />,
          }}
        />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
