import React from 'react';
import {TouchableOpacity, ActivityIndicator, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {
  useAddItemToWishlistMutation,
  useGetWishlistQuery,
} from '../../redux-toolkit/features/wishlist/wishlistApi';
import {Toast} from 'toastify-react-native';

interface WishlistProps {
  productId: string;
}

const Wishlist: React.FC<WishlistProps> = ({productId}) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {colors} = useAppSelector((state: RootState) => state.cart);

  const [addItemToWishlist, {isLoading}] = useAddItemToWishlistMutation();

  const {data} = useGetWishlistQuery(user?._id ?? '');
  // console.log('🚀 ~ file: Wishlist.tsx:23 ~ data:', data);

  const isDuplicate = data?.items?.find(
    item => item.productId === productId && item.color === colors,
  );
  // console.log('🚀 ~ file: Wishlist.tsx:26 ~ isDuplicate:', isDuplicate);

  const addItemToWishlistHandler = async () => {
    try {
      await addItemToWishlist({
        userId: user?._id ?? '',
        productId,
        color: colors,
      }).unwrap();
      Toast.success('Item added to wishlist successfully.');
      // console.log('Added to wishlist:', response);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      Toast.error(
        (error as {data?: {message?: string}})?.data?.message ||
          'Failed to add to wishlist',
      );
    }
  };

  return (
    <TouchableOpacity
      className={` py-4 rounded-lg items-center shadow-lg w-24 ${
        isLoading && 'opacity-50'
      } ${isDuplicate ? 'bg-gray-300' : 'bg-black'}`} // Make the button inactive
      accessible
      accessibilityLabel="Add to Wishlist"
      accessibilityHint="Adds the product to your wishlist"
      onPress={addItemToWishlistHandler}
      disabled={isLoading || Boolean(isDuplicate)} // Disable the button while loading
    >
      {isLoading ? (
        <View className="flex items-center justify-center">
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <MaterialIcons name="favorite" size={28} color="red" />
      )}
    </TouchableOpacity>
  );
};

export default Wishlist;
