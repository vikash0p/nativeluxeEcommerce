import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ReviewResponse} from '../../types'

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://backend-house.vercel.app'}), // Adjust the base URL as needed
  tagTypes: ['Review'],
  endpoints: builder => ({
    // Fetch all reviews
    getAllReviews: builder.query({
      query: () => '/reviews',
      providesTags: ['Review'],
    }),
    // Fetch a review by ID
    getReviewById: builder.query({
      query: id => `/reviews/${id}`,
      providesTags: (result, error, id) => [{type: 'Review', id}],
    }),
    // Fetch reviews by Product ID
    getReviewsByProductId: builder.query<ReviewResponse, string>({
      query: productId => `/reviews/product/${productId}`,
      providesTags: (result, error, productId) => [{type: 'Review', productId}],
    }),
    // Create a review
    createReview: builder.mutation({
      query: newReview => ({
        url: '/reviews',
        method: 'POST',
        body: newReview,
      }),
      invalidatesTags: ['Review'],
    }),
    // Update a review
    updateReview: builder.mutation({
      query: ({id, updatedData}) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, {id}) => [{type: 'Review', id}],
    }),
    // Delete a review
    deleteReview: builder.mutation({
      query: id => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{type: 'Review', id}],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useGetReviewsByProductIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;
