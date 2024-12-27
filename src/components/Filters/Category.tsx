import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {categories} from '../../utils/data/ProductFilterData';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {useDispatch} from 'react-redux';
import {toggleFilter} from '../../redux-toolkit/features/products/productQuerySlice';

const Category = () => {
  const dispatch = useDispatch();
  const {params} = useAppSelector(state => state.productQuery);

  const toggleCheckbox = (item: string) => {
    dispatch(toggleFilter({filterType: 'category', value: item}));
  };

  return (
    <View className="border p-4 rounded-md">
      <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>
      {categories.map(item => (
        <View
          key={item}
          className="flex-row items-center bg-white mb-4   rounded-lg shadow-sm">
          <Checkbox
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={params.category?.includes(item) ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox(item)}
          />
          <Text className="ml-3 text-lg text-gray-800">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Category;
