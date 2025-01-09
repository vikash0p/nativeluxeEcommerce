import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PaymentHeader: React.FC = () => {
  return (
    <View className="items-center my-6 flex-row justify-center">
      <Icon name="lock" size={24} color="#4CAF50" className="mr-2" />
      <Text className="text-2xl font-bold text-gray-800">
        Payment 100% Secure
      </Text>
    </View>
  );
};
export default PaymentHeader;
