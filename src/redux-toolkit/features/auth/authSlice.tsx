import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserProps} from '../../types';

interface AuthState {
  user: UserProps | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false, // Added loading state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<UserProps | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false; // Ensure loading is reset after setting the user
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false; // Ensure loading is reset after logout
    },
  },
});

export const {setLoading, setUser, logout} = authSlice.actions;
export default authSlice.reducer;
