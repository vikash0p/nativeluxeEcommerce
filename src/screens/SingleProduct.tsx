import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {useGetSingleProductQuery} from '../redux-toolkit/features/products/productApi';
import ProductDetails from '../components/ProductComponents/ProductDetails';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './../navigation/navigationTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type SingleProductProps = NativeStackScreenProps<
  RootStackParamList,
  'SingleProduct'
>;

const SingleProduct: React.FC<SingleProductProps> = ({route}) => {
  const {itemId} = route.params;
  const {data, isLoading, isError} = useGetSingleProductQuery(itemId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }

  if (isError || !data?.product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500">Error loading product data</Text>
      </View>
    );
  }

  const product = data.product;

  return (
    <>
      <ScrollView className=" ">
        <ProductDetails product={product} />
      </ScrollView>
      <View className="absolute bottom-4 left-4 right-4   py-2 ">
        <View className="flex-row justify-between gap-5">
          <TouchableOpacity
            className="bg-black py-4 rounded-lg items-center shadow-lg w-24  "
            accessible
            accessibilityLabel="Add to Cart"
            onPress={() =>
              product.stock > 0
                ? Alert.alert('Cart', 'Product added to cart!')
                : Alert.alert(
                    'Out of Stock',
                    'This product is currently unavailable.',
                  )
            }>
            <MaterialIcons name="favorite" size={28} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg"
            accessible
            accessibilityLabel="Add to Cart"
            onPress={() =>
              product.stock > 0
                ? Alert.alert('Cart', 'Product added to cart!')
                : Alert.alert(
                    'Out of Stock',
                    'This product is currently unavailable.',
                  )
            }>
            <Text className="text-white text-xl font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SingleProduct;
