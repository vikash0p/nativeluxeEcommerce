import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRemoveItemFromWishlistMutation} from '../../redux-toolkit/features/wishlist/wishlistApi';
import {Toast} from 'toastify-react-native';

const RemoveWishlist = ({wishlistId}: {wishlistId: string}) => {
  // console.log('🚀 ~ file: RemoveWishlist.tsx:8 ~ wishlistId:', wishlistId);
  
  const [removeItemFromWishlist, {isLoading}] = useRemoveItemFromWishlistMutation();
  const RemoveWishlistHandler = async () => {
    try {
      await removeItemFromWishlist({wishlistItemId: wishlistId}).unwrap();

      Toast.success('Item removed from wishlist successfully.');
    } catch (error) {
      // console.log('🚀 ~ file: RemoveWishlist.tsx:16 ~ error:', error);
      Toast.error('Failed to remove item from wishlist');
    }
  };
  return (
    <TouchableOpacity
      className="bg-gray-200 p-3 rounded-full shadow-sm dis"
      onPress={RemoveWishlistHandler}
      disabled={isLoading}
      accessibilityLabel="Delete Item"
      accessibilityHint="Remove this item from your wishlist">
      <MaterialIcons
        name="delete"
        size={24}
        color="red"
        className="disabled:text-gray-300"
      />
    </TouchableOpacity>
  );
};

export default RemoveWishlist;
