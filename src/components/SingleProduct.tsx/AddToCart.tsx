import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';

const AddToCart = () => {
  return (

     <View className="flex-row justify-between gap-5">
        <TouchableOpacity
          className="bg-black py-4 rounded-lg items-center shadow-lg w-24  "
          accessible
          accessibilityLabel="Add to Cart"
          onPress={() => {}}>
          <MaterialIcons name="favorite" size={28} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-indigo-600 flex-1 py-4 rounded-lg items-center shadow-lg"
          accessible
          accessibilityLabel="Add to Cart"
          onPress={() => {}}>
          <Text className="text-white text-xl font-semibold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
  );
};

export default AddToCart;
