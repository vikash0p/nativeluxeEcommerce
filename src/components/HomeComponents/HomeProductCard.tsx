import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Product} from '../../redux-toolkit/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {useIncrementProductViewsMutation} from '../../redux-toolkit/features/products/productApi';

const HomeProductCard = ({product, title}: {product: Product, title: string |number}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [incrementProductViews] = useIncrementProductViewsMutation();
//   console.log(product._id);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('SingleProduct', {itemId: product._id});
        incrementProductViews(product._id);
      }}>
      <View key={product.id} className="w-52 mr-4">
        <View className="bg-gray-100 rounded-lg relative">
          {/* New Product Badge */}
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full z-10">
            <Text className="text-xs font-bold text-white">{title}</Text>
          </View>

          <Image
            source={{uri: product.image}}
            className="h-40 w-full rounded-lg mb-4"
            resizeMode="stretch"
          />
          <View className="px-4 pb-8 h-40">
            <Text className="text-md font-semibold text-gray-800 mb-1">
              {product.title}
            </Text>
            <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
              {product.description}
            </Text>
            <Text className="text-base text-gray-800 font-bold mb-1">
              ${product.finalPrice.toFixed(2)}
            </Text>
            {product.discount > 0 && (
              <Text className="text-sm text-red-500">
                Save {product.discount}%
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProductCard;
