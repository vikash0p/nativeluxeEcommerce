import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const quickLinks = ['Home', 'Shop', 'About Us', 'Contact Us'];
  const services = ['Delivery', 'Returns', 'Support'];
  const corporateInfo = ['About Luxe', 'Careers', 'Investors'];
  const socialMedia = [
    {name: 'Facebook', icon: 'facebook', color: '#3b5998'},
    {name: 'Twitter', icon: 'twitter', color: '#1DA1F2'},
    {name: 'Instagram', icon: 'instagram', color: '#C13584'},
    {name: 'YouTube', icon: 'youtube', color: '#FF0000'},
  ];
  const paymentMethods = ['Visa', 'MasterCard', 'PayPal'];

  return (
    <View className="bg-gray-50 px-6 py-8">
      {/* Subscribe Section */}
      <View className="mb-8">
        <Text className="text-xl font-semibold text-gray-800 mb-3">
          Subscribe to Our Newsletter
        </Text>
        <TextInput
          className="bg-gray-200 px-4 py-3 rounded-md mb-3 text-gray-700"
          placeholder="Enter your email"
          placeholderTextColor="gray"
        />
        <TouchableOpacity className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-md">
          <Text className="text-white font-medium text-center">Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Links and Services */}
      <View className="flex-row justify-between mb-8">
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </Text>
          {quickLinks.map((link, index) => (
            <Text
              key={index}
              className="text-gray-500 text-base mb-2 hover:text-indigo-600">
              {link}
            </Text>
          ))}
        </View>
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Services
          </Text>
          {services.map((service, index) => (
            <Text
              key={index}
              className="text-gray-500 text-base mb-2 hover:text-indigo-600">
              {service}
            </Text>
          ))}
        </View>
      </View>

      {/* Corporate Info and My Account */}
      <View className="flex-row justify-between mb-8">
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Corporate Info
          </Text>
          {corporateInfo.map((info, index) => (
            <Text
              key={index}
              className="text-gray-500 text-base mb-2 hover:text-indigo-600">
              {info}
            </Text>
          ))}
        </View>
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            My Account
          </Text>
          <Text className="text-gray-500 text-base mb-2 hover:text-indigo-600">
            Login
          </Text>
          <Text className="text-gray-500 text-base mb-2 hover:text-indigo-600">
            Register
          </Text>
        </View>
      </View>

      {/* Social Media and Payments */}
      <View className="flex-row justify-between mb-8">
        {/* Social Media */}
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Follow Us
          </Text>
          <View className="flex-row space-x-4">
            {socialMedia.map((media, index) => (
              <FontAwesome
                key={index}
                name={media.icon}
                size={28}
                color={media.color}
                style={{marginRight: 10}}
              />
            ))}
          </View>
        </View>
        {/* Payment Methods */}
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Pay Using
          </Text>
          {paymentMethods.map((method, index) => (
            <Text
              key={index}
              className="text-gray-500 text-base mb-2 hover:text-indigo-600">
              {method}
            </Text>
          ))}
        </View>
      </View>

      {/* Footer Disclaimer */}
      <View className="border-t border-gray-300 pt-4">
        <Text className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()}, Luxe | All rights reserved. |{' '}
          <Text className="text-indigo-600 hover:text-indigo-800">
            Privacy Policy
          </Text>{' '}
          |{' '}
          <Text className="text-indigo-600 hover:text-indigo-800">
            Terms & Conditions
          </Text>{' '}
          |{' '}
          <Text className="text-indigo-600 hover:text-indigo-800">
            Policies
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Footer;
