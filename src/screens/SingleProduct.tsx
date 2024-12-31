import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Keyboard, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetSingleProductQuery} from '../redux-toolkit/features/products/productApi';
import ProductDetails from '../components/ProductComponents/ProductDetails';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './../navigation/navigationTypes';
import UserReview from '../components/SingleProduct.tsx/UserReview';
import Comments from '../components/SingleProduct.tsx/Comments';

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

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Add keyboard listeners to detect when the keyboard is opened or closed
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
    <View className="flex-1">
      <ScrollView className={isKeyboardVisible ? '' : 'mb-20'}>
        {/* Adds space for the fixed AddToCart */}
        <ProductDetails product={product} />
        <UserReview productId={product._id} />
        <Comments productId={product._id} />
      </ScrollView>
      {/* Fixed AddToCart button at the bottom */}
      {!isKeyboardVisible && (
        <View className="absolute bottom-4 left-4 right-4 ">
          <AddToCart />
        </View>
      )}
    </View>
  );
};

export default SingleProduct;
