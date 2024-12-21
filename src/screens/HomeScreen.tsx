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
          source={{
            uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sb3J8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          }}
          styles="w-full h-40 rounded-md"
        />
      </View>

      <HomeCollection />
    </SafeAreaView>
  );
};

export default HomeScreen;
