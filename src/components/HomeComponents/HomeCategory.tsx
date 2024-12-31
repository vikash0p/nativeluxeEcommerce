/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ionicons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Material Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Material Community Icons
import {useAppDispatch} from '../../redux-toolkit/hooks';
import { setFilter} from '../../redux-toolkit/features/products/productQuerySlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';

// Define the type for category items
interface Category {
  id: string;
  name: string;
  icon: string;
  iconSet: string;
}

// Categories data
const categories: Category[] = [
  {
    id: '1',
    name: 'dressing',
    iconSet: 'MaterialCommunityIcons',
    icon: 'dresser-outline',
  },
  {id: '2', name: 'dining', iconSet: 'Ionicons', icon: 'restaurant-outline'},
  {
    id: '4',
    name: 'sofa',
    iconSet: 'MaterialCommunityIcons',
    icon: 'sofa-outline',
  },
  {id: '5', name: 'bed', iconSet: 'Ionicons', icon: 'bed-outline'},
  {id: '6', name: 'wardrobe', iconSet: 'Ionicons', icon: 'briefcase-outline'},
  {id: '3', name: 'chair', iconSet: 'MaterialIcons', icon: 'chair'},
];

const HomeCategory = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: Category}) => {
    // Declare IconComponent and set it conditionally
    let IconComponent: React.ComponentType<any> = Ionicons; // Default to Ionicons
    if (item.iconSet === 'MaterialCommunityIcons') {
      IconComponent = MaterialCommunityIcons;
    } else if (item.iconSet === 'MaterialIcons') {
      IconComponent = MaterialIcons;
    } else if (item.iconSet === 'MaterialCommunityIcons') {
      IconComponent = MaterialCommunityIcons;
    }

    const filterCategoryFunction = (cat: string) => {
      console.log('🚀 ~ file: HomeCategory.tsx:60 ~ cat:', cat);
      dispatch(setFilter({filterType: 'category', filterValue: cat}));
      navigation.navigate('ViewMore');
    };

    return (
      <View className="items-center">
        <TouchableOpacity
          onPress={() => filterCategoryFunction(item.name)}
          activeOpacity={0.8}
          className="items-center justify-center px-3 py-2 m-2 bg-[#4f46e5] text- rounded-lg shadow-sm ">
          {/* Category Icon */}
          <IconComponent
            name={item.icon}
            size={28}
            color="#fff"
            style={{marginBottom: 8}}
          />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#4f46e5]">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
      </View>
    );
  };

  return (
    <View className="p-4 bg-white">
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};

export default HomeCategory;
