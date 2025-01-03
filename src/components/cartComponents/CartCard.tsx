import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartItem} from '../../utils/types/cartType';
import {useDeleteCartItemMutation} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';
import CartUpdateModal from './CartUpdateModal';

interface CartCardProps {
  item: CartItem;
}

const CartCard: React.FC<CartCardProps> = ({item}) => {
  const [deleteCartItem, {isLoading}] = useDeleteCartItemMutation();
  const [isModalVisible, setModalVisible] = useState(false);

  const deleteCartHandler = async (id: string) => {
    try {
      await deleteCartItem(id).unwrap();
      Toast.success('Item removed from cart successfully.');
    } catch (error: any) {
      console.error('Error deleting item from cart:', error);
      Toast.error(
        (error as {data?: {message?: string}})?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <View className="bg-white px-4 py-4 mb-4 rounded-lg shadow-md flex-row items-center">
      {/* Product Image */}
      <Image
        source={{uri: item.image}}
        className="rounded-lg w-20 h-20"
        style={styles.image}
      />

      {/* Product Info */}
      <View className="flex-1 ml-4">
        <View className="flex-row items-center mb-2">
          <Text
            className="w-5 h-5 rounded-full border border-gray-300"
            style={{backgroundColor: item.color}}
          />
          <Text className="ml-3 text-md font-semibold text-gray-800">
            {item.title}
          </Text>
        </View>

        {/* Quantity and Total */}
        <Text className="text-sm text-gray-700 mb-1 font-semibold ">
          Quantity: {item.quantity}
        </Text>
        <Text className="text-sm text-gray-700 font-semibold">
          Price: ${item.price} | Total: ${item.total}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-col justify-between items-center gap-y-3">
        {/* Update Button */}
        <TouchableOpacity
          className="p-2 rounded-full bg-blue-100"
          onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={20} color="blue" />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          className="p-2 rounded-full bg-red-100"
          onPress={() => deleteCartHandler(item.id)}>
          <AntDesign
            name="delete"
            size={20}
            color={isLoading ? 'gray' : 'red'}
          />
        </TouchableOpacity>
      </View>

      <CartUpdateModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        item={item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});

export default CartCard;
