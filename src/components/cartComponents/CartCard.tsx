import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CartItem} from '../../utils/types/cartType';
import {useDeleteCartItemMutation} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';
import CartUpdateModal from './CartUpdateModal';
import {useResetSalesMutation} from '../../redux-toolkit/features/sales/salesApi';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';

interface CartCardProps {
  item: CartItem;
}

const CartCard: React.FC<CartCardProps> = ({item}) => {
  const [deleteCartItem, {isLoading}] = useDeleteCartItemMutation();
  const [isModalVisible, setModalVisible] = useState(false);

  const {user} = useAppSelector((state: RootState) => state.auth);
  const [resetSales] = useResetSalesMutation();

  const deleteCartHandler = async () => {
    try {
      await deleteCartItem(item.id).unwrap();
      await resetSales({productId: item.productId, userId: user?._id ?? ''});
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
    <View className="bg-white px-4 py-4 mb-4 rounded-xl shadow-md flex-row items-start space-x-4">
      {/* Product Image */}
      <Image
        source={{uri: item.image}}
        className="rounded-lg w-20 h-20"
        resizeMode="cover"
      />

      {/* Product Info */}
      <View className="flex-1 gap-1 ml-3">
        {/* Product Title */}
        <Text className="text-lg font-bold text-gray-800">{item.title}</Text>

        {/* Quantity and Color */}
        <View className="flex-row gap-3 items-center">
          {/* Quantity */}
          <Text className="text-md font-semibold text-black">
            Quantity: <Text className="text-gray-800">{item.quantity}</Text>
          </Text>

          {/* Color */}
          <View className="flex-row items-center space-x-2">
            <Text className="text-md font-semibold text-black"> Color : </Text>
            <View
              className="w-5 h-5 rounded-full border border-black"
              style={{backgroundColor: item.color}}
            />
          </View>
        </View>

        {/* Price and Discount */}
        <View className="flex-row items-center gap-3">
          <Text className="text-md text-green-500 font-medium">
            <AntDesign name="arrowdown" size={15} color="#22c55e" />
            {item.discount}%
          </Text>
          <Text className="text-md text-red-500 line-through font-semibold">
            ${item.originalPrice}
          </Text>
          <Text className="text-lg font-semibold text-black">
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-col gap-3">
        {/* Update Button */}
        <TouchableOpacity
          className="p-2 rounded-full bg-blue-100 shadow-sm"
          onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={20} color="#4f46e5" />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          className="p-2 rounded-full bg-red-100 shadow-sm"
          onPress={deleteCartHandler}>
          <AntDesign
            name="delete"
            size={20}
            color={isLoading ? 'gray' : '#e11d48'}
          />
        </TouchableOpacity>
      </View>

      {/* Update Modal */}
      <CartUpdateModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        item={item}
      />
    </View>
  );
};

export default CartCard;
