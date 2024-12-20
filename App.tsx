/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNavigation />
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default App;
