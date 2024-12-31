/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  useColorScheme
} from 'react-native';
import {useRegisterUserMutation} from '../redux-toolkit/features/auth/authApi';
import {RegisterScreenNavigationProp} from '../navigation/navigationTypes';
import {Toast} from 'toastify-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReusableButton from '../components/ReusableComponents/ReusableButton';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the Ionicons

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to control password visibility
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleRegister = async () => {
    // Basic validation
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.phone ||
      !credentials.password
    ) {
      Toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await registerUser(credentials).unwrap();
      console.log('🚀 ~ file: RegisterScreen.tsx:12 ~ response:', response);
      Toast.success('Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      Toast.error('Registration failed');
    }
  };

  return (
    <SafeAreaView className="flex-1 p-8 bg-gray-100">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header with Logo and Title */}
      <View className="flex-row items-center justify-center gap-5 ">
        <View className="w-[105px] h-px bg-[#bdbdbd] rounded-sm" />
        <Image
          source={require('../asset/images/Group.png')}
          className="w-20 h-20 mb-4 rounded-full"
        />
        <View className="w-[105px] h-px bg-[#bdbdbd] rounded-sm" />
      </View>
      <View className="mt-2">
        <Text className="text-[#909090] text-4xl font-normal font-serif leading-[45px]">
          Welcome!
        </Text>
        <Text className="text-[#303030] text-3xl font-bold font-serif leading-[45px] tracking-wide">
          CREATE AN ACCOUNT
        </Text>
      </View>

      {/* Name Field */}
      <View className="mt-2">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Name <Text className="text-2xl text-red-500">*</Text>
        </Text>
        <TextInput
          className="mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your full name"
          value={credentials.name}
          placeholderTextColor={isDarkMode ? '#303030' : '#303030'}
          onChangeText={text => setCredentials({...credentials, name: text})}
        />
      </View>

      {/* Email Field */}
      <View className="mt-2">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Email <Text className="text-2xl text-red-500">*</Text>
        </Text>
        <TextInput
          className="mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your email"
          value={credentials.email}
          placeholderTextColor={isDarkMode ? '#303030' : '#303030'}
          onChangeText={text => setCredentials({...credentials, email: text})}
        />
      </View>

      {/* Phone Field */}
      <View className="mt-2">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Phone <Text className="text-2xl text-red-500">*</Text>
        </Text>
        <TextInput
          className="mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your phone number"
          value={credentials.phone}
          placeholderTextColor={isDarkMode ? '#303030' : '#303030'}
          onChangeText={text => setCredentials({...credentials, phone: text})}
        />
      </View>

      {/* Password Field */}
      <View className="relative mt-2">
        <Text className="text-lg text-[#303030] font-semibold mb-2">
          Password <Text className="text-2xl text-red-500">*</Text>
        </Text>
        <TextInput
          className="mb-4 text-xl text-gray-700 border-b"
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible} // Toggle visibility based on state
          value={credentials.password}
          placeholderTextColor={isDarkMode ? '#303030' : '#303030'}
          onChangeText={text =>
            setCredentials({...credentials, password: text})
          }
        />
        {/* Eye icon to toggle password visibility */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 15,
            padding: 10,
          }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'} // Toggle between eye-off and eye
            size={24}
            color="#909090"
          />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <View className="items-center mt-16">
        <ReusableButton
          text={isLoading ? 'Registering...' : 'Register'}
          onPress={handleRegister}
          style="w-60"
          textStyle="text-xl"
        />
      </View>

      {/* Login Navigation */}
      <View className="flex-row items-center justify-center mt-6">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-xl font-semibold text-center text-gray-600 ">
            Already have an account?{' '}
            <Text className="text-black uppercase">Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
