/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigationTypes';
const SuccessScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackToHome = () => {
    navigation.navigate('Tabs');
  };

  const handleTrackOrder = () => {
    navigation.navigate('MyOrder');
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-6">
      {/* Success Message */}
      <Text className=" font-bold text-gray-800 mb-2" style={{fontSize: 45}}>
        SUCCESS!
      </Text>

      {/* Image */}
      <Image
        source={require('../asset/images/Group1.png')}
        className="w-80 h-80 mb-6"
        resizeMode="contain"
      />
      {/* Success Icon */}
      <View className="bg-green-100 rounded-full p-6 mb-6">
        <FontAwesome name="check-circle" size={64} color="#22c55e" />
      </View>

      <Text className="text-center text-xl font-semibold text-gray-600 mb-6">
        Your order will be delivered soon.
        {'\n'}Thank you for choosing our app!
      </Text>
      {/* Buttons */}
      <View className="w-full mt-4">
        <TouchableOpacity
          onPress={handleBackToHome}
          className="bg-[#4f46e5] py-4 rounded-md mb-4 w-full">
          <Text className="text-white text-center text-xl font-semibold">
            Back to Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTrackOrder}
          className="bg-gray-800 py-4 rounded-md w-full">
          <Text className="text-white text-center text-xl font-semibold">
            Track Your Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;
