import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {
  resetParams,
} from '../../redux-toolkit/features/products/productQuerySlice';
import Filters from '../Filters/Filters';

interface ProductFilterModelProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ProductFilterModel: React.FC<ProductFilterModelProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const handleApplyFilters = () => {
    // dispatch(applyFilters());
    setIsOpen(false); // Close the modal
  };

  const handleResetFilters = () => {
    dispatch(resetParams()); // Reset filter parameters
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsOpen(false)}>
      <View className="flex-1 bg-gray-500/50 justify-end">
        <View className="bg-white rounded-t-2xl p-6 shadow-lg max-h-[90%]">
          {/* Header Section */}
          <View className="flex-row justify-between items-center border-b pb-3 mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Filter Products
            </Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content Section */}
          <ScrollView className="mb-24">
            <View className="space-y-4">
              <View className="flex-col gap-2">
                <Filters />
              </View>
            </View>
          </ScrollView>

          {/* Fixed Bottom Buttons */}
          <View className="absolute bottom-0 left-0 right-0 bg-white p-4">
            <TouchableOpacity
              onPress={handleApplyFilters}
              className="mb-3 bg-[#4f46e5] rounded-lg py-3">
              <Text className="text-center text-white text-lg font-semibold">
                Apply Filters
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleResetFilters}
              className="bg-red-500 rounded-lg py-3">
              <Text className="text-center text-white text-lg font-semibold">
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductFilterModel;
