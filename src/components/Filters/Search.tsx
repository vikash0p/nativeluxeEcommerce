import {View,  TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';

const Search = () => {

  return (
    <View className="flex-row items-center flex-1 bg-gray-300 rounded-full px-3">
      <Icon name="search-outline" size={20} color="black" />
      <TextInput
        className="flex-1 ml-2 text-gray-700"
        placeholder="Search"
        placeholderTextColor="black"
      />
    </View>
  );
};

export default Search;
