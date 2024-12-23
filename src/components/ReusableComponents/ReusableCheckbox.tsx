import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity,StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

type Item = {
  id: string;
  label: string;
};

const ReusableCheckbox: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items: Item[] = [
    {id: '1', label: 'Option 1'},
    {id: '2', label: 'Option 2'},
    {id: '3', label: 'Option 3'},
  ];

  const toggleCheckbox = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({item}: {item: Item}) => {
    const isChecked = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        className="flex-row items-center   bg-white rounded-lg shadow-md "
        onPress={() => toggleCheckbox(item.id)}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => toggleCheckbox(item.id)}
        />
        <Text className="ml-1 text-lg text-gray-800">{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">

      <FlatList
        data={items}
        keyExtractor={item => item.id}
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

export default ReusableCheckbox;
