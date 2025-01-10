import React from 'react';
import {View, Text, Image} from 'react-native';
import {OrderDetails} from '../../utils/types/orderTypes';


interface OrderCardProps {
  order: OrderDetails;
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
  return (
    <View className="mb-6 p-1 bg-white rounded-lg shadow-md border">
      {/* Order Details */}
      <View className="mb-4 w-full p-4 bg-white rounded-lg shadow-md">
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Order ID: {order._id}
        </Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-sm font-medium text-gray-700 mr-2">
            Status:
          </Text>
          <Text
            className={`text-sm px-2 py-1 rounded-md ${
              order.status === 'Pending'
                ? 'bg-yellow-400 text-black'
                : order.status === 'Confirmed'
                ? 'bg-blue-400 text-white'
                : order.status === 'Shipped'
                ? 'bg-purple-400 text-white'
                : order.status === 'Delivered'
                ? 'bg-green-400 text-white'
                : order.status === 'Cancelled'
                ? 'bg-red-400 text-white'
                : 'bg-gray-300 text-black' // Default fallback
            }`}>
            {order.status}
          </Text>
        </View>
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Total:{' '}
          <Text className="font-semibold text-gray-900">
            ${order.totalAmount}
          </Text>
        </Text>
        <Text className="text-sm font-medium text-gray-700">
          Payment:{' '}
          <Text className="font-semibold text-gray-900">
            {order.paymentMethod}
          </Text>
        </Text>
      </View>

      {/* Shipping Address */}
      <View className="mt-4">
        <Text className="text-md font-bold text-gray-700 mb-2">
          Shipping Address:
        </Text>
        <Text className="text-sm ">
          {order.shippingAddress.name}, {order.shippingAddress.street},{' '}
          {order.shippingAddress.city}, {order.shippingAddress.state},{' '}
          {order.shippingAddress.country} - {order.shippingAddress.postalCode}
        </Text>
      </View>

      {/* Order Items */}
      <View className="mt-4">
        <Text className="text-md font-bold text-gray-700 mb-2">Items:</Text>
        {order.items.map(item => (
          <View
            key={item._id}
            className="flex-row items-center mb-4 p-2 bg-gray-100 rounded-lg">
            <Image
              source={{uri: item.productId.image}}
              className="w-16 h-16 rounded-md mr-4"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">
                {item.productId.title}
              </Text>
              <Text className="text-sm ">
                Color:{' '}
                <View
                  className="w-4 h-4 rounded-full border"
                  style={{backgroundColor: item.color}}
                />{' '}
              </Text>
              <Text className="text-sm ">Quantity: {item.quantity}</Text>
              <Text className="text-sm ">Price: ${item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderCard;
