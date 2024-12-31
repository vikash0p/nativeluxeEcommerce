import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
  image: string;
}

const NotificationScreen = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Order Shipped',
      description: 'Your order #12345 has been shipped.',
      timestamp: '2 hours ago',
      isNew: true,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '2',
      title: 'Welcome Gift',
      description: 'You’ve received a 10% discount on your next order!',
      timestamp: '1 day ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '3',
      title: 'Profile Updated',
      description: 'Your profile details have been successfully updated.',
      timestamp: '3 days ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '4',
      title: 'Payment Received',
      description: 'Your payment for order #12345 has been received.',
      timestamp: '5 days ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '5',
      title: 'Special Offer',
      description: 'Don’t miss out! A special offer is waiting for you.',
      timestamp: '1 week ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '6',
      title: 'Order Delivered',
      description: 'Your order #12345 has been delivered. Enjoy!',
      timestamp: '2 weeks ago',
      isNew: true,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '7',
      title: 'Product Review',
      description: 'Leave a review for your recent purchase and earn rewards.',
      timestamp: '3 weeks ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '8',
      title: 'Wishlist Reminder',
      description: 'Your favorite item is back in stock. Grab it now!',
      timestamp: '1 month ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '9',
      title: 'Subscription Activated',
      description: 'Your premium subscription is now active.',
      timestamp: '1 month ago',
      isNew: true,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
    {
      id: '10',
      title: 'Weekly Newsletter',
      description: 'Check out our latest updates and features.',
      timestamp: '2 months ago',
      isNew: false,
      image: 'https://img.freepik.com/free-photo/speech-bubble-chat-message-icon-with-bell-notification-alert-notice-reminder-symbol-conversation-button-icon-symbol-background-3d-illustration_56104-2083.jpg?uid=R86250668&ga=GA1.1.1503694400.1733462964&semt=ais_hybrid',
    },
  ];

  const renderItem = ({ item }: { item: Notification }) => (
    <View
      className={`flex-row items-center p-4 mb-2 bg-white rounded-lg shadow ${
        item.isNew ? 'border-l-4 border-indigo-600' : ''
      }`}
    >
      {/* Placeholder Image */}
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-full mr-4"
        resizeMode="cover"
      />

      {/* Notification Content */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-600">{item.description}</Text>
        <Text className="text-xs text-gray-400 mt-1">{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* <Text className="text-2xl font-bold text-gray-800 mb-4">Notifications</Text> */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationScreen;
