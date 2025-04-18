import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {
  addColor,
  addToCart,
  removeFromCart,
} from '../../redux-toolkit/features/cart/cartSlice';
import {useGetReviewsByProductIdQuery} from '../../redux-toolkit/features/reviews/reviewApi';
import ProductRating from './ProductRating';
import AdditionalInformation from './AdditionalInformation';
import {Product} from '../../redux-toolkit/types';
import {RootState} from '../../redux-toolkit/store';
import {useGetCartQuery} from '../../redux-toolkit/features/cart/cartApi';
import {useIncrementSalesMutation} from '../../redux-toolkit/features/sales/salesApi';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
  
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {colors, quantity} = useAppSelector((state: RootState) => state.cart);
  const {data} = useGetReviewsByProductIdQuery(product?._id);
  const {data: cart} = useGetCartQuery(user?._id ?? '');
  // console.log('🚀 ~ file: ProductDetails.tsx:27 ~ cart:', cart);

  const cartItem = cart?.items?.find(item => item.productId === product._id);
  const cartQuantity = cartItem?.quantity || 0;

  const [incrementSales] = useIncrementSalesMutation();
  // Automatically set the first color
  useEffect(() => {
    if (product.color && product.color.length > 0) {
      dispatch(addColor(product.color[0]));
    }
  }, [product.color, dispatch]);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(1));
  };

  const addFromCartHandler = async () => {
    dispatch(addToCart(1));

    await incrementSales({
      productId: product._id,
      userId: user?._id ?? '',
    });
  };

  return (
    <View className="flex-1 bg-white">
      <View>
        {/* Product Image */}
        <View className="ps-20">
          <Image
            source={{uri: product.image}}
            className="w-full h-[450px] rounded-bl-3xl mb-4"
            resizeMode="cover"
          />
          <View className="flex-col gap-6 bg-gray-300 rounded-full py-16 items-center w-20 absolute top-20 left-10">
            {product.color.map((color, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center mb-2"
                onPress={() => dispatch(addColor(color))}>
                <Text
                  className={`text-lg font-semibold text-gray-800 ml-2 rounded-full w-12 h-12 border ${
                    colors === color ? 'border-2 border-[#4f46e5]' : ''
                  }`}
                  style={{backgroundColor: color}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rest of the component */}
        <View className="p-4">
          {/* Product Title & Brand */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              {product.title}
            </Text>
            <Text className="text-base text-gray-500">by {product.brand}</Text>
          </View>

          {/* Price Section */}
          <View>
            <View className="mb-4 flex-row items-center justify-between px-2">
              <View>
                <Text className="text-2xl font-bold text-indigo-600">
                  ₹{product.finalPrice * 90}{' '}
                  <Text className="text-sm line-through text-red-500">
                    ₹{product.originalPrice * 90}
                  </Text>
                </Text>
                <Text className="text-md text-green-500 font-semibold pb-3">
                  {product.discount}% OFF
                </Text>
              </View>

              {/* Quantity */}
              <View
                className={`flex-row items-center gap-3 ${
                  cartQuantity >= 5 ? 'hidden' : ''
                }`}>
                <TouchableOpacity
                  onPress={removeFromCartHandler}
                  disabled={quantity <= 1}>
                  <AntDesign
                    name="minussquare"
                    size={40}
                    color={quantity > 1 ? '#4f46e5' : 'gray'}
                  />
                </TouchableOpacity>
                <Text className="text-4xl font-semibold text-gray-700">
                  {quantity}
                </Text>
                <TouchableOpacity
                  disabled={quantity >= 5}
                  onPress={addFromCartHandler}>
                  <AntDesign
                    name="plussquare"
                    size={40}
                    color={quantity < 5 ? '#4f46e5' : 'gray'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Product Rating */}
            <View>
              {data?.averageRating && data.averageRating !== '0' && (
                <ProductRating rating={Number(data?.averageRating)} />
              )}
            </View>

            {/* Selected Color */}
            <View className="flex-row items-center py-3 bg-white">
              <Text className="text-xl font-semibold text-gray-700">
                Choose color:
              </Text>
              <View
                className="ml-4 w-8 h-8 rounded-full border border-gray-400"
                style={{backgroundColor: colors}}
              />
            </View>
          </View>

          {/* Description */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Feather name="info" size={20} color="#4f46e5" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Description
              </Text>
            </View>
            <Text className="text-base text-gray-700">
              {product.description}
            </Text>
            <Text className="text-base text-gray-700">{product.about}</Text>
          </View>

          {/* Additional Details */}
          <View className="space-y-2 mb-4">
            <AdditionalInformation product={product} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
