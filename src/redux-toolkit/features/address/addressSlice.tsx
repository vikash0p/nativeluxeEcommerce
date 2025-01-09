import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Address} from '../../../utils/types/addressTypes';

interface AddressFields {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  mobile: string;
  addressType: string;
}

// Define the state interface
interface AddressState {
  addresses: Address | null;
  addressFields: AddressFields;
}

// Initialize the state
const initialState: AddressState = {
  addresses: null,
  addressFields: {
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobile: '',
    addressType: 'Home',
  },
};

// Create the slice
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // Action to add an address
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses = action.payload;
    },

    // Action to set the address fields
    setAddress: (state, action: PayloadAction<AddressFields>) => {
      state.addressFields = action.payload;
    },

    // Action to reset the address state
    resetAddress: state => {
      state.addressFields = initialState.addressFields;
      state.addresses = null;
    },
  },
});

// Export actions
export const {addAddress, setAddress, resetAddress} = addressSlice.actions;

// Export reducer
export default addressSlice.reducer;
