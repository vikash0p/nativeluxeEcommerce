import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';

interface reusableFiltersProps {
  query: string[];
  toggleCheckbox: (query: string) => void;
  data: string[] | undefined;
  title:string;
}

const ReusableFilters: React.FC<reusableFiltersProps> = ({data, query, toggleCheckbox,title}) => {


  return (
    <View className="border p-4 rounded-md">
      <Text className="text-xl font-bold text-gray-800 mb-4">{title}</Text>
      {data?.map(item => (
        <View
          key={item}
          className="flex-row items-center bg-white mb-4   rounded-lg shadow-sm">
          <Checkbox
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={query.includes(item) ? 'checked' : 'unchecked'}
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

export default ReusableFilters;
