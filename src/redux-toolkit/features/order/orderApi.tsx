import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  OrderResponse,
  GetOrderByIdResponse,
  getUserOrdersResponse,
} from '../../../utils/types/OrderTypes';
import cartApi from '../cart/cartApi';

// Define API slice
const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app/order',
    credentials: 'include',
  }),
  tagTypes: ['Orders', 'Order', 'Cart'],
  endpoints: builder => ({
    // Place an order
    placeOrder: builder.mutation<
      OrderResponse,
      {userId: string; shippingAddressId: string; paymentMethod: string}
    >({
      query: body => ({
        url: '/place',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, {dispatch, queryFulfilled}) {
        try {
          // Await the order placement request
          await queryFulfilled;

          // Invalidate the Cart tag to trigger a refetch
          dispatch(cartApi.util.invalidateTags(['Cart']));
        } catch (error) {
          console.error('Error placing order:', error);
        }
      },
      invalidatesTags: ['Orders'], // Only invalidates Orders
    }),

    // Get all orders for a user
    getUserOrders: builder.query<getUserOrdersResponse, string>({
      query: userId => `/user/${userId}`,
      providesTags: ['Orders'],
    }),

    // Get a single order by ID
    getOrderById: builder.query<GetOrderByIdResponse, string>({
      query: orderId => `/${orderId}`,
      providesTags: (result, error, id) => [{type: 'Order', id}],
    }),
  }),
});

// Export hooks for components to use
export const {
  usePlaceOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;

export default orderApi;
