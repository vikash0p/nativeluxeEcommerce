import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {useCreateReviewMutation} from '../../redux-toolkit/features/reviews/reviewApi';
import {Alert} from 'react-native';
import {
  setComment,
  setRating,
} from '../../redux-toolkit/features/reviews/reviewSlice';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const UserReview = ({productId}: {productId: string}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isAuthenticated, loading, user} = useAppSelector(
    (state: RootState) => state.auth,
  );
  const {comment, rating} = useAppSelector((state: RootState) => state.review);
  const dispatch = useAppDispatch();

  const [createReview, {isLoading, isError, error}] = useCreateReviewMutation();

  // Handle star rating selection
  const handleRating = (value: number): void => {
    dispatch(setRating(value));
  };
  const handleCommentChange = (text: string) => {
    dispatch(setComment(text));
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
      <View className="flex-1 items-center justify-center bg-gray-100 py-10">
        <Text className="text-lg font-bold text-gray-800">
          Please log in to add a comment
        </Text>
        <View className="flex-row gap-4 mt-4">
          <TouchableOpacity
            className="bg-indigo-600 py-3 px-10 rounded-lg"
            onPress={() => {navigation.navigate('Login');}}>
            <Text className="text-white font-semibold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Add a new review
  const handleAddReview = async () => {
    if (comment.trim() === '') {
      Alert.alert('Please enter a comment.');
    } else if (rating === 0) {
      Alert.alert('Please select a rating.');
    } else {
      await createReview({productId, rating, comment, userId: user?._id});
      dispatch(setRating(0));
      dispatch(setComment(''));
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
        onChangeText={handleCommentChange}
        multiline
        maxLength={200} // Optional: Limit comment length
        accessible
        accessibilityLabel="Comment Input"
        accessibilityHint="Enter your comment here"
        placeholderTextColor={'#888'}
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
    </View>
  );
};

export default UserReview;
