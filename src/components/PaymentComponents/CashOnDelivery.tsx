import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CashOnDelivery: React.FC = () => {
  return (
    <TouchableOpacity className="flex-row items-center  p-4 bg-white rounded-lg shadow mb-2 ">
      <FontAwesome name="money" size={24} color="#4f46e5" />
      <Text className="text-lg font-semibold text-gray-700 ml-3">
        Cash on Delivery
      </Text>
    </TouchableOpacity>
  );
};
export default CashOnDelivery;
