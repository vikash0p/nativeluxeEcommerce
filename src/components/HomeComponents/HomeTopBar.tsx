import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList}from '../../utils/types/navigationTypes';
const HomeTopBar: React.FC<{ navigation: NavigationProp<RootStackParamList>}> = ({navigation}) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
      {/* Search Bar with Icon */}
      <View className="flex-row items-center flex-1 bg-gray-300 rounded-full px-3">
        <Icon name="search-outline" size={20} color="black" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Search"
          placeholderTextColor="black"
        />
      </View>

      {/* Cart Icon with Red Badge */}
      <View className="relative p-2 ml-4">
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={24} color="#232323" />
        </TouchableOpacity  >
        <View className="absolute -top-1 -right-2 bg-[#4f46e5] rounded-full w-5 h-5 flex items-center justify-center">
          <Text className="text-white text-xs">3</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeTopBar;
