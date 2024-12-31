import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {setFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import {useAppDispatch} from '../../redux-toolkit/hooks';

export const materials = ['Wood', 'Fabric', 'Metal', 'Plastic'];

const getIconName = (material: string) => {
  switch (material) {
    case 'Wood':
      return 'nature';
    case 'Fabric':
      return 'local-laundry-service';
    case 'Metal':
      return 'hardware';
    case 'Plastic':
      return 'recycling';
    default:
      return 'layers';
  }
};

const HomeMaterial = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handlePress = (material: string) => {
    dispatch(setFilter({filterType: 'material', filterValue: material}));
    navigation.navigate('ViewMore');
  };

  return (
    <View className="flex-1 bg-white p-2">
      <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
        Choose Materials
      </Text>
      <View className="flex-row flex-wrap gap-1 justify-between">
        {materials.map((material, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(material)}
            className="w-[48%] bg-gray-100 p-4 rounded-lg shadow mb-4 active:bg-gray-200 overflow-hidden">
            <View className="flex-col items-center">
              <MaterialIcons
                name={getIconName(material)}
                size={24}
                color="#4f46e5"
              />
              <Text className="text-md font-semibold text-gray-800">
                {material}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeMaterial;
