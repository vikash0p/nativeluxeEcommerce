import React from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/ReusableComponents/LogoutButton';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';

const UserScreen = () => {
  const {user, isAuthenticated, loading} = useAppSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-lg text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg font-bold text-gray-800">
          Please log in to view your profile.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-gray-100">
      {/* Profile Header */}
      <View className="items-center p-6 mb-4 bg-white shadow-md rounded-2xl">
        <Image
          accessibilityLabel="User profile picture"
          source={{
            uri:  'https://via.placeholder.com/150',
          }}
          className="mb-4 rounded-full w-28 h-28"
        />
        <Text className="text-2xl font-bold text-gray-800">
          {user?.name || 'Guest User'}
        </Text>
        <Text className="text-sm text-gray-600">{user?.email}</Text>
        {user?.phone && (
          <View className="flex-row items-center mt-2">
            <Icon name="call" size={16} color="#4f46e5" />
            <Text className="ml-2 text-sm text-gray-600">{user.phone}</Text>
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
          <Text className="font-medium text-gray-800">{user?._id || '-'}</Text>
        </View>
        <View className="pb-2 mb-2 border-b border-gray-200">
          <Text className="text-gray-600">Name:</Text>
          <Text className="font-medium text-gray-800">
            {user?.name || 'N/A'}
          </Text>
        </View>
        <View className="pb-2 mb-2 border-b border-gray-200">
          <Text className="text-gray-600">Email:</Text>
          <Text className="font-medium text-gray-800">
            {user?.email || 'N/A'}
          </Text>
        </View>
        {user?.phone && (
          <View>
            <Text className="text-gray-600">Phone:</Text>
            <Text className="font-medium text-gray-800">{user.phone}</Text>
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
