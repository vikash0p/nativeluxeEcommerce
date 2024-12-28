import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'; // Ensure safe area padding
import {WelcomeScreenNavigationProp} from '../navigation/navigationTypes';
import ReusableButton from '../components/ReusableComponents/ReusableButton';

const WelcomeScreen = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={require('../asset/images/welcome.png')} // Replace with your background image
        resizeMode="cover"
        className="items-center justify-center flex-1 w-full">
        <View className="justify-center flex-1 px-5">
          <Text className="mb-3 font-serif text-3xl font-bold tracking-widest text-gray-500 uppercase">
            Make Your{' '}
          </Text>
          <Text className="mb-3 font-serif text-4xl font-bold tracking-widest uppercase">
            Beautiful Home{' '}
          </Text>

          <Text className="px-5 mt-20 text-xl leading-9 text-center text-gray-500">
            The best simple place where you discover the most wonderful
            furniture and make your home beautiful.
          </Text>

          {/* Button Container */}
          <View className="items-center mt-40">
            <ReusableButton
              text="Get Started"
              onPress={() => navigation.navigate('Tabs')}
              style="w-60 bg-black"
              textStyle="text-white"
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
