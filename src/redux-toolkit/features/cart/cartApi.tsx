import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  color: string;
  quantity: number;
  price: number;
  total: number;
}

interface CartResponse {
  cartId: string;
  userId: string;
  totalProducts: number;
  totalQuantity: number;
  totalAmount: number;
  items: CartItem[];
}

interface AddItemRequest {
  userId: string;
  productId: string;
  color: string;
  quantity: number;
}

interface UpdateCartItemRequest {
  cartItemId: string;
  quantity?: number;
  color?: string;
}

 const cartApi = createApi({
   reducerPath: 'cartApi',
   baseQuery: fetchBaseQuery({
     baseUrl: 'https://backend-house.vercel.app',
     credentials: 'include',
   }),
   tagTypes: ['Cart'],
   endpoints: builder => ({
     getCart: builder.query<CartResponse, string>({
       query: userId => `/cart/get/${userId}`,
       providesTags: ['Cart'],
     }),
     addItemToCart: builder.mutation<CartResponse, AddItemRequest>({
       query: item => ({
         url: '/cart/add',
         method: 'POST',
         body: item,
       }),
       invalidatesTags: ['Cart'],
     }),
     updateCartItem: builder.mutation<CartResponse, UpdateCartItemRequest>({
       query: ({cartItemId, ...data}) => ({
         url: `/cart/update/${cartItemId}`,
         method: 'PUT',
         body: data,
       }),
       invalidatesTags: ['Cart'],
     }),
     deleteCartItem: builder.mutation<CartResponse, string>({
       query: cartItemId => ({
         url: `/cart/delete/${cartItemId}`,
         method: 'DELETE',
       }),
       invalidatesTags: ['Cart'],
     }),
   }),
 });

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;

export default cartApi;
