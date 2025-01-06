import React, {useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoutButton from '../components/ReusableComponents/LogoutButton';
import {useAppSelector} from '../redux-toolkit/hooks';
import {RootState} from '../redux-toolkit/store';
import {RootStackParamList} from '../navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const UserScreen = () => {
  const {user, isAuthenticated, loading} = useAppSelector((state: RootState) => state.auth);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigation.replace('Login'); // Redirect to Login screen
    }
  }, [isAuthenticated, loading, navigation]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-lg text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-gray-100 space-y-2">
      {/* Profile Header */}
      <View className="items-center p-6 mb-4 bg-white shadow-md rounded-2xl">
        <View className="w-24 h-24 bg-[#4f46e5] rounded-full flex items-center justify-center">
          <Icon name="person" size={32} color="white" />
        </View>

        <Text className="text-2xl font-bold text-gray-800  ">
          {user?.name || 'Guest User'}
        </Text>
        <Text className="text-sm text-gray-600">{user?.email}</Text>
        <View className="flex-row items-center ">
          <Icon name="call" size={12} color="#4f46e5" />
          <Text className=" text-sm text-gray-600">{user?.phone}</Text>
        </View>
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
