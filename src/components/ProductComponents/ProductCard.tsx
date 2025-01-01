import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Product} from '../../utils/types/productTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';

const ProductCard: React.FC<{item: Product; style: string}> = ({item,style}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const price = item.originalPrice * 90;
  const finalPrice = item.finalPrice * 90;
  return (
    <View className="bg-gray-200 min-h-80 rounded-lg p-4">
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('SingleProduct', {itemId: item._id});
        }}>
        <Image
          source={{uri: item.image}}
          className={`w-full rounded-md ${style}`}
          resizeMode="cover"
        />
        <Text className="text-sm font-bold mt-2 text-gray-800 ">
          {item.title}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {item.category} | {item.brand}{' '}
        </Text>
        <Text className="text-sm font-semibold text-[#4f46e5] mt-1">
          &#8377;{finalPrice.toFixed(2)}
        </Text>
        {item.discount > 0 && (
          <Text className="text-xs text-red-500 line-through">
            &#8377;{price.toFixed(2)}
          </Text>
        )}
        <Text className="text-xs text-gray-500 mt-1">
          In stock: {item.stock}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
