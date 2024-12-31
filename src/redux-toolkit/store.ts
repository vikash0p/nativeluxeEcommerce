import {configureStore} from '@reduxjs/toolkit';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productApi from './features/products/productApi';

import productQueryReducer from './features/products/productQuerySlice';
import reviewApi from './features/reviews/reviewApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productQuery: productQueryReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
