import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {useGetCartQuery} from '../../redux-toolkit/features/cart/cartApi';
import {CartData} from '../../utils/types/cartType';
import {RootState} from '../../redux-toolkit/store';
import CartItems from '../cartComponents/CartItems';
import OrderAddress from './OrderAddress';
import PriceSummary from '../cartComponents/PriceSummary';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {useNavigation} from '@react-navigation/native';

const OrderSummaryDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


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

  return (
    <View className="flex-1 bg-gray-50 border ">
      {/* Order Address */}
      <OrderAddress />
      {/* Cart Items */}
      <View className="flex-1  ">
        {cartData?.items?.length && (
          <CartItems items={cartData.items} cartData={cartData} />
        )}
      </View>
      <PriceSummary
        cartData={cartData}
        name={() => navigation.navigate('Payment')}
        title={'Payment'}
      />
    </View>
  );
};

export default OrderSummaryDetails;
