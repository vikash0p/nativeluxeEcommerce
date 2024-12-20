import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the user properties
interface UserProps {
  name: string;
  email: string;
  _id: string;
  phone: number;
}

// Define the initial state structure
interface AuthState {
  user: UserProps | null; // User can be `null` if not authenticated
  isAuthenticated: boolean;
}

// Initial state with explicit types
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Create the auth slice with types
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set the user with type-safe payload
    setUser(state, action: PayloadAction<UserProps | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    // Logout action clears user data
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
