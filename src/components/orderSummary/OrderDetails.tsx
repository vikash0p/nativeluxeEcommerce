import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useGetUserOrdersQuery} from '../../redux-toolkit/features/order/orderApi';
import OrderCard from './OrderCard';

const OrderDetails = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? ' ';
  const {data, isLoading, isError} = useGetUserOrdersQuery(userId);
  console.log('🚀 ~ file: OrderDetails.tsx:17 ~ data:', data?.orders.length);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg text-gray-600 mt-4">Loading orders...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">
          Failed to load orders. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-gray-50 flex-1 mb-10">
      <View className="p-1">

        <FlatList
          data={data.orders}
          keyExtractor={item => item._id}
          renderItem={({item}) => <OrderCard order={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
