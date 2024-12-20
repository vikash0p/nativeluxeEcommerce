import {SafeAreaView, View} from 'react-native';
import React from 'react';
import HomeTopBar from '../components/HomeComponents/HomeTopBar';
import HomeCategory from '../components/HomeComponents/HomeCategory';
import HomeCarousel from '../components/HomeComponents/HomeCarousel';
import ReusableImage from '../components/ReusableComponents/ReusableImage';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <HomeTopBar />
      <HomeCategory />

      <HomeCarousel />
      <View className="items-center justify-center flex-1 px-4 bg-white mt-28">
        <ReusableImage
          source={{
            uri: 'https://res.cloudinary.com/dhttnehwp/image/upload/v1734708941/houseProduct/mobile/hxnr75zuwjwp8waxeyho.jpg',
          }}
          className="w-full h-48 rounded-lg"
          placeholderClassName="w-full h-48 bg-gray-200 "
          loaderColor="blue"
          resizeMode="cover"
        />
      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;
