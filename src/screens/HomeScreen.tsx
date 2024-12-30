import {SafeAreaView, ScrollView, View} from 'react-native';
import React from 'react';
import HomeTopBar from '../components/HomeComponents/HomeTopBar';
import HomeCategory from '../components/HomeComponents/HomeCategory';
import HomeCarousel from '../components/HomeComponents/HomeCarousel';
import HomeCollection from '../components/HomeComponents/HomeCollection';
import ReusableImage from '../components/ReusableComponents/ReusableImage';
import Footer from '../components/Globalcomponets/Footer';
import {TabsScreenNavigationProp} from '../navigation/navigationTypes';
import Features from "../components/HomeComponents/Features";

const HomeScreen: React.FC<{navigation: TabsScreenNavigationProp}> = ({
  navigation,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
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
        <Features />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
