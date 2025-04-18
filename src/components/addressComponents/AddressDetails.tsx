import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Address} from '../../utils/types/addressTypes';
import {RadioButton} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {addAddress} from '../../redux-toolkit/features/address/addressSlice';
import {RootState} from '../../redux-toolkit/store';
import EditAddressModel from './EditAddressModel';
import Feather from 'react-native-vector-icons/Feather';
import {useDeleteAddressMutation} from '../../redux-toolkit/features/address/addressApi';
import {Toast} from 'toastify-react-native';

const AddressDetails = ({item}: {item: Address}) => {
  const dispatch = useAppDispatch();
  const {addresses} = useAppSelector((state: RootState) => state.address);
  const [isModalVisible, setModalVisible] = useState(false);

  const [deleteAddress, {isLoading}] = useDeleteAddressMutation();

  useEffect(() => {
    if (!addresses && item) {
      dispatch(addAddress(item));
    }
  }, [dispatch, item, addresses, isLoading]);

  const deleteHandler = async () => {
    if (addresses?._id !== item._id) {
      Toast.warn('Please select the address before deleting.');
      return;
    }

    try {
      await deleteAddress(item._id);
      dispatch(addAddress({} as Address));
      Toast.success('Address deleted successfully!');
    } catch (error) {
      console.error(error);
      Toast.error('Failed to delete address.');
    }
  };

  return (
    <View className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
      {/* Header Section */}
      <View className="flex-row items-center ">
        <View className="flex-row items-center gap-x-2">
          <RadioButton
            value={item._id}
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={addresses?._id === item._id ? 'checked' : 'unchecked'}
            onPress={() => dispatch(addAddress(item))}
          />
          <View className="flex-row items-center gap-x-4">
            <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
            <Text className="text-sm font-semibold text-indigo-600 bg-gray-200 px-2 py-1 rounded-sm">
              {item.addressType}
            </Text>
          </View>
        </View>
      </View>

      {/* Address Section */}
      <View className="space-y-1 ps-7 mb-4">
        <Text className="text-sm text-gray-700">
          {item.street}, {item.city}
        </Text>
        <Text className="text-sm text-gray-700">
          {item.state}, {item.postalCode}
        </Text>
        <Text className="text-sm text-gray-700">{item.country}</Text>
        <Text className="text-sm text-gray-700">{item.mobile}</Text>
      </View>

      {/* Actions Section */}
      {addresses?._id === item._id && (
        <View className="flex-row justify-end items-center gap-x-4">
          {/* Edit Button */}
          <TouchableOpacity
            className="flex-row items-center bg-indigo-600 px-3 py-2 rounded-md shadow active:bg-indigo-700"
            onPress={() => {
              setModalVisible(true);
            }}>
            <Feather name="edit-2" size={16} color="white" />
            <Text className="text-white font-bold text-sm ml-2">Edit</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            className="flex-row items-center bg-red-500 px-3 py-2 rounded-md shadow active:bg-red-700"
            onPress={deleteHandler}>
            <Feather name="trash-2" size={16} color="white" />
            <Text className="text-white font-bold text-sm ml-2">
              {isLoading ? 'Deleting...' : 'Delete'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal Section */}
      {isModalVisible && (
        <EditAddressModel
          address={item}
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default AddressDetails;
