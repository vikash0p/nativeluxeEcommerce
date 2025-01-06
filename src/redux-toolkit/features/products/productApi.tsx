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
    getNewArrivalProducts: builder.query({
      query: () => ({
        url: '/furniture/newArrivals',
      }),
      providesTags: ['Product'],
    }),
    getSingleProduct: builder.query({
      query: productId => ({
        url: `/furniture/products/${productId}`,
      }),
      providesTags: ['Product'],
    }),
    getProductsByFilter: builder.query<
      ProductResponse,
      {
        filterType: string;
        filterValue: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({filterType, filterValue, page = 1, limit = 12}) =>
        `furniture/products/${filterType}/${filterValue}?page=${page}&limit=${limit}`,
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query<
      ProductResponse,
      {category: string; page?: number; limit?: number}
    >({
      query: ({category, page = 1, limit = 12}) => ({
        url: `/furniture/category/${category}?page=${page}&limit=${limit}`,
      }),
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
    getTrendingProducts: builder.query({
      query: () => '/furniture/trending',
    }),
    incrementProductViews: builder.mutation({
      query: id => ({
        url: `/furniture/products/${id}/views`,
        method: 'PATCH',
      }),
    }),

    // Add more endpoints as needed
    getBestSellerProducts: builder.query({
      query: () => '/furniture/bestsellers',
    }),
    incrementProductSales: builder.mutation({
      query: id => ({
        url: `/furniture/products/${id}/sales`,
        method: 'PATCH',
      }),
    }),
    decrementProductSales: builder.mutation({
      query: id => ({
        url: `/furniture/products/${id}/decrement-sales`,
        method: 'PATCH',
      }),
    }),
    resetProductSales: builder.mutation({
      query: ({userId, productId}: {userId: string; productId: string}) => ({
        url: `/furniture/products/${userId}/${productId}/reset-sales`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByFilterQuery,
  useGetNewArrivalProductsQuery,
  useGetTrendingProductsQuery,
  useGetBestSellerProductsQuery,
  useIncrementProductViewsMutation,
  useIncrementProductSalesMutation,
  useDecrementProductSalesMutation,
  useResetProductSalesMutation,

} = productApi;
export default productApi;
