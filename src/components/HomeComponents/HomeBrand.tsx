import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {brands} from '../../utils/data/ProductFilterData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {setFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import {useAppDispatch} from '../../redux-toolkit/hooks';
const HomeBrand = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const handlePress = (brand: string) => {
    dispatch(setFilter({filterType: 'brand', filterValue: brand}));
    navigation.navigate('ViewMore');
  };

  return (
    <View className="flex-1 bg-white p-2">
      <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Popular Brands
      </Text>
      <View className="flex-row flex-wrap gap-1 justify-between">
        {brands.map((brand, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(brand)}
            className="w-[48%] bg-gray-100 p-4 rounded-lg shadow mb-4 active:bg-gray-200 overflow-hidden">
            <View className="flex-col items-center">
              <MaterialIcons
                name="storefront"
                size={24}
                color="#4B5563"
                className=""
              />
              <Text className="text-md font-semibold text-gray-800">
                {brand}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeBrand;
