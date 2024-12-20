/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ActivityIndicator, Image, ImageProps, View} from 'react-native';

interface ImageComponentProps extends ImageProps {
  loaderColor?: string; // Color for the loading indicator
  className?: string; // Tailwind classes for the image
  placeholderClassName?: string; // Tailwind classes for the placeholder
}

const ReusableImage: React.FC<ImageComponentProps> = ({
  loaderColor = 'gray',
  className,
  placeholderClassName,
  onLoad,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(event); // Call any provided `onLoad` prop
    }
  };

  return (
    <View className={`relative bg-white  ${placeholderClassName || ''}`}>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={loaderColor}
          style={{position: 'relative', alignSelf: 'center', top: '60%'}}
        />
      )}
      <Image
        {...props}
        className={`${className || ''} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
      />
    </View>
  );
};

export default ReusableImage;
