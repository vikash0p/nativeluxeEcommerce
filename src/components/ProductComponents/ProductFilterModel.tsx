import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReusableCheckbox from '../ReusableComponents/ReusableCheckbox';

interface ProductFilterModelProps {
  isFilterModalVisible: boolean;
  setIsFilterModalVisible: (value: boolean) => void;
}

const ProductFilterModel: React.FC<ProductFilterModelProps> = ({
  isFilterModalVisible,
  setIsFilterModalVisible,
}) => {
  return (
    <Modal
      visible={isFilterModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsFilterModalVisible(false)}>
      <View className="flex-1 bg-gray-500/50 justify-end">
        <View className="bg-white rounded-t-2xl p-6 shadow-lg max-h-[90%]">
          {/* Header Section */}
          <View className="flex-row justify-between items-center border-b pb-3 mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Filter Products
            </Text>
            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content Section */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-4">
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 1</Text>
                <ReusableCheckbox />
              </View>
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 2</Text>
                <ReusableCheckbox />
              </View>
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 3</Text>
                <ReusableCheckbox />
              </View>
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 4</Text>
                <ReusableCheckbox />
              </View>
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 5</Text>
                <ReusableCheckbox />
              </View>
              <View className="flex-col gap-2  ">
                <Text className="text-2xl font-bold font-serif">Option 6</Text>
                <ReusableCheckbox />
              </View>
              {/* Add more options as needed */}
            </View>
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity
            onPress={() => setIsFilterModalVisible(false)}
            className="mt-6 bg-blue-500 rounded-lg py-3">
            <Text className="text-center text-white text-lg font-semibold">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductFilterModel;
