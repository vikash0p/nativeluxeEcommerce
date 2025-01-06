import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import HomeProductCard from './HomeProductCard';
import {useGetTotalProductsBySalesQuery} from '../../redux-toolkit/features/sales/salesApi';
import {ProductSales} from '../../utils/types/salesTypes';

const BestSellerProduct = () => {
  const {data, isLoading} = useGetTotalProductsBySalesQuery();

  if ((!data || !data.productsBySales) && (!data || isLoading)) {
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
        {data.productsBySales?.map((product: ProductSales) => (
          <HomeProductCard
            product={product}
            key={product._id}
            title={product.totalSales}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BestSellerProduct;
