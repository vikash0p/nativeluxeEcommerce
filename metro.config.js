const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

// Default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Combine configurations
const config = mergeConfig(defaultConfig, {
    // Add any custom Metro configurations here if needed
});

// Wrap with NativeWind configuration
const configWithNativeWind = withNativeWind(config, {
    input: "./global.css", // Specify your CSS file for global styles if applicable
});

// Wrap with Reanimated configuration
module.exports = wrapWithReanimatedMetroConfig(configWithNativeWind);
