import {configureStore} from '@reduxjs/toolkit';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productApi from './features/products/productApi';
import cartReducer from './features/cart/cartSlice';

import productQueryReducer from './features/products/productQuerySlice';
import reviewReducer from './features/reviews/reviewSlice';
import reviewApi from './features/reviews/reviewApi';
import cartApi from './features/cart/cartApi';
import wishlistApi from './features/wishlist/wishlistApi';
import salesApi from './features/sales/salesApi';
import addressApi from './features/address/addressApi';
import addressReducer from './features/address/addressSlice';
import orderApi from './features/order/orderApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productQuery: productQueryReducer,
    review: reviewReducer,
    cart: cartReducer,
    address: addressReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      reviewApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      salesApi.middleware,
      addressApi.middleware,
      orderApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
