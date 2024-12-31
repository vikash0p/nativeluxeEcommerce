import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetSingleProductQuery} from '../redux-toolkit/features/products/productApi';
import ProductDetails from '../components/ProductComponents/ProductDetails';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './../navigation/navigationTypes';
import UserReview from '../components/SingleProduct.tsx/UserReview';
import Comments from "../components/SingleProduct.tsx/Comments";

type SingleProductProps = NativeStackScreenProps<
  RootStackParamList,
  'SingleProduct'
>;

const AddToCart: React.FC = () => {
  return (
    <View className="flex-row justify-between gap-5">
      <TouchableOpacity
        className="bg-black py-4 rounded-lg items-center shadow-lg w-24"
        accessible
        accessibilityLabel="Add to Favorites"
        onPress={() => {}}>
        <MaterialIcons name="favorite" size={28} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg"
        accessible
        accessibilityLabel="Add to Cart"
        onPress={() => {}}>
        <Text className="text-white text-xl font-semibold">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  console.log('🚀 ~ file: SingleProduct.tsx:57 ~ product:', product._id);

  return (
    <View className="flex-1">
      <ScrollView className="mb-20">
        {/* Adds space for the fixed AddToCart */}
        <ProductDetails product={product} />
        <UserReview productId={product._id} />
        <Comments />
      </ScrollView>
      {/* Fixed AddToCart button at the bottom */}
      <View className="absolute bottom-4 left-4 right-4">
        <AddToCart />
      </View>
    </View>
  );
};

export default SingleProduct;
