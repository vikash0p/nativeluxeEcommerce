import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  SalesResponse,
  TotalSalesResponse,
  IncrementDecrementResetRequest,
  UserSalesResponse,
  SalesDataResponse,
} from '../../../utils/types/salesTypes';
const BASE_URL = 'https://backend-house.vercel.app';

// Create the RTK Query API
const salesApi = createApi({
  reducerPath: 'salesApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL, credentials: 'include'}),
  endpoints: builder => ({
    incrementSales: builder.mutation<
      SalesResponse,
      IncrementDecrementResetRequest
    >({
      query: body => ({
        url: '/sales/increment',
        method: 'POST',
        body,
      }),
    }),
    decrementSales: builder.mutation<
      SalesResponse,
      IncrementDecrementResetRequest
    >({
      query: body => ({
        url: '/sales/decrement',
        method: 'POST',
        body,
      }),
    }),
    resetSales: builder.mutation<SalesResponse, IncrementDecrementResetRequest>(
      {
        query: body => ({
          url: '/sales/reset',
          method: 'POST',
          body,
        }),
      },
    ),
    getTotalSales: builder.query<TotalSalesResponse, void>({
      query: () => '/sales/total',
    }),
    getUserSales: builder.query<UserSalesResponse, string>({
      query: userId => `/sales/user/${userId}`,
    }),
    getTotalProductsBySales: builder.query<SalesDataResponse, void>({
      query: () => '/sales/products/by-sales',
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useIncrementSalesMutation,
  useDecrementSalesMutation,
  useResetSalesMutation,
  useGetTotalSalesQuery,
  useGetUserSalesQuery,
  useGetTotalProductsBySalesQuery,
} = salesApi;

export default salesApi;
