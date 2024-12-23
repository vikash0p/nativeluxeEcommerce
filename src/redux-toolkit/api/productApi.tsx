// src/features/api/productApi.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define types for the product and API response
interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  material: string;
  color: string;
  finalPrice: number;
  rating: number;
  discount: number;
  location?: string;
  [key: string]: any; // To allow for additional dynamic fields
}

interface ProductResponse {
  success: boolean;
  message: string;
  products?: Product[];
  product?: Product;
  totalProducts?: number;
  totalPages?: number;
  currentPage?: number;
  error?: string;
}

// Define filters for the query
interface ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  discount?: number;
  location?: string | string[];
  filters?: Record<string, string[]>;
}

// Create the product API
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-house.vercel.app/furniture',
    credentials: 'include',
  }),
  endpoints: builder => ({
    // Fetch all products with filters
    getProducts: builder.query<ProductResponse, ProductFilters>({
      query: ({
        page = 1,
        limit = 12,
        sortBy,
        search,
        minPrice,
        maxPrice,
        minRating,
        discount,
        location,
        filters,
      } = {}) => {
        const params = new URLSearchParams();

        // Add filters to the query
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (sortBy) {
          params.append('sortBy', sortBy);
        }
        if (search) {
          params.append('search', search);
        }
        if (minPrice) {
          params.append('minPrice', minPrice.toString());
        }
        if (maxPrice) {
          params.append('maxPrice', maxPrice.toString());
        }
        if (minRating) {
          params.append('minRating', minRating.toString());
        }
        if (discount) {
          params.append('discount', discount.toString());
        }
        if (location) {
          if (Array.isArray(location)) {
            location.forEach(loc => params.append('location', loc));
          } else {
            params.append('location', location);
          }
        }

        // Array-based filters
        if (filters) {
          Object.keys(filters).forEach(key => {
            filters[key].forEach(value => params.append(key, value));
          });
        }

        return {
          url: `/products?${params.toString()}`,
          method: 'GET',
        };
      },
    }),

    // Fetch a single product by ID
    getSingleProduct: builder.query<ProductResponse, string>({
      query: id => ({
        url: `/product/${id}`,
        method: 'GET',
      }),
    }),

    // Create a new product
    createProduct: builder.mutation<ProductResponse, Partial<Product>>({
      query: productData => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
    }),

    // Update a product by ID
    updateProduct: builder.mutation<
      ProductResponse,
      {id: string; updatedData: Partial<Product>}
    >({
      query: ({id, updatedData}) => ({
        url: `/product/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation<ProductResponse, string>({
      query: id => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
