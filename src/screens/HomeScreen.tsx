import {SafeAreaView} from 'react-native';
import React from 'react';
import HomeTopBar from '../components/HomeComponents/HomeTopBar';
import HomeCategory from '../components/HomeComponents/HomeCategory';
import HomeCarousel from '../components/HomeComponents/HomeCarousel';
import HomeCollection from '../components/HomeComponents/HomeCollection';
import ReusableImage from '../components/ReusableComponents/ReusableImage';
import {TabsScreenNavigationProp} from '../utils/types/navigationTypes';
import {View} from 'react-native';

const HomeScreen: React.FC<{navigation: TabsScreenNavigationProp}> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <HomeTopBar navigation={navigation} />
      <HomeCarousel />
      <HomeCategory />
      <View>
        <ReusableImage
          image={require('../asset/images/banner/banner16.jpg')}
          styles="w-full h-24 rounded-md"
          navigation={() => navigation.navigate('Register')}
        />
        <ReusableImage
          image={require('../asset/images/banner/banner17.jpg')}
          styles="w-full h-24 rounded-md"
        />
      </View>
      <HomeCollection />
    </SafeAreaView>
  );
};

export default HomeScreen;
