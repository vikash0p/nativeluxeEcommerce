import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { useGetTrendingProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {Product} from '../../redux-toolkit/types';
import HomeProductCard from './HomeProductCard';

const TrendingProduct = () => {
  const {data, isLoading} = useGetTrendingProductsQuery({});

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
        Trending Products
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        className="flex flex-row">
        {data.products.map((product: Product) => (
          <HomeProductCard product={product} key={product._id} title={product.views} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingProduct;
