import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

interface ReusableImageProps {
  image: any; // Allows both local `require` and remote URI strings
  styles?: string; // Tailwind class strings
  navigation?: () => void; // Optional navigation callback
}

const ReusableImage: React.FC<ReusableImageProps> = ({
  styles,
  image,
  navigation,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={navigation}>
      <View className="px-1 bg-white rounded-md">
        <Image source={image} className={` ${styles}`} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

export default ReusableImage;
