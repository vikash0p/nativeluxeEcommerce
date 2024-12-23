/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import {useGetProductsQuery} from '../redux-toolkit/api/productApi';
import ProductCard from '../components/ProductComponents/ProductCard';
import Feather from 'react-native-vector-icons/Feather';
import ProductFilterModel from '../components/ProductComponents/ProductFilterModel';
import {Product} from '../utils/types/productTypes';

const ProductScreen: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);

  const {data, isLoading, isError} = useGetProductsQuery({
    page,
    limit: 12,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts(prevProducts => {
        const newProducts = data?.products?.filter(
          product => !prevProducts.some(p => p._id === product._id),
        );
        return [...prevProducts, ...(newProducts || [])];
      });
      setIsFetchingMore(false);
    }
  }, [data]);

  const fetchMoreProducts = () => {
    if (!isFetchingMore && (data?.products?.length ?? 0) > 0) {
      setIsFetchingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00f" />
        <Text className="text-lg font-bold text-blue-500 mt-4">Loading...</Text>
      </View>
    );
  }

  if (isError && page === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-red-500">
          Failed to fetch products. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-2">
      <View className="flex-row justify-between items-center p-4 bg-white">
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsFilterModalVisible(true)}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">
          {products.length} Products
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={ProductCard as ListRenderItem<Product>}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 20, paddingTop: 10}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#00f" />
            </View>
          ) : data?.products?.length === 0 || products.length % 12 !== 0 ? (
            <View className="py-4 items-center">
              <Text className="text-sm text-gray-500">
                No more products to display.
              </Text>
            </View>
          ) : null
        }
      />

      <ProductFilterModel
        setIsFilterModalVisible={setIsFilterModalVisible}
        isFilterModalVisible={isFilterModalVisible}
      />
    </View>
  );
};

export default ProductScreen;
