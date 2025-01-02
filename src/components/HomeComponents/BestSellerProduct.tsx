import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useGetBestSellerProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {Product} from '../../redux-toolkit/types';
import HomeProductCard from './HomeProductCard';

const BestSellerProduct = () => {
  const {data, isLoading} = useGetBestSellerProductsQuery({});

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
        Best Seller Products
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        className="flex flex-row">
        {data.products.map((product: Product) => (
          <HomeProductCard
            product={product}
            key={product._id}
            title={product.sales}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BestSellerProduct;
