import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {CartItem} from '../../utils/types/cartType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useUpdateCartItemMutation} from '../../redux-toolkit/features/cart/cartApi';
import {Toast} from 'toastify-react-native';
import {
  useDecrementSalesMutation,
  useIncrementSalesMutation,
} from '../../redux-toolkit/features/sales/salesApi';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';

interface CartUpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: CartItem;
}

const CartUpdateModal: React.FC<CartUpdateModalProps> = ({
  isVisible,
  onClose,
  item,
}) => {
  // console.log('🚀 ~ file: CartUpdateModal.tsx:15 ~ item:', item.id);
  const [quantity, setQuantity] = useState(item.quantity);
  const [color, setColor] = useState(item.color);

  const {user} = useAppSelector((state: RootState) => state.auth);

  const [updateCartItem, {isLoading}] = useUpdateCartItemMutation();

  const [incrementSales] = useIncrementSalesMutation();
  const [decrementSales] = useDecrementSalesMutation();

  const handleSave = async () => {
    const updatedItem = {quantity, color};
    try {
      await updateCartItem({cartItemId: item.id, ...updatedItem}).unwrap();
      Toast.success('Item updated successfully');
    } catch (error) {
      Toast.error('Failed to update item');
    }
    onClose();
  };

  const IncrementQuantity = async () => {
    setQuantity(quantity + 1);
    await incrementSales({productId: item.productId, userId: user?._id ?? ''});
  };

  const DecrementQuantity = async () => {
    setQuantity(quantity - 1);
    await decrementSales({productId: item.productId, userId: user?._id ?? ''});
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-end items-center bg-gray-100/65">
        <View className="bg-white w-full p-6 h-96 rounded-lg">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Update Cart Item
          </Text>

          {/* Quantity Input */}
          <View className="">
            <Text className="text-lg mb-2">Update Quantity</Text>
            <View className="flex-row items-center gap-3 mb-6">
              <TouchableOpacity
                onPress={DecrementQuantity}
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
                onPress={IncrementQuantity}
                disabled={quantity >= 5}>
                <AntDesign
                  name="plussquare"
                  size={40}
                  color={quantity < 5 ? '#4f46e5' : 'gray'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Color Input */}
          <View className="mb-10">
            <Text className="text-lg mb-2">Choose Color</Text>
            <View className="flex-row justify-between items-center px-5">
              <View className="">
                <View className="flex-row items-center gap-4">
                  {item?.availableColors.map((c, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setColor(c)}
                      className={`pt-1 rounded-md ${
                        color === c ? 'text-white' : ''
                      }`}>
                      <Text
                        className="text-sm w-12 h-12 rounded-full border"
                        style={{backgroundColor: c}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View
                className="w-12 h-12 rounded-full border-2"
                style={{backgroundColor: color}}
              />
            </View>
          </View>

          {/* Actions */}
          <View className="flex-row justify-end gap-8">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 rounded-sm bg-red-500">
              <Text className="text-md text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="px-4 py-2 rounded-sm bg-[#4f46e5]">
              <Text className="text-md text-white">
                {isLoading ? 'Updating...' : 'Update'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CartUpdateModal;
