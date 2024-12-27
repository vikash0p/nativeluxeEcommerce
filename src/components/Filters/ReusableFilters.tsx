import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';

interface ReusableFiltersProps {
  query: string[];
  toggleCheckbox: (query: string) => void;
  data: string[] | undefined;
  title: string;
}

// Mapping hex codes to color names
const colorNames: Record<string, string> = {
  '#808080': 'Gray',
  '#FFFFFF': 'White',
  '#000000': 'Black',
  '#F5F5DC': 'Beige',
  '#DEB887': 'Burlywood',
  '#654321': 'Dark Brown',
  '#000080': 'Navy',
  '#50C878': 'Emerald',
};

const getColorName = (color: string) => colorNames[color] || color;

const ReusableFilters: React.FC<ReusableFiltersProps> = ({
  data,
  query,
  toggleCheckbox,
  title,
}) => {
  return (
    <View className="border p-4 rounded-md">
      <Text className="text-xl font-bold text-gray-800 mb-4">{title}</Text>
      {data?.map(item => (
        <View
          key={item}
          className="flex-row items-center bg-white mb-4 rounded-lg shadow-sm">
          <Checkbox
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={query.includes(item) ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox(item)}
          />
          {title === 'Colors' && (
            <View
              className="w-6 h-6 rounded-full ml-3 border"
              style={{backgroundColor: item}}
            />
          )}
          <Text className="ml-3 text-lg text-gray-800">
            {title === 'Colors'
              ? getColorName(item)
              : item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ReusableFilters;
