import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PaymentFooter: React.FC = () => {
  return (
    <View className="items-center mt-6">
      <Text className="text-center text-2xl font-semibold text-gray-700">
        1 Lakh+ Happy Customers and Counting!
      </Text>
      <Icon name="sentiment-satisfied" size={40} className="mt-5" />
    </View>
  );
};

export default PaymentFooter;
