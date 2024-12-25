// src/features/api/authApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app/auth',
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
      invalidatesTags: ['Auth'],
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: '/getUserDetails',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export default authApi;

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserDetailsQuery,
} = authApi;
