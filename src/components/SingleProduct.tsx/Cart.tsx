import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useAddItemToCartMutation} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';

const Cart = ({productId}: {productId: string}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {colors, quantity} = useAppSelector((state: RootState) => state.cart);

  const [addItemToCart, {isLoading}] = useAddItemToCartMutation();

  const handleAddToCart = async () => {
    try {
      const response = await addItemToCart({
        userId: user?._id ?? '',
        productId,
        quantity,
        color: colors,
      }).unwrap();

      console.log('Item added successfully:', response);

      Toast.success('Item added to cart successfully.');
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      Toast.error((error as { data?: { message?: string } })?.data?.message || 'Something went wrong. Please try again.', );
    }
  };

  return (
    <TouchableOpacity
      className={`bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg ${
        isLoading ? 'opacity-50' : ''
      }`}
      accessible
      accessibilityLabel="Add to Cart"
      disabled={isLoading}
      onPress={handleAddToCart}>
      <Text className="text-white text-xl font-semibold">
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Text>
    </TouchableOpacity>
  );
};

export default Cart;
