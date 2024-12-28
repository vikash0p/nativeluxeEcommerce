import {View} from 'react-native';
import React from 'react';
import Search from '../components/Filters/Search';
import SearchProduct from '../components/searchComponent/SearchProduct';

const SearchScreen = () => {
  return (
    <View className=" flex-1">
      <View className="  items-center bg-[#4f46e5] py-4   h-24 rounded-b-3xl">
        <Search style="w-[95%]" />
      </View>
      <SearchProduct />
    </View>
  );
};

export default SearchScreen;
