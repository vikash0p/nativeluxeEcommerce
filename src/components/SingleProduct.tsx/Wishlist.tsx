import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Wishlist = () => {
  return (
        <TouchableOpacity
          className="bg-black py-4 rounded-lg items-center shadow-lg w-24  "
          accessible
          accessibilityLabel="Add to Cart"
          onPress={() => {}}>
          <MaterialIcons name="favorite" size={28} color="red" />
        </TouchableOpacity>
  );
};

export default Wishlist;
