import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const CardPayment: React.FC<{totalAmount: number}> = ({totalAmount}) => {
  return (
    <View className="">
      {/* Top Note */}
      <Text className="text-gray-500 text-sm mb-4">
        Please ensure your card can be used for online transactions.{' '}
        <TouchableOpacity>
          <Text className="text-blue-500 underline">Learn more</Text>
        </TouchableOpacity>
      </Text>

      {/* Card Number */}
      <View className="mb-4">
        <Text className="font-semibold text-sm mb-1">Card Number</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-3"
          placeholder="XXXX XXXX XXXX XXXX"
          keyboardType="numeric"
        />
      </View>

      {/* Expiry and CVV */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-2">
          <Text className="font-semibold text-sm mb-1">Expiry (MM/YY)</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3"
            placeholder="MM/YY"
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1 ml-2">
          <Text className="font-semibold text-sm mb-1">CVV</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg p-3"
            placeholder="CVV"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-[#4f46e5] rounded-lg p-4">
        <Text className="text-white text-center font-semibold">
          Pay ${totalAmount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPayment;
