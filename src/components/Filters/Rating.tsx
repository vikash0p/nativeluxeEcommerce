import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import StarRating from '../ProductComponents/StarRating'; // Import StarRating component
import {ratings} from '../../utils/data/ProductFilterData';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {setParams} from '../../redux-toolkit/features/products/productQuerySlice';

const Rating = () => {
  const dispatch = useAppDispatch();
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // Local state for UI updates

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating); // Update the selected rating locally
    dispatch(setParams({minRating: rating})); // Dispatch the rating to the Redux store
  };

  return (
    <View className="border p-4 rounded-md">
      <Text className="text-xl font-bold text-gray-800 mb-4">{'Ratings'}</Text>
      {ratings?.map(item => (
        <View
          key={item}
          className="flex-row items-center bg-white mb-4 rounded-lg shadow-sm">
          <RadioButton
            value={item.toString()}
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={selectedRating === item ? 'checked' : 'unchecked'}
            onPress={() => handleRatingChange(item)}
          />
          <View className="flex-row items-center ml-2">
            <StarRating rating={item} />
            <Text className="text-xl">& up</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Rating;
