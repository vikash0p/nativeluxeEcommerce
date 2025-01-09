import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Address} from '../../utils/types/addressTypes';
import {RadioButton} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {addAddress} from '../../redux-toolkit/features/address/addressSlice';
import {RootState} from '../../redux-toolkit/store';

const AddressDetails = ({item}: {item: Address}) => {


  const dispatch = useAppDispatch();
  const {addresses} = useAppSelector((state: RootState) => state.address);

  useEffect(() => {
    dispatch(addAddress(item));
  }, [dispatch, item]);

  return (
    <View className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
      {/* Header Section */}
      <View className="flex-row items-center justify-between ">
        <View className="flex-row items-center gap-3">
          <RadioButton
            value={item._id}
            color="#4f46e5"
            uncheckedColor="#4f46e5"
            status={addresses?._id === item._id ? 'checked' : 'unchecked'}
            onPress={() => dispatch(addAddress(item))}
          />
          <View className="flex-row items-center gap-5">
            <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
            <Text className="text-md font-bold text-indigo-600 bg-gray-200 px-2 py-1 rounded-sm">
              {item.addressType}
            </Text>
          </View>
        </View>
        {/* Edit Button */}
        {addresses?._id === item._id && (
          <TouchableOpacity
            className="bg-indigo-600 px-4 py-2 rounded-md shadow active:bg-indigo-700"
            onPress={() => {
              console.log('Edit address:', item);
            }}>
            <Text className="text-white font-bold text-md">Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Address Section */}
      <View className="space-y-2 ps-3">
        <Text className="text-md font-bold text-gray-700">
          {item.street}, {item.city}
        </Text>
        <Text className="text-md font-bold text-gray-700">
          {item.state}, {item.postalCode}
        </Text>
        <Text className="text-md font-bold text-gray-700">{item.country}</Text>
        <Text className="text-md font-bold text-gray-700">{item.mobile}</Text>
      </View>
    </View>
  );
};

export default AddressDetails;
