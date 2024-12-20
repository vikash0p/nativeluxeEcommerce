import React from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';

interface ReusableButtonProps {
  text: string; // The text displayed on the button
  onPress?: (event: GestureResponderEvent) => void; // Callback for button press
  style?: string; // Optional Tailwind classes for custom styling
  textStyle?: string; // Optional Tailwind classes for text styling
}

const ReusableButton: React.FC<ReusableButtonProps> = ({text,onPress,style = '',textStyle = ''}) => {
  return (
    <TouchableOpacity
      className={`px-6 py-3 bg-black rounded-sm ${style}`}
      onPress={onPress}>
      <Text className={`font-serif text-xl font-bold text-center text-white ${textStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ReusableButton;
