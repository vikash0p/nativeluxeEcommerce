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
  const {data, isLoading, isError, error} = useGetAddressesByUserQuery(
    user?._id ?? '',
  );

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
            // Ensure the button is disabled when there are no items in the cart
            if (cartData?.items.length === 0) {
              return; // Do nothing if the cart is empty
            }

            navigation.navigate('OrderSummary');
          }}
          className={`bg-[#4f46e5] rounded-full py-3 justify-center items-center shadow-md ${
            cartData?.items.length === 0 ? 'opacity-50' : 'opacity-100'
          }`}
          disabled={cartData?.items.length === 0} // Disable button if no items in the cart
        >
          <Text className="text-white font-semibold text-xl">
            {cartData?.items.length === 0 ? 'No Items' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShippingAddressScreen;
