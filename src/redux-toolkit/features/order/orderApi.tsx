import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define types for the Order, CartItem, and Address
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string; // Can be Address object if populated
  paymentMethod: string;
  createdAt: string;
}

export interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Define API slice
export const orderApi = createApi({
  reducerPath: 'orderApi', // A unique key for this API slice in the store
  baseQuery: fetchBaseQuery({baseUrl: '/api/orders'}), // Adjust the base URL as needed
  tagTypes: ['Orders', 'Order'], // Tags for cache invalidation
  endpoints: builder => ({
    // Place an order
    placeOrder: builder.mutation<
      Order,
      {userId: string; shippingAddressId: string; paymentMethod: string}
    >({
      query: body => ({
        url: '/place',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'], // Invalidate cache for Orders after placing a new one
    }),

    // Get all orders for a user
    getUserOrders: builder.query<Order[], string>({
      query: userId => `/user/${userId}`,
      providesTags: ['Orders'], // Cache the result with the 'Orders' tag
    }),

    // Get a single order by ID
    getOrderById: builder.query<Order, string>({
      query: orderId => `/${orderId}`,
      providesTags: (result, error, id) => [{type: 'Order', id}], // Cache per order
    }),
  }),
});

// Export hooks for components to use
export const {
  usePlaceOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
