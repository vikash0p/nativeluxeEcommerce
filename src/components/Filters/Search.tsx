import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {
  searchQuery,
  setParams,
} from '../../redux-toolkit/features/products/productQuerySlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabsParamsList} from '../../utils/types/navigationTypes';
import {RootState} from '../../redux-toolkit/store';

const Search = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamsList>>();
  const {searchValue} = useAppSelector(
    (state: RootState) => state.productQuery,
  );
  const dispatch = useAppDispatch();

  // Debounced search handler
  const handleSearch = debounce((text: string) => {
    dispatch(setParams({search: text}));
  }, 500);

  // Input change handler
  const handleChange = (text: string) => {
    dispatch(searchQuery(text));
    handleSearch(text);
  };

  // Submit search handler
  const handleSubmit = () => {
    if (searchValue.trim()) {
      dispatch(setParams({search: searchValue.trim()}));
      navigation.navigate('Product');
    }
  };

  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1 shadow-sm w-[88%] ">
      <TextInput
        className="flex-1 text-gray-700 text-base"
        placeholder="Search for products..."
        placeholderTextColor="#6B7280"
        value={searchValue}
        onChangeText={handleChange}
        clearButtonMode="while-editing"
        accessibilityLabel="Search input"
        accessibilityHint="Type to search for products"
      />
      <TouchableOpacity
        className="ml-2 bg-[#4f46e5] rounded-full p-2"
        onPress={handleSubmit}
        accessibilityLabel="Search button"
        accessibilityHint="Searches for the entered text">
        <Icon name="search-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
