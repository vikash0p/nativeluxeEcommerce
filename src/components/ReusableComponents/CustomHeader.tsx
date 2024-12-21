import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
  data: {
    icons: string;
    title: string;
  };
}

const CustomHeader: React.FC<CustomHeaderProps> = ({data}) => {
  const navigation = useNavigation();

  return (
    <View className="bg-indigo-600 px-5 py-4 flex-row items-center justify-between relative">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Center Icon and Title */}
      <View className="flex-row items-center">
        <Ionicons name={data.icons} size={24} color="#fff" className="mr-2" />
        <Text className="text-white font-bold text-lg">{data.title}</Text>
      </View>
    </View>
  );
};

export default CustomHeader;
