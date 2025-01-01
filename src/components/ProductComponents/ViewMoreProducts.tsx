import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, ActivityIndicator} from 'react-native';
import {useGetProductsByFilterQuery} from '../../redux-toolkit/features/products/productApi';
import {Product} from '../../utils/types/productTypes';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import ProductCard from './ProductCard'; // Import the ProductCard component
import {setPage} from '../../redux-toolkit/features/products/productQuerySlice';

const ViewMoreProducts = () => {
  const {filterType, filterValue, page} = useAppSelector(
    (state: RootState) => state.productQuery,
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {data, error, isLoading, isFetching, isError} =
    useGetProductsByFilterQuery(
      {
        filterType: filterType ?? '',
        filterValue: filterValue ?? '',
        page,
        limit: 12,
      },
      {skip: !filterType},
    );

  const totalProducts = data?.totalProducts;

  // Update products and pagination state when data changes
  useEffect(() => {
    if (data && totalProducts !== undefined) {
      if (data.products && data.products.length > 0) {
        setProducts(prev => [...prev, ...data.products]); // Append new products
        setHasMore(data.products.length < totalProducts); // Check if more products exist
      } else {
        setHasMore(false); // If no products, stop pagination
      }
    }
  }, [data, totalProducts]);

  // Load more products when the user scrolls to the bottom
  const loadMoreProducts = () => {
    if (!isFetching && hasMore) {
      // setPage(prev => prev + 1);
      setPage(page + 1);
    }
  };

  // Handle loading state
  if (isLoading && page === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-4 text-gray-500">Loading...</Text>
      </View>
    );
  }

  // Handle error state
  const errorMessage =
    isError &&
    'data' in error &&
    (error as {data: {message: string}}).data.message;

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          Error: {errorMessage || 'Something went wrong'}
        </Text>
      </View>
    );
  }

  // Handle no products found
  if (products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">
          No products found in the selected category.
        </Text>
      </View>
    );
  }

  // Render ProductCard component for each item
  const renderItem = ({item}: {item: Product}) => (
    <ProductCard item={item} style="h-80" />
  );

  return (
    <FlatList
      data={products}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching ? (
          <View className="mt-4">
            <ActivityIndicator size="small" color="#000" />
            <Text className="mt-2 text-gray-500">Loading more products...</Text>
          </View>
        ) : !hasMore ? (
          <Text className="mt-4 text-center text-gray-500 py-2">
            No more products to load.
          </Text>
        ) : null
      }
    />
  );
};

export default ViewMoreProducts;
