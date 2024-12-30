import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface ProductReviewsProps {
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
  }>;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({reviews}) => {
  return (
    <View className="mt-6">
      <Text className="text-xl font-bold text-gray-800 mb-4">Reviews</Text>
      {reviews.map((review, index) => (
        <View key={index} className="bg-gray-100 p-4 rounded-md mb-3 shadow-sm">
          {/* Rating */}
          <View className="flex-row items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={16}
                color={i < review.rating ? '#FFD700' : '#E4E4E4'}
              />
            ))}
          </View>

          {/* Comment */}
          <Text className="text-sm text-gray-700">{review.comment}</Text>

          {/* Date */}
          <Text className="text-xs text-gray-500 mt-1">
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ProductReviews;
