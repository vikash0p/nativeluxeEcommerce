/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {CartData} from '../utils/types/cartType';
import PriceSummary from '../components/cartComponents/PriceSummary';
import EmptyCart from '../components/cartComponents/EmptyCart';
import CartItems from '../components/cartComponents/CartItems';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigationTypes';
const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? '';
  const {data, isLoading} = useGetCartQuery(userId);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg text-gray-600 mt-4">Loading your cart...</Text>
      </View>
    );
  }
  const cartData = data as CartData;
  // console.log('🚀 ~ file: CartScreen.tsx:27 ~ cartData:', cartData);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Cart Items */}
      <View className="flex-1  ">
        {cartData?.items?.length ? (
          <CartItems items={cartData.items} cartData={cartData} />
        ) : (
          <EmptyCart />
        )}
      </View>

      <PriceSummary
        cartData={cartData}
        name={() => navigation.navigate('shippingAddress')}
        title="Checkout"
      />
    </View>
  );
};
export default CartScreen;
