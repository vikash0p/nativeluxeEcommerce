/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useLoginUserMutation} from '../redux-toolkit/features/auth/authApi';
import {LoginScreenNavigationProp} from '../utils/types/navigationTypes';
import {Toast} from 'toastify-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableButton from '../components/ReusableComponents/ReusableButton';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the eye icon

const LoginScreen = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [loginUser, {isLoading}] = useLoginUserMutation();

  const handleLogin = async () => {
    const {email, password} = credentials;

    if (!email || !password) {
      Toast.error('Please fill out all fields');
      return;
    }
    try {
      const response = await loginUser(credentials).unwrap();
      console.log('🚀 ~ file: LoginScreen.tsx:12 ~ response:', response);
      Toast.success('Login successful');
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    } catch (error) {
      Toast.error('Wrong credentials');
    }
  };

  return (
    <SafeAreaView className="flex-1 p-8 bg-gray-100">

      {/* Header with Logo and Title */}
      <View className="flex-row items-center justify-center gap-5 mt-12">
        <View className="w-[105px] h-px bg-[#bdbdbd] rounded-sm" />
        <Image
          source={require('../asset/images/Group.png')}
          className="object-cover w-20 h-20 mb-4 rounded-full"
        />
        <View className="w-[105px] h-px bg-[#bdbdbd] rounded-sm" />
      </View>
      <View className="mt-6">
        <Text className="text-[#909090] text-4xl font-normal font-serif leading-[45px]">
          Hello!
        </Text>
        <Text className="text-[#303030] text-3xl font-bold font-serif leading-[45px] tracking-wide">
          WELCOME BACK
        </Text>
      </View>

      {/* Email Field */}
      <View className="mt-6">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Email <Text className="text-2xl text-red-500">*</Text>{' '}
        </Text>
        <TextInput
          className="mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your email"
          value={credentials.email}
          onChangeText={text => setCredentials({...credentials, email: text})}
        />
      </View>

      {/* Password Field */}
      <View className="relative mt-6">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Password <Text className="text-2xl text-red-500">*</Text>
        </Text>
        <TextInput
          className="pr-10 mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible} // Toggle visibility
          value={credentials.password}
          onChangeText={text =>
            setCredentials({...credentials, password: text})
          }
        />
        {/* Eye Icon */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 12,
            padding: 10,
          }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'} // Toggle between "eye-off" and "eye"
            size={24}
            color="#909090"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Navigation */}
      <View className="flex-row items-center justify-center mt-6">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-xl font-bold">Forgot Password</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <View className="items-center mt-16">
        <ReusableButton
          text={isLoading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          style="w-60"
          textStyle="text-xl"
        />
      </View>

      {/* Register Navigation */}
      <View className="flex-row items-center justify-center mt-6">
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-xl font-semibold uppercase">Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
