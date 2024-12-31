import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Define the type for the feature
interface Feature {
  id: string;
  name: string;
  icon: string;
}

// Features data
const features: Feature[] = [
  {id: '1', name: 'Free', icon: 'monetization-on'},
  {id: '2', name: 'Assembly', icon: 'build'},
  {id: '3', name: 'Fast delivery', icon: 'local-shipping'},
  {id: '4', name: 'Factory', icon: 'factory'},
  {id: '5', name: 'Outlet', icon: 'store'},
  {id: '6', name: 'Custom made', icon: 'handyman'},
];

const FeaturesList: React.FC = () => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-lg">
      <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
        Product Features
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {features.map(feature => (
          <View
            key={feature.id}
            className="flex-col w-[48%] items-center justify-start p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 ">
            <MaterialIcons name={feature.icon} size={30} color="#4f46e5" />
            <Text className=" text-lg text-gray-700">{feature.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FeaturesList;
