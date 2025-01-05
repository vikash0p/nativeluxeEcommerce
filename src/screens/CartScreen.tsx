import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import CartCard from '../components/cartComponents/CartCard';
import {useGetCartQuery} from '../redux-toolkit/features/cart/cartApi';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {CartData} from '../utils/types/cartType';


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
          <View className="flex-1 justify-center items-center gap-4">
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/little-girl-pushing-shopping-cart_1308-33336.jpg?t=st=1735883951~exp=1735887551~hmac=fbcde1d735fd866faeb78469bf92991134857f441da468a2e73791f4b48243bf&w=360',
              }}
              className="w-full h-96 object-contain"
              resizeMode="contain"
            />
            <Text className="text-center text-lg text-black font-semibold">
              Your cart is empty. Start shopping now!
            </Text>
          </View>
        )}
      </View>

      {cartData?.items?.length && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg ">
          <TouchableOpacity className="bg-indigo-600 py-4 rounded-lg">
            <Text className="text-center text-white text-lg font-semibold">
              Proceed to Buy ({cartData?.items?.length} items)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
