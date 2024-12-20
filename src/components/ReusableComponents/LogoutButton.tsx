import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useLogoutUserMutation} from '../../redux-toolkit/api/authApi';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {logout as logoutAction} from '../../redux-toolkit/features/auth/authSlice';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenNavigationProp} from '../../utils/types/navigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Toast} from 'toastify-react-native';
const LogoutButton = () => {
  const [logout, {isLoading}] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await logout({}).unwrap();
      // Clear Redux state
      dispatch(logoutAction());
      // Navigate to Login screen
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      Toast.success('Logout successful');
    } catch (error) {
      Toast.error('Logout failed');
    }
  };

  return (
    <View className="w-44">
      <TouchableOpacity
        className={`flex-row items-center justify-center px-6 py-3 rounded-sm ${
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
    </View>
  );
};

export default LogoutButton;
