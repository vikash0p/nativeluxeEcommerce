import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';

const Checkout = () => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg ">
      <View className="flex-row items-center border ps-3 rounded-lg mb-3">
        <TextInput
          placeholder="Enter promo code"
          className="flex-1 text-base text-gray-700"
          placeholderTextColor="gray"
        />
        <TouchableOpacity className="ml-3 bg-indigo-600 px-4 py-3 rounded-md">
          <Text className="text-white text-base font-semibold">Apply</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-indigo-600 py-4 rounded-lg">
        <Text className="text-center text-white text-lg font-semibold">
          Proceed to Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
