import React from 'react';
import {View, Text, Image} from 'react-native';
import {WishlistItem} from '../../utils/types/wishlistType';
import WishlistMoveToCart from './WishlistMoveToCart';
const WishlistCard = ({item}: {item: WishlistItem}) => {
  // console.log('🚀 ~ file: WishlistCard.tsx:9 ~ item:', item.color);

  return (
    <View className="flex-row items-center bg-white rounded-xl shadow-md p-4 mb-4">
      {/* Product Image */}
      <Image
        source={{uri: item.image}}
        className="w-24 h-24 rounded-lg border"
        resizeMode="cover"
      />

      {/* Product Details */}
      <View className="flex-1 ml-4">
        <Text
          className="text-lg font-semibold text-gray-800 mb-1"
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-base font-medium text-indigo-600 mb-2">
          Price: ${item.price}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-600 mr-2">Color:</Text>
          <View
            className="w-6 h-6 rounded-full border"
            style={{backgroundColor: item.color}}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-col gap-3">
        <WishlistMoveToCart item={item} />
      </View>
    </View>
  );
};

export default WishlistCard;
