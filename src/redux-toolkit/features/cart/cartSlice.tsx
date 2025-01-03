import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartState {
    quantity: number;
    colors: string;
}

// Initial State
const initialState: CartState = {
  quantity: 1,
  colors: '',

};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, action: PayloadAction<number>) => {
      state.quantity += action.payload;
    },
    // Remove from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.quantity -= action.payload;
    },

    // Add color
    addColor: (state, action: PayloadAction<string>) => {
      state.colors = action.payload;
    },



  },
});

// Export actions
export const {addToCart, removeFromCart, addColor} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
