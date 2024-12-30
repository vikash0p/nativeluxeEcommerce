import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProductRatingProps {
  rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({rating}) => {
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating - fullStars >= 0.5; // Determine if there's a half-star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <View className="flex-row items-center gap-1">
      {/* Full Stars */}
      {Array.from({length: fullStars}).map((_, index) => (
        <FontAwesome
          key={`full-${index}`}
          name="star"
          size={20}
          color="#FFD700"
        />
      ))}
      {/* Half Star */}
      {halfStar && (
        <FontAwesome name="star-half-full" size={20} color="#FFD700" />
      )}
      {/* Empty Stars */}
      {Array.from({length: emptyStars}).map((_, index) => (
        <FontAwesome
          key={`empty-${index}`}
          name="star-o"
          size={20}
          color="#FFD700"
        />
      ))}
      {/* Numerical Rating */}
      <Text className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</Text>
    </View>
  );
};

export default ProductRating;
