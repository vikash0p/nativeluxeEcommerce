import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useGetAddressesByUserQuery} from '../redux-toolkit/features/address/addressApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import AddressDetails from '../components/addressComponents/AddressDetails';
import AddAddress from '../components/addressComponents/AddAddress';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/navigationTypes'
import { useNavigation } from "@react-navigation/native";


const ShippingAddressScreen = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {data, isLoading, isError, error} = useGetAddressesByUserQuery(
    user?._id ?? '',
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="mt-2 text-gray-500">Loading addresses...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-center">
            {'data' in error &&
            typeof error.data === 'object' &&
            error.data !== null &&
            'message' in error.data
              ? (error.data as {message: string}).message
              : 'Something went wrong!'}
          </Text>
        </View>
      );
    }

    if (data?.length) {
      return (
        <FlatList
          data={data}
          keyExtractor={item => item._id!}
          renderItem={item => <AddressDetails item={item.item} />}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      );
    }

    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-center">
          No saved addresses yet. Add a new one!
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Add New Address Section */}
      <AddAddress />

      {/* Render Content (Loading, Error, or List) */}
      <View className="flex-1 ">{renderContent()}</View>

      {/* Continue Button */}
      <View className="w-full mt-4">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrderSummary');
          }}
          className="bg-[#4f46e5] rounded-full py-3 justify-center items-center shadow-md">
          <Text className="text-white font-semibold text-xl">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShippingAddressScreen;
