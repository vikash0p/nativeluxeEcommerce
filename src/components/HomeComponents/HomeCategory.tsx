/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ionicons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Material Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Material Community Icons

// Define the type for category items
interface Category {
  id: string;
  name: string;
  icon: string;
  iconSet: string;
}

// Categories data
const categories: Category[] = [
  {id: '1', name: 'Dressing', iconSet: 'Ionicons', icon: 'shirt-outline'},
  {id: '2', name: 'Dining', iconSet: 'Ionicons', icon: 'restaurant-outline'},
  {
    id: '4',
    name: 'Sofa',
    iconSet: 'MaterialCommunityIcons',
    icon: 'sofa-outline',
  },
  {id: '5', name: 'Bed', iconSet: 'Ionicons', icon: 'bed-outline'},
  {id: '6', name: 'Wardrobe', iconSet: 'Ionicons', icon: 'briefcase-outline'},
  {id: '3', name: 'Chair', iconSet: 'MaterialIcons', icon: 'chair'},
];

const HomeCategory = () => {
  const renderItem = ({item}: {item: Category}) => {
    // Declare IconComponent and set it conditionally
    let IconComponent: React.ComponentType<any> = Ionicons; // Default to Ionicons
    if (item.iconSet === 'Ionicons') {
      IconComponent = Ionicons;
    } else if (item.iconSet === 'MaterialIcons') {
      IconComponent = MaterialIcons;
    } else if (item.iconSet === 'MaterialCommunityIcons') {
      IconComponent = MaterialCommunityIcons;
    }

    return (
      <View className="items-center">
        <TouchableOpacity className="items-center justify-center px-3 py-2 m-2 bg-gray-200 rounded-lg shadow-sm ">
          {/* Category Icon */}
          <IconComponent
            name={item.icon}
            size={28}
            color="#232323"
            style={{marginBottom: 8}}
          />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#232323]">
          {item.name}
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
