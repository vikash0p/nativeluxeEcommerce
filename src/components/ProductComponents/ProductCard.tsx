import {View, Text, Image} from 'react-native';
import React from 'react';
import {Product} from '../../utils/types/productTypes';
const ProductCard = ({product}:{product:Product}) => {
  return (
    <View className="flex-1 p-1  ">
      <View className="p-2 bg-white rounded-lg shadow h-56   border border-black">
        <Image
          source={{uri: product.image}}
          className="w-full h-32 rounded-md"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-gray-800 mt-2">
          {product.title}
        </Text>

        <Text className="text-sm text-gray-700 mt-2">
          ${product.finalPrice.toFixed(2)}
        </Text>

      </View>
    </View>
  );
};

export default ProductCard;