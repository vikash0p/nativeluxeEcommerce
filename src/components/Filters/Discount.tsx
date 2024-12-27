import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {setParams} from '../../redux-toolkit/features/products/productQuerySlice';

// Type definition for Discount
type Discount = {
  id: string;
  value: number;
  label: string;
};

const Discount = () => {
  const dispatch = useAppDispatch();
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null); // Local state for UI updates

  // Generate discounts dynamically (10% to 70%)
  const discounts: Discount[] = Array.from({length: 7}, (_, index) => {
    const percentage = (index + 1) * 10;
    return {
      id: `discount${index + 1}`,
      value: percentage,
      label: `${percentage}% Discount & up`,
    };
  });

  const handleDiscountChange = (discountValue: number) => {
    setSelectedDiscount(discountValue); // Update the selected discount locally
    dispatch(setParams({discount: discountValue})); // Dispatch the discount value to the Redux store
  };

  return (
    <View className="border p-4 rounded-md">
      <Text className="text-xl font-bold text-gray-800 mb-4">Discounts</Text>
      {discounts.map(item => (
        <View
          key={item.id}
          className="flex-row items-center bg-white mb-4 rounded-lg shadow-sm">
          <RadioButton
            value={item.value.toString()}
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={selectedDiscount === item.value ? 'checked' : 'unchecked'}
            onPress={() => handleDiscountChange(item.value)}
          />
          <Text className="ml-3 text-lg text-gray-800">{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default Discount;
