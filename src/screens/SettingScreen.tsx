import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleToggleDarkMode = () => setIsDarkMode(prev => !prev);
  const handleToggleNotifications = () => setNotifications(prev => !prev);

  const sections = [
    {
      icon: 'account',
      title: 'Profile',
      description: 'Edit your profile details',
      onPress: () => {},
    },
    {
      icon: 'shield-lock',
      title: 'Account Security',
      description: 'Manage passwords and 2FA',
      onPress: () => {},
    },
    {
      icon: 'lock-outline',
      title: 'Privacy',
      description: 'Adjust your privacy settings',
      onPress: () => {},
    },
    {
      icon: 'bell-outline',
      title: 'Notifications',
      description: 'Customize alerts and sounds',
      onPress: handleToggleNotifications,
    },
    {
      icon: 'palette-outline',
      title: 'Appearance',
      description: 'Change theme or layout',
      onPress: () => {},
    },
    {
      icon: 'translate',
      title: 'Language',
      description: 'Set app language',
      onPress: () => {},
    },
    {
      icon: 'database-outline',
      title: 'Data Usage',
      description: 'Manage data and storage',
      onPress: () => {},
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      description: 'Access FAQs and contact support',
      onPress: () => {},
    },
    {
      icon: 'information-outline',
      title: 'About',
      description: 'Learn more about the app',
      onPress: () => {},
    },
    {
      icon: 'logout',
      title: 'Log Out',
      description: 'Sign out of your account',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-2">
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white rounded-lg p-4 mb-4 shadow flex-row items-center"
            onPress={section.onPress}>
            <Icon
              name={section.icon}
              size={30}
              color="#4B5563"
              className="mr-4"
            />
            <View className="flex-1">
              <Text className="text-xl font-medium text-gray-800">
                {section.title}
              </Text>
              <Text className="text-lg text-gray-500">
                {section.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {/* Additional Switch-Based Options */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Icon
              name="theme-light-dark"
              size={24}
              color="#4B5563"
              className="mr-4"
            />
            <Text className="text-lg font-medium text-gray-800">Dark Mode</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={notifications ? '#4f46e5' : '#f4f3f4'}
            value={isDarkMode}
            onValueChange={handleToggleDarkMode}
          />
        </View>
        <View className="bg-white rounded-lg p-4 mb-4 shadow flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Icon
              name="bell-ring-outline"
              size={24}
              color="#4B5563"
              className="mr-4"
            />
            <Text className="text-lg font-medium text-gray-800">
              Enable Notifications
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={notifications ? '#4f46e5' : '#f4f3f4'}
            value={notifications}
            onValueChange={handleToggleNotifications}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;
