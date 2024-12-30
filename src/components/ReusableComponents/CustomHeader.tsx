import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
  data: {
    title: string |null ;
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
        <Text className="text-white font-bold text-lg">
          {(data?.title as string)?.charAt(0).toUpperCase() +
            (data?.title as string)?.slice(1)}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
