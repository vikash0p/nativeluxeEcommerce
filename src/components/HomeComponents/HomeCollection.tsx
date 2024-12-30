import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {useAppDispatch} from '../../redux-toolkit/hooks';
import {toggleFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootTabsParamsList} from '../../navigation/navigationTypes';
import {collections} from '../../utils/data/HomeData';
const HomeCollection = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabsParamsList>>();
  const filterCategoryFunction = (cat: string) => {
    dispatch(
      toggleFilter({filterType: 'category', value: cat, isSingleValue: true}),
    );
    navigation.navigate('Product');
  };

  return (
    <View className="bg-white p-4">
    <Text className="text-3xl font-bold text-center mb-6">
        Collection Starts @
      </Text>
      <View className="flex-wrap flex-row justify-between">
        {collections.map((item, index) => (
          <TouchableOpacity
            onPress={() => filterCategoryFunction(item.params)}
            key={index}
            className="w-[48%] bg-gray-100 p-4 rounded-md shadow-sm mb-4">
            <Image
              source={{uri: item.image}}
              className="w-full h-32 rounded-md mb-3"
              resizeMode="cover"
            />
            <Text className="text-lg font-bold text-gray-800 mb-2 text-center">
              {item.name}
            </Text>
            <Text className="text-xl text-indigo-600 font-semibold text-center">
              {item.price}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeCollection;
