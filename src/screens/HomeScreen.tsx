import {SafeAreaView} from 'react-native';
import React from 'react';
import HomeTopBar from '../components/HomeComponents/HomeTopBar';
import HomeCategory from '../components/HomeComponents/HomeCategory';
import HomeCarousel from '../components/HomeComponents/HomeCarousel';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <HomeTopBar />
      <HomeCategory />
      <HomeCarousel />
    </SafeAreaView>
  );
};

export default HomeScreen;
