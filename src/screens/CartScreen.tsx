import React from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CartCard from '../components/cartComponents/CartCard';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {CartData} from '../utils/types/cartType';

const CartScreen = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? '';
  const {data, error, isLoading, isError} = useGetCartQuery(userId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg text-gray-600 mt-4">Loading your cart...</Text>
      </View>
    );
  }

  if (isError) {
    console.error('Error fetching cart data:', error);
    Alert.alert('Error', 'Failed to load cart. Please try again.');
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-red-600">
          An error occurred while loading the cart.
        </Text>
      </View>
    );
  }

  const cartData = data as CartData;

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Cart Items */}
      <View className="flex-1 mb-20">
        {cartData?.items?.length ? (
          <FlatList
            data={cartData.items}
            keyExtractor={item => item.id}
            renderItem={({item}) => <CartCard item={item} />}
          />
        ) : (
          <Text className="text-center text-lg text-gray-600">
            Your cart is empty.
          </Text>
        )}
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg ">
        <TouchableOpacity className="bg-indigo-600 py-4 rounded-lg">
          <Text className="text-center text-white text-lg font-semibold">
            Proceed to Buy ({cartData?.items?.length} items)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
