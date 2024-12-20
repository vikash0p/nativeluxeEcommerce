import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/ReusableComponents/LogoutButton';
import {useGetUserDetailsQuery} from '../redux-toolkit/api/authApi';

const UserScreen = () => {


  const {data} = useGetUserDetailsQuery('Auth');
  console.log('🚀 ~ file: UserScreen.tsx:14 ~ data:', data);

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-gray-100">
      {/* Profile Header */}
      <View className="items-center p-6 mb-4 bg-white shadow-md rounded-2xl">
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
          className="mb-4 rounded-full w-28 h-28"
        />
        <Text className="text-2xl font-bold text-gray-800">
          {data?.result?.name || 'Guest User'}
        </Text>
        <Text className="text-sm text-gray-600">{data?.result?.email}</Text>
        {data?.result?.phone && (
          <View className="flex-row items-center mt-2">
            <Icon name="call" size={16} color="#4f46e5" />
            <Text className="ml-2 text-sm text-gray-600">{data?.result.phone}</Text>
          </View>
        )}
      </View>

      {/* User Details */}
      <View className="p-4 mb-6 bg-white shadow-md rounded-2xl">
        <Text className="mb-4 text-lg font-bold text-gray-800">
          User Information
        </Text>
        <View className="pb-2 mb-2 border-b border-gray-200">
          <Text className="text-gray-600">ID:</Text>
          <Text className="font-medium text-gray-800">{data?.result?._id || '-'}</Text>
        </View>
        <View className="pb-2 mb-2 border-b border-gray-200">
          <Text className="text-gray-600">Name:</Text>
          <Text className="font-medium text-gray-800">
            {data?.result?.name || 'N/A'}
          </Text>
        </View>
        <View className="pb-2 mb-2 border-b border-gray-200">
          <Text className="text-gray-600">Email:</Text>
          <Text className="font-medium text-gray-800">
            {data?.result?.email || 'N/A'}
          </Text>
        </View>
        {data?.result?.phone && (
          <View>
            <Text className="text-gray-600">Phone:</Text>
            <Text className="font-medium text-gray-800">{data?.result.phone}</Text>
          </View>
        )}
      </View>

      {/* Logout Button */}
      <View className="items-center mt-4">
        <LogoutButton />
      </View>
    </ScrollView>
  );
};

export default UserScreen;
