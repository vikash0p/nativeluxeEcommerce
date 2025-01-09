import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Address, AddressResponse} from '../../../utils/types/addressTypes';

// Define the API slice
const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app/address',
    credentials: 'include',
  }),
  tagTypes: ['Address'],
  endpoints: builder => ({
    // Add a new address
    addAddress: builder.mutation<AddressResponse, Omit<AddressResponse, '_id'>>(
      {
        query: newAddress => ({
          url: '/',
          method: 'POST',
          body: newAddress,
        }),
        invalidatesTags: ['Address'], // Invalidate to trigger refetch
      },
    ),

    // Get all addresses for a user
    getAddressesByUser: builder.query<Address[], string>({
      query: userId => `/${userId}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({_id}) => ({type: 'Address' as const, id: _id})),
              {type: 'Address' as const},
            ]
          : [{type: 'Address' as const}],
    }),

    // Update an address by its ID
    updateAddress: builder.mutation<
      Address,
      {addressId: string; updatedData: Partial<Address>}
    >({
      query: ({addressId, updatedData}) => ({
        url: `/${addressId}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, {addressId}) => [
        {type: 'Address', id: addressId},
        {type: 'Address'},
      ], // Invalidate the specific address and trigger refetch
    }),

    // Delete an address by its ID
    deleteAddress: builder.mutation<void, string>({
      query: addressId => ({
        url: `/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, addressId) => [
        {type: 'Address', id: addressId},
        {type: 'Address'},
      ], // Invalidate the specific address and trigger refetch
    }),

    // Get a single address by its ID
    getSingleAddress: builder.query<Address, string>({
      query: addressId => `/single/${addressId}`,
      providesTags: (result, error, addressId) => [
        {type: 'Address', id: addressId},
      ], // Cache the specific address
    }),

    // Mark an address as chosen
    chooseAddress: builder.mutation<Address, string>({
      query: addressId => ({
        url: `/choose/${addressId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, addressId) => [
        {type: 'Address', id: addressId},
        {type: 'Address'},
      ], // Invalidate the specific address and trigger refetch
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressesByUserQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useGetSingleAddressQuery,
  useChooseAddressMutation,
} = addressApi;

export default addressApi;
