import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useLogoutUserMutation} from '../../redux-toolkit/features/auth/authApi';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {logout as logoutAction} from '../../redux-toolkit/features/auth/authSlice';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Toast} from 'toastify-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const LogoutButton = () => {
  const [logout, {isLoading}] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap(); // Call the logout API
      dispatch(logoutAction()); // Clear Redux state
      navigation.replace('Login');
      Toast.success('Logout successful'); // Show success toast
    } catch (error) {
      Toast.error('Logout failed'); // Show error toast
    }
  };

  return (
    <TouchableOpacity
      className={`flex flex-row items-center justify-center px-6 py-3 rounded-md ${
        isLoading ? 'bg-gray-400' : 'bg-red-500'
      }`}
      onPress={handleLogout}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          <Icon
            name="log-out-outline"
            size={20}
            color="#ffffff"
            className="mr-2"
          />
          <Text className="text-lg font-semibold text-white">Logout</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default LogoutButton;
