import {View, Text} from 'react-native';
import React from 'react';
import {CartData} from '../../utils/types/cartType';

const OrderSummary = ({cartData}: {cartData: CartData}) => {
  return (
    <View className="bg-white p-4 border w-[90%] m-auto ">
      <Text className="text-xl font-semibold text-black mb-2">
        Order Summary
      </Text>

      <View className="flex-row justify-between mt-2">
        <Text className="text-black font-semibold">
          Price ({cartData.totalProducts} items)
        </Text>
        <Text className="font-semibold text-black">
          ${cartData?.totalOriginalPrice?.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-black font-semibold">Discount Price</Text>
        <Text className="font-semibold text-green-500">
          - ${cartData.discountPrice?.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-black font-semibold">Delivery Charges</Text>
        <Text className="font-semibold text-green-500 ">Free Delivery</Text>
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-black font-semibold">Total Items:</Text>
        <Text className="font-semibold text-black">
          {cartData?.totalQuantity}
        </Text>
      </View>
      {/* Separator Line */}
      <View className="flex-row justify-between mt-2">
        <Text className="text-black font-semibold">Total Quantity:</Text>
        <Text className="font-semibold text-black">
          {cartData?.totalProducts}
        </Text>
      </View>
      {/* Another Separator Line */}
      <View className="w-full h-[2px] bg-black mt-4 " />
      <View className="flex-row justify-between ">
        <Text className="text-black font-bold text-lg">Total Price:</Text>
        <Text className="font-semibold text-black text-lg">
          ${cartData?.totalAmount?.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderSummary;
