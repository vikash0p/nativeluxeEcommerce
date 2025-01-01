import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useGetNewArrivalProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {Product} from '../../redux-toolkit/types';

const NewArrivalProducts = () => {
  const {data,isLoading} = useGetNewArrivalProductsQuery({});

  if ((!data || !data.products.length) && (!data || isLoading)) {
    return (
      <View className="flex-1 items-center justify-center bg-white py-5">
        <Text className="text-lg text-gray-500">No products found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-2">
      <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
        New Arrival Products
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        className="flex flex-row">
        {data.products.map((product: Product) => (
          <View key={product.id} className="w-52 mr-4">
            <View className="bg-gray-100 rounded-lg relative">
              {/* New Product Badge */}
              <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full z-10">
                <Text className="text-xs font-bold text-white">NEW</Text>
              </View>

              <Image
                source={{uri: product.image}}
                className="h-40 w-full rounded-lg mb-4"
                resizeMode="stretch"
              />
              <View className="px-4 pb-8 h-40">
                <Text className="text-md font-semibold text-gray-800 mb-1">
                  {product.title}
                </Text>
                <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
                  {product.description}
                </Text>
                <Text className="text-base text-gray-800 font-bold mb-1">
                  ${product.finalPrice.toFixed(2)}
                </Text>
                {product.discount > 0 && (
                  <Text className="text-sm text-red-500">
                    Save {product.discount}%
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewArrivalProducts;
