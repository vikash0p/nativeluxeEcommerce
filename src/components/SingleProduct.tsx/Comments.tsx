import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useGetReviewsByProductIdQuery} from '../../redux-toolkit/features/reviews/reviewApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReviewDiffDate from "./ReviewDiffDate";

// Define the type for the comment data
interface User {
  _id: string;
  name: string;
  email: string;
}

interface Product {
  _id: string;
  title: string;
  category: string;
}

interface Review {
  _id: string;
  userId: User;
  productId: Product;
  comment: string;
  rating: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentProps {
  productId: string;
}

const Comments: React.FC<CommentProps> = ({productId}) => {
  const {data, error, isError, isLoading} =
    useGetReviewsByProductIdQuery(productId);
  console.log('🚀 ~ file: Comments.tsx:36 ~ data:', data?.averageRating);

  const colors = [
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A8',
    '#A833FF',
    '#33FFF5',
    '#FFD700',
    '#FF914D',
    '#4DFF91',
    '#914DFF',
  ];

  console.log();
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Loading comments...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-white pb-5">
        <Text className="text-lg text-red-500">
          {error &&
            'data' in error &&
            (error as {data: {message: string}}).data.message}
        </Text>
      </View>
    );
  }

  if (!data || data?.reviews.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">
          No comments available for this product.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white">
      <Text className="text-xl font-bold mb-4 text-gray-800">Comments</Text>
      <ScrollView className="space-y-4">
        {data?.reviews.map((item: Review, ) => (
          <View
            key={item._id}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
            {/* User Info */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <View
                  className="border border-black rounded-full w-14 h-14 flex items-center justify-center"
                  style={{
                    backgroundColor:
                      colors[Math.round(Math.random() * colors.length)],
                  }}>
                  <Text className="text-2xl font-semibold text-white text-center">
                    {item.userId.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <View className="flex-row gap-2 items-center">
                    <Text className="text-lg font-bold">
                      {item.userId.name.charAt(0).toUpperCase() +
                        item.userId.name.slice(1)}{' '}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {/* {new Date(item.date).toLocaleDateString()} */}
                      <ReviewDiffDate date={item.date} />
                    </Text>
                  </View>
                  {/* Rating */}
                  <View className="flex-row items-center mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <MaterialIcons
                        key={star}
                        name="star"
                        size={20}
                        color={star <= item.rating ? 'gold' : 'gray'}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Comment */}
            <Text className="mt-2 text-gray-600">{item.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Comments;
