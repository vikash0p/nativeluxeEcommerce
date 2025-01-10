import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {Address} from '../../utils/types/addressTypes';
import {useUpdateAddressMutation} from '../../redux-toolkit/features/address/addressApi';
import { Toast } from "toastify-react-native";


const EditAddressModel = ({
  address,
  visible,
  onClose,
}: {
  address: Address;
  visible: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<Address>(address);

  const handleInputChange = (field: keyof Address, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const [updateAddress, {isLoading}] = useUpdateAddressMutation();
  const handleSave = async () => {
    try {
      await updateAddress({addressId: address._id, updatedData: formData}).unwrap();
      Toast.success('Address updated successfully!');
      onClose();
    } catch (error) {
      console.log('🚀 ~ file: EditAddressModel.tsx:35 ~ error:', error);
      Toast.error('Failed to update address.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Address</Text>

          {/* Name Field */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            style={styles.input}
            placeholder="Enter name"
          />

          {/* Street Field */}
          <Text style={styles.label}>Street</Text>
          <TextInput
            value={formData.street}
            onChangeText={value => handleInputChange('street', value)}
            style={styles.input}
            placeholder="Enter street"
          />

          {/* City Field */}
          <Text style={styles.label}>City</Text>
          <TextInput
            value={formData.city}
            onChangeText={value => handleInputChange('city', value)}
            style={styles.input}
            placeholder="Enter city"
          />

          {/* State Field */}
          <Text style={styles.label}>State</Text>
          <TextInput
            value={formData.state}
            onChangeText={value => handleInputChange('state', value)}
            style={styles.input}
            placeholder="Enter state"
          />

          {/* Postal Code Field */}
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            value={formData.postalCode}
            onChangeText={value => handleInputChange('postalCode', value)}
            style={styles.input}
            placeholder="Enter postal code"
            keyboardType="numeric"
          />

          {/* Country Field */}
          <Text style={styles.label}>Country</Text>
          <TextInput
            value={formData.country}
            onChangeText={value => handleInputChange('country', value)}
            style={styles.input}
            placeholder="Enter country"
          />

          <Text style={styles.label}>Mobile</Text>
          <TextInput
            maxLength={10}
            placeholderTextColor="gray"
            value={formData.mobile.toString()}
            onChangeText={value => handleInputChange('mobile', value)}
            style={[styles.input, {backgroundColor: '#f3f4f6'}]} // Optional: Change the background color to indicate it's non-editable
            placeholder="Enter mobile"
            keyboardType="phone-pad"
            editable={false} // Makes the field non-editable
          />

          {/* Save and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}> {isLoading ? 'Saving...' : 'Save'} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#111827',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4f46e5',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditAddressModel;
