/* eslint-disable react-native/no-inline-styles */
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

import {RootStackParamList} from '../navigation/navigationTypes';
import {useNavigation} from '@react-navigation/native';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';

const ShippingAddressScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {addresses} = useAppSelector((state: RootState) => state.address);
  console.log(
    '🚀 ~ file: ShippingAddressScreen.tsx:26 ~ addresses:',
    addresses,
  );
  const {data, isLoading, isError, error, refetch} = useGetAddressesByUserQuery(
    user?._id ?? '',
  );

  React.useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [user?._id, refetch]);

  const {data: cartData} = useGetCartQuery(user?._id ?? '');
  // console.log('🚀 ~ file: ShippingAddressScreen.tsx:30 ~ cartData:', cartData);

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
          <Text className="text-red-500 text-center text-2xl">
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
      const reversedData = data.slice().reverse(); // Reverse the array once

      return (
        <FlatList
          data={reversedData} // Use the reversed array here
          keyExtractor={item => item._id!}
          renderItem={({item}) => <AddressDetails item={item} />} // Render individual items
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

  const isButtonDisabled =
    !cartData?.items.length ||
    !addresses ||
    Object.keys(addresses).length === 0;

  const handlePress = () => {
    if (isButtonDisabled) {
      return;
    }
    navigation.navigate('OrderSummary');
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
          onPress={handlePress}
          className={`bg-[#4f46e5] rounded-full py-3 justify-center items-center shadow-md ${
            isButtonDisabled ? 'opacity-50' : 'opacity-100'
          }`}
          disabled={isButtonDisabled}>
          <Text className="text-white font-semibold text-xl">
            {isButtonDisabled ? 'disabled' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShippingAddressScreen;
