/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      {/* StatusBar configuration */}
      <StatusBar
        barStyle="light-content" // Set to "light-content" for light text on dark backgrounds
        backgroundColor="#4f46e5" // Custom background color for the StatusBar
        translucent={false} // Prevents StatusBar from being transparent
      />

      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNavigation />
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  )
};

export default App;
