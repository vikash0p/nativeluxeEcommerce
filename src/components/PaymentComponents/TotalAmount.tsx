import React from 'react';
import {Text, View} from 'react-native';

const TotalAmount: React.FC<{totalAmount: number}> = ({totalAmount}) => {
  return (
    <View className="bg-white p-6 rounded-lg shadow-md mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Text className="text-lg font-semibold text-gray-700">
          Total Amount
        </Text>
      </View>
      <Text className="text-2xl font-bold text-[#4f46e5]">${totalAmount}</Text>
    </View>
  );
};

export default TotalAmount;
