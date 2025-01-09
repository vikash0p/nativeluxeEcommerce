import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';



const VoucherInput = () => {
  const [voucherNumber, setVoucherNumber] = useState('');
  const [voucherPin, setVoucherPin] = useState('');

  const handleSubmit = () => {
    if (!voucherNumber || !voucherPin) {
      Alert.alert('Error', 'Please enter both voucher number and pin.');
      return;
    }

    Alert.alert(
      'Success',
      `Voucher Number: ${voucherNumber}\nVoucher Pin: ${voucherPin}`,
    );
  };

  return (
    <View className="flex-1   ">
      <Text className="text-lg font-bold  text-gray-700">
        Enter Voucher Details
      </Text>
      <Text className="text-md mb-4 text-gray-700">
        Up to 15 gift cards can be added per transition
      </Text>

      <TextInput
        className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-gray-900"
        placeholder="Voucher Number"
        value={voucherNumber}
        onChangeText={setVoucherNumber}
        keyboardType="numeric"
      />

      <TextInput
        className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-white text-gray-900"
        placeholder="Voucher Pin"
        value={voucherPin}
        onChangeText={setVoucherPin}
        secureTextEntry
      />

      <TouchableOpacity
        className="w-full bg-[#4f46e5] p-3 rounded-md"
        onPress={handleSubmit}>
        <Text className="text-white text-lg text-center font-semibold">
          Add Gift Card
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherInput;
