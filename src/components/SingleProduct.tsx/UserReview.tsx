import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useCreateReviewMutation} from '../../redux-toolkit/features/reviews/reviewApi';

type Review = {
  rating: number;
  comment: string;
};

const UserReview = ({productId}: {productId: string}) => {
  const {isAuthenticated, loading, user} = useAppSelector(
    (state: RootState) => state.auth,
  );

  const [createReview, {isLoading, isError,error}] = useCreateReviewMutation();

  console.log('🚀 ~ file: UserReview.tsx:11 ~ productId:', productId);
  const [rating, setRating] = useState<number>(0); // Star rating (1 to 5)
  const [comment, setComment] = useState<string>(''); // User comment input
  const [reviews, setReviews] = useState<Review[]>([]); // List of reviews

  // Handle star rating selection
  const handleRating = (value: number): void => {
    setRating(value);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-lg text-gray-600">Loading profile...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg font-bold text-gray-800">
          Please log in to view your profile.
        </Text>
      </View>
    );
  }

  // Add a new review
  const handleAddReview =  async()  => {
    if (comment.trim()) {
      await createReview({productId, rating, comment, userId: user?._id });
      // Append the new review to the list
      setReviews([...reviews, {rating, comment}]);
      setComment(''); // Clear the comment input
      setRating(0); // Reset the star rating
    }
  };

  return (
    <View className="bg-white p-4">
      {/* Title */}
      <Text className="text-xl font-semibold mb-4">User Reviews:</Text>
      {/* Star Rating */}
      <View className="flex-row mb-4">
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRating(star)}
            accessible
            accessibilityLabel={`Rate ${star} star`}>
            <MaterialIcons
              name="star"
              size={32}
              color={star <= rating ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* Input Field for Comments */}
      <TextInput
        className="border border-gray-300 rounded-lg p-2 py-4 mb-4"
        placeholder="Write a comment..."
        value={comment}
        onChangeText={setComment}
        multiline
        maxLength={200} // Optional: Limit comment length
        accessible
        accessibilityLabel="Comment Input"
      />
      {isError && 'data' in error && (
        <Text className="text-red-500">{(error as any).data?.message}</Text>
      )}
      {/* Submit Button */}
      <TouchableOpacity
        className="bg-indigo-600 py-3 rounded-lg items-center shadow-lg mb-6"
        onPress={handleAddReview}
        accessible
        accessibilityLabel="Add Review">
        <Text className="text-white text-lg font-semibold">
          {isLoading ? 'Adding Review...' : 'Add Review'}{' '}
        </Text>
      </TouchableOpacity>
      {/* Display Reviews */}
      {reviews.length > 0 ? (
        <View>
          <Text className="text-lg font-semibold mb-2">Comments:</Text>
          {reviews.map((review, index) => (
            <View
              key={index}
              className="border-b border-gray-200 py-4 flex-row items-start gap-3">
              {/* Display Star Rating */}
              <View className="flex-row">
                {[1, 2, 3, 4, 5].map(star => (
                  <MaterialIcons
                    key={star}
                    name="star"
                    size={20}
                    color={star <= review.rating ? 'gold' : 'gray'}
                  />
                ))}
              </View>
              {/* Display Comment */}
              <Text className="text-gray-700">{review.comment}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-gray-500">
          No reviews yet. Be the first to add one!
        </Text>
      )}
    </View>
  );
};

export default UserReview;
