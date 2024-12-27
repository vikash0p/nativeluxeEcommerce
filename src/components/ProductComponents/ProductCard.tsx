import React from 'react';
import {View, Text, Image} from 'react-native';
import {Product} from '../../utils/types/productTypes';

const ProductCard: React.FC<{item: Product}> = ({item}) => {
  return (
    <View className="bg-gray-100 h-80 rounded-lg p-4">
      <Image
        source={{uri: item.image}}
        className="h-40 w-full rounded-md"
        resizeMode="cover"
      />
      <Text className="text-sm font-bold mt-2 text-gray-800">{item.title}</Text>
      <Text className="text-xs text-gray-500 mt-1">{item.category}</Text>
      <Text className="text-sm font-semibold text-[#4f46e5] mt-1">
        ${item.finalPrice.toFixed(2)}
      </Text>
      {item.discount > 0 && (
        <Text className="text-xs text-red-500 line-through">
          ${item.originalPrice.toFixed(2)}
        </Text>
      )}
      <Text className="text-xs text-gray-500 mt-1">In stock: {item.stock}</Text>
    </View>
  );
};

export default ProductCard;
