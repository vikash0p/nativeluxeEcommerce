import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux-toolkit/hooks';
import {RootState} from '../../redux-toolkit/store';
import {
  resetAddress,
  setAddress,
} from '../../redux-toolkit/features/address/addressSlice';
import {useAddAddressMutation} from '../../redux-toolkit/features/address/addressApi';

interface AddAddressModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isVisible,
  onClose,
}) => {
  const {addressFields} = useAppSelector((state: RootState) => state.address);
  const {user} = useAppSelector((state: RootState) => state.auth);
  const [addAddress, {isLoading}] = useAddAddressMutation();

  const dispatch = useAppDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const addressTypes = ['Home', 'Work', 'Billing', 'Shipping'];

  // Global onChange handler
  const handleInputChange = (field: string, value: string) => {
    dispatch(setAddress({...addressFields, [field]: value}));
  };

  const isFormValid = () => {
    const requiredFields: (keyof typeof addressFields)[] = [
      'name',
      'street',
      'city',
      'state',
      'postalCode',
      'country',
      'mobile',
      'addressType',
    ];
    return requiredFields.every(field => addressFields[field]?.trim() !== '');
  };

  const handleAddAddressSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    try {
      const response = await addAddress({
        ...addressFields,
        userId: user?._id ?? '',
      }).unwrap();
      console.log('🚀 ~ file: AddAddressModel.tsx:44 ~ response:', response);

      onClose();
      dispatch(resetAddress());
    } catch (error) {
      console.log('🚀 ~ file: AddAddressModel.tsx:45 ~ error:', error);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-30">
        <View className="bg-white w-11/12 p-6 rounded-lg shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Add New Address
          </Text>

          {/* Name Input */}
          <TextInput
            value={addressFields.name}
            onChangeText={text => handleInputChange('name', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="Name"
          />
          {/* Street Input */}
          <TextInput
            value={addressFields.street}
            onChangeText={text => handleInputChange('street', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="Street"
          />
          {/* City Input */}
          <TextInput
            value={addressFields.city}
            onChangeText={text => handleInputChange('city', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="City"
          />
          {/* State Input */}
          <TextInput
            value={addressFields.state}
            onChangeText={text => handleInputChange('state', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="State"
          />
          {/* Postal Code Input */}
          <TextInput
            value={addressFields.postalCode}
            onChangeText={text => handleInputChange('postalCode', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="Postal Code"
            keyboardType="numeric"
          />
          {/* Country Input */}
          <TextInput
            value={addressFields.country}
            onChangeText={text => handleInputChange('country', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="Country"
          />
          {/* Mobile Input */}
          <TextInput
            value={addressFields.mobile}
            onChangeText={text => handleInputChange('mobile', text)}
            className="border border-black rounded-md p-4 mb-4"
            placeholderTextColor="black"
            placeholder="Mobile (10 digits)"
            keyboardType="phone-pad"
          />

          {/* Address Type Dropdown */}
          <View className="mb-4">
            <TouchableOpacity
              onPress={() => setDropdownOpen(!dropdownOpen)}
              className="border border-black rounded-md p-4 bg-gray-100">
              <Text className="text-gray-800">
                {addressFields.addressType || 'Select Address Type'}
              </Text>
            </TouchableOpacity>

            {dropdownOpen && (
              <View className="border border-black rounded-md bg-white mt-2">
                <FlatList
                  data={addressTypes}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleInputChange('addressType', item);
                        setDropdownOpen(false);
                      }}
                      className="p-4 border-b border-gray-200 last:border-b-0">
                      <Text className="text-gray-800">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between items-center mt-4">
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 py-3 rounded-lg border border-black mr-2 shadow-sm active:bg-gray-200">
              <Text className="text-center text-gray-700 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Save Address Button */}
            <TouchableOpacity
              onPress={handleAddAddressSubmit}
              disabled={!isFormValid() || isLoading} // Disable if form is invalid or loading
              className={`flex-1 py-3 rounded-lg shadow-md ml-2 ${
                !isFormValid() || isLoading
                  ? 'bg-gray-400'
                  : 'bg-[#4f46e5] active:bg-[#3730a3]'
              }`}>
              <Text className="text-center text-white font-semibold">
                {isLoading ? 'Saving...' : 'Save Address'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddAddressModal;
