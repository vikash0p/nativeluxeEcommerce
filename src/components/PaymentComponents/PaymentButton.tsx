import React from 'react';
import {TouchableHighlight, Alert, Text} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {CartData} from '../../utils/types/cartType';

const PaymentButton: React.FC<{cartData: CartData}> = ({cartData}) => {
  const {addresses} = useAppSelector((state: RootState) => state.address);
  console.log('🚀 ~ file: PaymentButton.tsx:9 ~ addresses:', addresses);

  const handlePayment = () => {
    const options = {
      description: 'Credits towards consultation',
      image:
        'https://res.cloudinary.com/dhttnehwp/image/upload/v1736423331/houseProduct/mobile/baxdf8mjjy8kfikcgtug.png',
      currency: 'INR',
      key: 'rzp_test_QvvAPcdrhb0xaR',
      amount: cartData.totalAmount * 100, // Amount in smallest currency unit (e.g., paise for INR)
      name: 'Luxe',
      order_id: '', // Replace this with an order_id created using the Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: addresses?.mobile.toString(),
        name: addresses?.name,
      },
      theme: {color: '#4f46e5'},
    };

    RazorpayCheckout.open(options)
      .then((data: {razorpay_payment_id: string}) => {
        // Handle success
        Alert.alert(
          'Payment Success',
          `Payment ID: ${data.razorpay_payment_id}`,
        );
      })
      .catch((error: {code: number; description: string}) => {
        // Handle failure
        Alert.alert(
          'Payment Error',
          `Code: ${error.code} | Description: ${error.description}`,
        );
      });
  };

  return (
    <TouchableHighlight
      onPress={handlePayment}
      className="w-full p-5  bg-[#4f46e5] ">
      <Text className="text-xl font-bold text-center text-white">
        Make Payment
      </Text>
    </TouchableHighlight>
  );
};

export default PaymentButton;
