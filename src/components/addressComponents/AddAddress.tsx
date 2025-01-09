import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AddAddressModel from './AddAddressModel';

const AddAddress: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View className=" bg-gray-100 mb-10 ">
      <TouchableOpacity
        className="flex-row items-center bg-white p-4 shadow-lg rounded-lg "
        onPress={handleOpenModal}>
        <Entypo name="plus" size={32} color="#4f46e5" />
        <Text className="ml-3 text-xl font-medium text-indigo-500">
          Add a new address
        </Text>
      </TouchableOpacity>
      {isModalVisible && (
        <AddAddressModel
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

export default AddAddress;
