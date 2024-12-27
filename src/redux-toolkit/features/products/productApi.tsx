import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ProductResponse, ProductQueryParams} from '../../types';

// Helper function to flatten array values into query parameters
const buildQueryString = (params: ProductQueryParams) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    } // Skip undefined parameters
    if (Array.isArray(value)) {
      // Append multiple values for array keys
      value.forEach(val => queryParams.append(`${key}[]`, String(val)));
    } else {
      queryParams.append(key, String(value));
    }
  });

  return queryParams.toString();
};

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app',
    credentials: 'include',
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<ProductResponse, ProductQueryParams>({
      query: params => {
        const queryString = buildQueryString(params);
        return {
          url: `/furniture/products${queryString ? `?${queryString}` : ''}`,
        };
      },
      providesTags: ['Product'],
    }),

    addProduct: builder.mutation({
      query: newProduct => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: updatedProduct => ({
        url: `/products/${updatedProduct.id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
} = productApi;
export default productApi;
