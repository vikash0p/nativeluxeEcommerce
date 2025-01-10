import React from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {usePlaceOrderMutation} from '../../redux-toolkit/features/order/orderApi';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navigationTypes';
import { Toast } from "toastify-react-native";
const CashOnDelivery: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {addresses} = useAppSelector((state: RootState) => state.address);

  const [placeOrder, {isLoading}] = usePlaceOrderMutation();

  const handleCashOnDelivery = async () => {
    try {
      const data = {
        userId: user?._id ?? '',
        shippingAddressId: addresses?._id ?? '',
        paymentMethod: 'COD', // Explicitly set to 'COD' for consistency
      };

      if (!data.userId || !data.shippingAddressId) {
        Alert.alert('Error', 'User or address information is missing.');
        return;
      }

      await placeOrder(data).unwrap();
      Toast.success('Order placed successfully!');
      navigation.navigate('Success');
    } catch (error) {
      Toast.error('Failed to place the order. Please try again.');
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 bg-white rounded-lg shadow mb-2"
      onPress={handleCashOnDelivery}
      disabled={isLoading} // Disable button while loading
    >
      <FontAwesome name="money" size={24} color="#4f46e5" />
      <Text className="text-lg font-semibold text-gray-700 ml-3">
        Cash on Delivery
      </Text>
    </TouchableOpacity>
  );
};

export default CashOnDelivery;
