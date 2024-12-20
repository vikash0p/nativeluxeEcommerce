module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    "react-native-reanimated/plugin", // Ensure this is the last plugin
  ],
};
