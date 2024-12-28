import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useGetProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {resetParams} from '../../redux-toolkit/features/products/productQuerySlice';
import ProductCard from '../ProductComponents/ProductCard';
import Pagination from '../Filters/Pagination';

const SearchProduct = () => {
  const dispatch = useAppDispatch();
  const {params,searchValue} = useAppSelector((state: RootState) => state.productQuery);
  const {data, isLoading, isError, error, refetch} =
    useGetProductsQuery(params);

  const products = data?.products || [];

  // Extracting error message for better readability
  const errorMessage =
    isError &&
    'data' in error &&
    (error as {data: {message: string}}).data.message;

  // Loading State

  if (searchValue.trim() !== '' && isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg font-medium text-gray-500 mt-4">
          Loading products...
        </Text>
      </View>
    );
  }

  // Error or No Data State
  if (isError || !data || products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-2xl font-medium text-red-500">
          {errorMessage || 'No products found. Please try again.'}
        </Text>
        {/* Retry Button */}
        <TouchableOpacity
          onPress={() => {
            refetch();
            dispatch(resetParams());
          }}>
          <Text className="text-lg font-medium text-white bg-[#4f46e5] mt-4 px-5 py-2 rounded-sm">
            Retry
          </Text>
        </TouchableOpacity>

        {/* Filter Modal */}
      </View>
    );
  }
  return (
    <View>
      {searchValue !== '' && (
        <Text className="px-2 py-4">
          search result :{' '}
          <Text className="text-[#4f46e5] font-semibold font ">
            {searchValue}
          </Text>{' '}
        </Text>
      )}

      {/* Product List */}
      <ScrollView className="px-2  ">
        <View className="flex flex-wrap flex-row justify-between  pt-2 pb-24 ">
          {products.map(item => (
            <View key={item._id} className="w-[48%] mb-4">
              <ProductCard item={item} />
            </View>
          ))}
        </View>
        {/* Pagination */}
        {data.totalProducts >= 12 ? <Pagination /> : null}
      </ScrollView>
    </View>
  );
};

export default SearchProduct;
