import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import CartCard from '../components/cartComponents/CartCard';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {CartData} from '../utils/types/cartType';
import OrderSummary from '../components/cartComponents/OrderSummary';

const CartScreen = () => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const userId = user?._id ?? '';
  const {data, isLoading} = useGetCartQuery(userId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg text-gray-600 mt-4">Loading your cart...</Text>
      </View>
    );
  }

  const cartData = data as CartData;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Cart Items */}
      <View className="flex-1  ">
        {cartData?.items?.length ? (
          <ScrollView className="  ">
            {cartData.items.map(item => (
              <CartCard item={item} key={item.id} />
            ))}

            <OrderSummary cartData={cartData} />
          </ScrollView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/little-girl-pushing-shopping-cart_1308-33336.jpg?t=st=1735883951~exp=1735887551~hmac=fbcde1d735fd866faeb78469bf92991134857f441da468a2e73791f4b48243bf&w=360',
              }}
              className="w-72 h-72"
              resizeMode="contain"
            />
            <Text className="text-center text-xl text-gray-700 font-semibold mt-6">
              Your cart is empty.
            </Text>
            <Text className="text-center text-gray-600 mt-2">
              Start adding items to your cart and enjoy shopping!
            </Text>
          </View>
        )}
      </View>

      <View className="bg-white p-6 rounded-lg shadow-md flex-row items-center justify-between space-x-4">
        {/* Price Section */}
        <View className="flex-1">
          {/* Original Price */}
          <Text className="text-gray-500 line-through text-md">
            ${cartData.totalOriginalPrice}
          </Text>
          {/* Total Amount */}
          <Text className="text-black font-bold text-xl ">
            ${cartData.totalAmount}
          </Text>
        </View>

        {/* Checkout Button */}
        {cartData?.items?.length > 0 && (
          <TouchableOpacity
            className="flex-1 bg-indigo-600 py-4 rounded-sm shadow hover:bg-indigo-700 active:bg-indigo-800 "
            onPress={() => {
              // Handle checkout action
            }}>
            <Text className="text-center text-white text-lg md:text-lg font-bold">
              Checkout
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartScreen;
