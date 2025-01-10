import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CartData} from '../../utils/types/cartType';

const PriceSummary = ({
  cartData,
  name,
  title,
}: {
  cartData: CartData;
  name: () => void;
  title: string;
}) => {
  if (!cartData?.items?.length) {
    return null; // If no items, return null to render nothing
  }

  return (
    <View className="bg-white p-6 rounded-lg shadow-md flex-row items-center justify-between space-x-4">
      <View className="flex-1">
        <Text className="text-gray-500 line-through text-md">
          ${cartData.totalOriginalPrice}
        </Text>
        <Text className="text-black font-bold text-xl">
          ${cartData.totalAmount}
        </Text>
      </View>
      <TouchableOpacity
        className="flex-1 bg-indigo-600 py-4 rounded-sm shadow hover:bg-indigo-700 active:bg-indigo-800"
        onPress={name}>
        <Text className="text-center text-white text-lg font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PriceSummary;
