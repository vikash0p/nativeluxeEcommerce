import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useGetProductsQuery} from '../../redux-toolkit/features/products/productApi';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import ProductCard from './ProductCard';
import Pagination from '../Filters/Pagination';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProductFilterModel from './ProductFilterModel';
import {useDispatch} from 'react-redux';
import {resetParams} from '../../redux-toolkit/features/products/productQuerySlice';

const ProductContainer: React.FC = () => {
  const dispatch = useDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);
  const {data, isError, isFetching, error, refetch} =
    useGetProductsQuery(params);

  const [isOpen, setIsOpen] = useState(false);
  const products = data?.products || [];

  // Extracting error message for better readability
  const errorMessage =
    isError &&
    'data' in error &&
    (error as {data: {message: string}}).data.message;

  // Loading State

  if (isOpen === true ? null : isFetching) {
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
            setIsOpen(false);
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
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-[#4f46e5] py-4 px-6 flex-row items-center justify-between shadow-md rounded-b-3xl">
        <Text className="text-xl font-semibold text-white">
          {products.length} of {data?.totalProducts} Products
        </Text>
        <TouchableOpacity
          className="p-2 bg-white rounded-full shadow-md"
          onPress={() => setIsOpen(!isOpen)}>
          <FontAwesome5 name="filter" size={20} color="#4f46e5" solid />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView className="px-2">
        <View className="flex flex-wrap flex-row justify-between  pt-3">
          {products.map(item => (
            <View key={item._id} className="w-[48%] mb-4">
              <ProductCard item={item} style="h-40" />
            </View>
          ))}
        </View>
        {/* Pagination */}
        {data.totalProducts >= 12 ? (
          <Pagination  />
        ) : null}
      </ScrollView>

      {/* Filter Modal */}
      <ProductFilterModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};

export default ProductContainer;
