import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

const FavoriteScreen = () => {
const favoriteData: FavoriteItem[] = [
  {
    id: '1',
    title: 'Modern Chair',
    price: 1200,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '2',
    title: 'Wooden Table',
    price: 5000,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '3',
    title: 'Elegant Lamp',
    price: 1500,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '4',
    title: 'Comfort Sofa',
    price: 7200,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '5',
    title: 'Classic Bookshelf',
    price: 2500,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '6',
    title: 'Stylish Desk',
    price: 3500,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '7',
    title: 'Wall Clock',
    price: 800,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '8',
    title: 'Dining Set',
    price: 15000,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '9',
    title: 'Office Chair',
    price: 3200,
    image: 'https://placehold.co/100x100.png',
  },
  {
    id: '10',
    title: 'Cozy Bed',
    price: 20000,
    image: 'https://placehold.co/100x100.png',
  },
];


  const handleRemove = (id: string) => {
    console.log('🚀 ~ file: FavoriteScreen.tsx:41 ~ id:', id);
    Alert.alert('Remove', 'Item has been removed from favorites.');
    // Implement remove logic here
  };

  const handleAddToCart = (id: string) => {
    console.log('🚀 ~ file: FavoriteScreen.tsx:47 ~ id:', id);
    Alert.alert('Cart', 'Item has been added to your cart.');
    // Implement add-to-cart logic here
  };

  const renderFavoriteItem = ({item}: {item: FavoriteItem}) => (
    <View className="flex-row items-center bg-white rounded-lg shadow p-4 mb-4">
      {/* Product Image */}
      <Image
        source={{uri: item.image}}
        className="w-20 h-20 rounded-lg mr-4 border"
        resizeMode="cover"
      />

      {/* Product Details */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">
          {item.title}
        </Text>
        <Text className="text-base font-medium text-indigo-600">
          ₹{item.price}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-col gap-2">
        <TouchableOpacity
          className="bg-gray-200 p-2 rounded-full"
          onPress={() => handleRemove(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-indigo-600 p-2 rounded-full"
          onPress={() => handleAddToCart(item.id)}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 ">
      {/* Header */}
      {/* <Text className="text-2xl font-bold text-gray-800 mb-4 bg-[#4f46e5] ">
        Your Favorites
      </Text> */}

      {/* Favorites List */}
      <FlatList
        data={favoriteData}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Button */}
      <TouchableOpacity
        className="absolute bottom-4 left-4 right-4 bg-indigo-600 py-4 rounded-lg items-center shadow-lg"
        onPress={() => Alert.alert('Checkout', 'Proceeding to checkout...')}>
        <Text className="text-white text-xl font-semibold">Add all to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteScreen;
