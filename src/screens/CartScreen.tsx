import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import  Feather from 'react-native-vector-icons/Feather';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const cartData: CartItem[] = [
  {
    id: '1',
    title: 'Modern Chair',
    price: 1200,
    image: 'https://placehold.co/100x100.png',
    quantity: 1,
  },
  {
    id: '2',
    title: 'Wooden Table',
    price: 5000,
    image: 'https://placehold.co/100x100.png',
    quantity: 1,
  },
  {
    id: '3',
    title: 'Elegant Lamp',
    price: 1500,
    image: 'https://placehold.co/100x100.png',
    quantity: 1,
  },
];

const CartScreen = () => {
  const [cart, setCart] = useState<CartItem[]>(cartData);

  const handleIncrement = (id: string) => {
    setCart(
      cart.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderCartItem = ({item}: {item: CartItem}) => (
    <View className="flex-row justify-between items-center bg-white rounded-lg p-3 mb-3 shadow-md border">
      {/* Image Column */}
      <Image source={{uri: item.image}} className="w-20 h-20 rounded-lg" />

      {/* Title & Price Column */}
      <View className="flex-1 flex-col ml-3">
        <Text className="text-lg font-semibold text-gray-800">
          {item.title}
        </Text>
        <Text className="text-base text-gray-500">₹{item.price}</Text>
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            className="bg-gray-200 px-3 py-1 rounded-full"
            onPress={() => handleDecrement(item.id)}>
            <Feather name="minus" size={20} color="black" />
          </TouchableOpacity>
          <Text className="mx-3 text-lg">{item.quantity}</Text>
          <TouchableOpacity
            className="bg-gray-200 px-3 py-1 rounded-full"
            onPress={() => handleIncrement(item.id)}>
            <Feather name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Column */}
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={{paddingBottom: 100}}
      />

      {/* Promo Code and Checkout Section */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg ">
        <View className="flex-row items-center border ps-3 rounded-lg mb-3">
          <TextInput
            placeholder="Enter promo code"
            className="flex-1 text-base text-gray-700"
            placeholderTextColor="gray"
          />
          <TouchableOpacity className="ml-3 bg-indigo-600 px-4 py-3 rounded-lg">
            <Text className="text-white text-base font-semibold">Apply</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-indigo-600 py-4 rounded-lg">
          <Text className="text-center text-white text-lg font-semibold">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
