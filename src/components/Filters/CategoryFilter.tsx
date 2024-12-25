import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {categories} from '../../utils/data/ProductFilterData';

const CategoryFilter: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleCheckbox = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({item}: {item: string}) => {
    const isChecked = selectedItems.includes(item);

    return (
      <TouchableOpacity
        className="flex-row items-center   bg-white rounded-lg shadow-md "
        onPress={() => toggleCheckbox(item)}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckbox(item)}
        />
        <Text className="ml-1 text-lg text-gray-800">{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={categories}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
});

export default CategoryFilter;
