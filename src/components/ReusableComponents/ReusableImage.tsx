import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, TouchableOpacity, ImageSourcePropType} from 'react-native';
import {RootStackParamList} from '../../utils/types/navigationTypes';
interface ReusableImageProps {
  source: ImageSourcePropType;
  styles: string;
}

const ReusableImage: React.FC<ReusableImageProps> = ({source, styles}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Register')}>
      <View className="px-1 bg-white">
        <Image
          source={source}
          className={`object-cover  ${styles}`}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ReusableImage;
