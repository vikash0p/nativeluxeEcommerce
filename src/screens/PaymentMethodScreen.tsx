import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PaymentMethod {
  id: string;
  label: string;
  icon: string;
}

const PaymentMethodScreen: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {id: 'COD', label: 'Cash on Delivery', icon: 'cash'},
    {id: 'Card', label: 'Credit/Debit Card', icon: 'credit-card'},
    {id: 'NetBanking', label: 'Net Banking', icon: 'bank'},
    {id: 'UPI', label: 'UPI', icon: 'qrcode-scan'},
  ];

  const handleSelect = (method: string): void => {
    setSelectedMethod(method);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Select Payment Method
      </Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelect(item.id)}
            className={`flex-row items-center p-4 rounded-lg mb-3 border ${
              selectedMethod === item.id
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300'
            }`}>
            <Icon
              name={item.icon}
              size={24}
              className={
                selectedMethod === item.id ? 'text-blue-500' : 'text-gray-500'
              }
            />
            <Text className="ml-4 text-lg text-gray-800">{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedMethod && (
        <View className="mt-6 p-4 rounded-lg bg-green-100 border border-green-500">
          <Text className="text-center text-green-700 font-medium">
            Selected Payment Method:{' '}
            {paymentMethods.find(method => method.id === selectedMethod)?.label}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PaymentMethodScreen;
