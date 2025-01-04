import {View} from 'react-native';
import React from 'react';
import Wishlist from './Wishlist';
import Cart from './Cart';

const AddToCart = ({productId}:{productId: string}) => {
  return (
    <View className="flex-row justify-between gap-5 bg-white">
      <Wishlist productId={productId} />
      <Cart productId={productId} />
    </View>
  );
};

export default AddToCart;
