import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {
  useAddItemToCartMutation,
  useGetCartQuery,
} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';
import {resetCartQuantity} from '../../redux-toolkit/features/cart/cartSlice';
import {useIncrementProductSalesMutation} from '../../redux-toolkit/features/products/productApi';

const Cart = ({productId}: {productId: string}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {colors, quantity} = useAppSelector((state: RootState) => state.cart);
  const [addItemToCart, {isLoading}] = useAddItemToCartMutation();
  const dispatch = useAppDispatch();

  const {data} = useGetCartQuery(user?._id ?? '');
  // console.log('🚀 ~ file: Cart.tsx:19 ~ data:', data?.totalQuantity);
  const cartItem = data?.items?.find(item => item.productId === productId);
  const cartQuantity = cartItem?.quantity || 0;

  // console.log('🚀 ~ file: Cart.tsx:17 ~ cartQuantity:', cartQuantity);

  const [incrementProductSales] = useIncrementProductSalesMutation();

  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        userId: user?._id ?? '',
        productId,
        quantity,
        color: colors,
      }).unwrap();

      // console.log('Item added successfully:', response);
      dispatch(resetCartQuantity());

      await incrementProductSales(productId).unwrap();
      Toast.success('Item added to cart successfully.');
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      Toast.error(
        (error as {data?: {message?: string}})?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <TouchableOpacity
      className={`bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${
        isLoading ? 'opacity-50' : ''
      }`}
      accessible
      accessibilityLabel="Add to Cart"
      disabled={
        isLoading ||
        cartQuantity >= 5 ||
        quantity <= 0 ||
        !colors ||
        !user ||
        (data?.totalQuantity ?? 0) >= 10
      }
      onPress={handleAddToCart}>
      <Text className="text-white text-xl font-semibold">
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Text>
    </TouchableOpacity>
  );
};

export default Cart;
