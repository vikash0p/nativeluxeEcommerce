import React, {useState} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {Toast} from 'toastify-react-native';
import {resetCartQuantity} from '../../redux-toolkit/features/cart/cartSlice';
import {
  useAddItemToCartMutation,
} from '../../redux-toolkit/features/cart/cartApi';
import {useRemoveItemFromWishlistMutation} from '../../redux-toolkit/features/wishlist/wishlistApi';
import {WishlistItem} from '../../utils/types/wishlistType';

const Cart = ({item}: {item: WishlistItem}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {quantity} = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const [addItemToCart] = useAddItemToCartMutation();
  const [removeItemFromWishlist] = useRemoveItemFromWishlistMutation();

  const [isLoading, setIsLoading] = useState(false); // Loading state



  const handleAddToCart = async () => {
    if (!user?._id) {
      Toast.error('You must be logged in to add items to the cart.');
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      // Add item to cart
      const response = await addItemToCart({
        userId: user._id,
        productId: item.productId,
        quantity,
        color: item.color,
      }).unwrap();

      // Remove item from wishlist
      await removeItemFromWishlist({wishlistItemId: item.id}).unwrap();

      console.log('Item added successfully:', response);
      dispatch(resetCartQuantity());
      Toast.success('Item added to cart successfully.');
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      Toast.error(
        error?.data?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Add to Cart"
      onPress={handleAddToCart}
      disabled={isLoading} // Disable button while loading
      className={`${
        isLoading ? 'bg-gray-400' : 'bg-indigo-600'
      } p-3 rounded-full shadow-sm`}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Ionicons name="cart-sharp" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default Cart;
