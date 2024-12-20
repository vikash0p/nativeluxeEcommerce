import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure react-native-vector-icons is installed

const HomeTopBar = () => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
      {/* Search Bar with Icon */}
      <View className="">
        <TouchableOpacity>
        <Icon name="search-outline" size={24} color="#232323" />
        </TouchableOpacity>
      </View>

      {/* Centered Text */}
      <View className="items-center flex-2">
        <Text className="text-lg font-normal text-[#909090] font-Gelasio leading-6">
          Make home
        </Text>
        <Text className="text-lg font-bold text-[#232323] font-Gelasio leading-6">
          BEAUTIFUL
        </Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity className="p-2 ml-2">
        <Icon name="cart-outline" size={24} color="#232323" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeTopBar;
