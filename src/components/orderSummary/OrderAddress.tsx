import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import { useNavigation } from "@react-navigation/native";
import {RootStackParamList} from '../../navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


const OrderAddress = () => {
  const {addresses} = useAppSelector((state: RootState) => state.address);
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleAddressPress = () => {
    navigation.navigate('shippingAddress');
  }


  if (!addresses) {
    return null;
  }

  return (
    <View className="bg-white p-6 rounded-lg shadow-md">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">Deliver To:</Text>
        <TouchableOpacity className="bg-[#4f46e5] px-4 py-2 rounded-sm" onPress={handleAddressPress}>
          <Text className="text-white font-medium">Change</Text>
        </TouchableOpacity>
      </View>
      <View className="space-y-2">
        <Text className="text-gray-900 font-medium text-xl">
          {addresses?.name || 'No Name Provided'}
        </Text>
        <Text className=" text-base">
          {addresses?.street || 'No Street Address Provided'}
        </Text>
        <Text className=" text-base">
          {addresses?.state || 'No State'} {addresses?.country || 'No Country'}
        </Text>
        <Text className=" text-base">
          {addresses?.postalCode || 'No Postal Code'}
        </Text>
      </View>
    </View>
  );
};

export default OrderAddress;
