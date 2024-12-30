import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Product} from '../../redux-toolkit/types';
import ProductRating from './ProductRating';
import AdditionalInformation from './AdditionalInformation';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
  const [colors, setColors] = useState(product.color[0]);
  return (
    <View className="flex-1 bg-white   mb-20">
      <View className=" ">
        {/* Product Image */}
        <View className="ps-20 ">
          <Image
            source={{uri: product.image}}
            className="w-full h-[450px] rounded-bl-3xl  mb-4 "
            resizeMode="cover"
          />
          <View className="flex-col gap-6 bg-gray-300 rounded-full py-16 items-center w-20 absolute top-20 left-10">
            {product.color.map((color, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center mb-2"
                onPress={() => setColors(color)}>
                <Text
                  className={`text-lg font-semibold text-gray-800 ml-2 rounded-full w-12 h-12 border ${
                    colors === color ? 'border-2 border-[#4f46e5]' : ''
                  }`}
                  style={{backgroundColor: color}}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="p-4">
          {/* Product Title & Brand */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              {product.title}
            </Text>
            <Text className="text-base text-gray-500">by {product.brand}</Text>
          </View>

          {/* Price Section */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-indigo-600">
              ₹{product.finalPrice * 90}{' '}
              <Text className="text-sm line-through text-red-500">
                ₹{product.originalPrice * 90}
              </Text>
            </Text>
            <Text className="text-md text-green-500 font-semibold pb-3">
              {product.discount}% OFF
            </Text>
            <ProductRating rating={product.rating} />
            <View className="flex-row items-center  py-3 bg-white">
              <Text className="text-xl font-semibold text-gray-700">
                Choose color:
              </Text>
              <View
                className="ml-4 w-8 h-8 rounded-full border border-gray-400"
                style={{backgroundColor: colors}}
              />
            </View>
          </View>

          {/* Description */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Feather name="info" size={20} color="#4f46e5" />
              <Text className="text-lg font-semibold text-gray-800 ml-2">
                Description
              </Text>
            </View>
            <Text className="text-base text-gray-700">
              {product.description}
            </Text>
            <Text className="text-base text-gray-700">{product.about}</Text>
          </View>

          {/* Additional Details */}
          <View className="space-y-2 mb-4">
            <AdditionalInformation product={product} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
