import {View, Text} from 'react-native';
import React from 'react';
import { Product } from "../../redux-toolkit/types";

const AdditionalInformation = ({product}:{product:Product}) => {
  return (
    <View className="bg-white p-4  space-y-2">
      <Text className="text-lg font-semibold text-gray-800">
        Additional Information      </Text>

      {/* Material */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Material:</Text>
        <Text className="text-gray-600">{product.material}</Text>
      </View>

      {/* Weight */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Weight:</Text>
        <Text className="text-gray-600">{product.weight} kg</Text>
      </View>

      {/* Dimensions */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Dimensions:</Text>
        <Text className="text-gray-600">{product.dimension.height} x {product.dimension.width} x {product.dimension.length}</Text>
      </View>

      {/* Brand */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Brand:</Text>
        <Text className="text-gray-600">{product.brand}</Text>
      </View>

      {/* Category */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Category:</Text>
        <Text className="text-gray-600 capitalize">{product.category}</Text>
      </View>

      {/* Origin */}
      <View className="flex-row items-center">
        <Text className="font-semibold text-gray-700 w-32">Origin:</Text>
        <Text className="text-gray-600">{product.origin}</Text>
      </View>
    </View>
  );
};

export default AdditionalInformation;
