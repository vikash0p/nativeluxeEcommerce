import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Features = () => {
  const featureData = [
    {
      title: 'Top Notch Policies',
      value: '',
      icon: 'check-circle',
      color: '#4caf50', // Green
    },
    {
      title: 'Happy Customers',
      value: '3.2 Million',
      icon: 'smile-o',
      color: '#fbc02d', // Yellow
    },
    {
      title: 'Experience',
      value: '4 Decades',
      icon: 'history',
      color: '#0288d1', // Blue
    },
    {
      title: '5 Years Warranty',
      value: 'Unmatched',
      icon: 'shield',
      color: '#ff5722', // Orange
    },
    {
      title: 'Pan India Presence',
      value: '',
      icon: 'map-marker',
      color: '#9c27b0', // Purple
    },
    {
      title: 'Free Installation',
      value: '',
      icon: 'wrench',
      color: '#ff9800', // Amber
    },
    {
      title: 'EMIs On Furniture',
      value: '',
      icon: 'credit-card',
      color: '#795548', // Brown
    },
  ];

  return (
    <View className="bg-white p-4">
      <Text className="text-3xl text-center font-bold text-gray-800 mb-4">
        Why Choose Us?
      </Text>
      <View className="flex-wrap flex-row justify-between">
        {featureData.map((feature, index) => (
          <View
            key={index}
            className="w-[48%] bg-gray-100 rounded-md p-4 mb-4 flex-row items-center">
            <FontAwesome
              name={feature.icon}
              size={28}
              color={feature.color}
              className="mr-4"
            />
            <View>
              {feature.value ? (
                <Text className="text-lg font-bold text-gray-700">
                  {feature.value}
                </Text>
              ) : null}
              <Text className="text-sm text-gray-600">{feature.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Features;
