// EmptyCart.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const EmptyCart = () => {
    return (
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
    );
};

export default EmptyCart;
