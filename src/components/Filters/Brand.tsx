import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {brands} from '../../utils/data/ProductFilterData';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {toggleFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import {useDispatch} from 'react-redux';

const Brand: React.FC = () => {
  const dispatch = useDispatch();
  const {params} = useAppSelector((state: RootState) => state.productQuery);

  const toggleCheckbox = (item: string) => {
    dispatch(toggleFilter({filterType: 'brand', value: item}));
  };

  return (
    <View className="pb-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">Brands</Text>
      {brands.map(item => (
        <View
          key={item}
          className="flex-row items-center bg-white mb-4 rounded-lg shadow-sm">
          <Checkbox
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={params.brand?.includes(item) ? 'checked' : 'unchecked'}
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

export default Brand;
