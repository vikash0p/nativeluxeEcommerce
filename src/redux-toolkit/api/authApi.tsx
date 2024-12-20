// src/features/api/authApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app/auth', // Replace with your backend URL
    credentials: 'include', // Ensure cookies are included for token-based auth
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: '/getUserDetails',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDetailsQuery,
} = authApi;
