// Define the interface for the product's dimension
interface Dimension {
  length: string;
  width: string;
  height: string;
}

// Define the interface for the product
export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  about: string;
  category: string;
  image: string;
  origin: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  quantity: number;
  material: string;
  color: string[];
  stock: number;
  rating: number;
  brand: string;
  weight: number;
  location: string[];
  dimension: Dimension;
}

// Define the interface for the response
export interface ProductResponse {
  success: boolean;
  message: string;
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  products: Product[];
}

export interface ProductQueryParams {
  page?: number;              // Pagination: Current page number
  limit?: number;             // Pagination: Number of items per page
  sortBy?: string;            // Sorting: Field to sort by (e.g., price, rating)
  sortOrder?: 'asc' | 'desc'; // Sorting order: ascending or descending
  search?: string;            // Text search query
  minPrice?: number;          // Price filter: Minimum price
  maxPrice?: number;          // Price filter: Maximum price
  minRating?: number;         // Rating filter: Minimum rating
  maxRating?: number;         // Rating filter: Maximum rating
  discount?: number;          // Discount filter: Minimum discount percentage
  inStock?: boolean;          // Filter for availability
  category?: string | string[];  // Category filter: Single or multiple categories
  brand?: string| string[];              // Brand filter: Array of brand names
  material?: string | string[];           // Material filter: Array of material types
  color?: string| string[];              // Color filter: Array of colors
  location?:string | string[];           // Location filter: Array of location names
  isNewArrival?: boolean;        // Filter for new arrivals
  isFeatured?: boolean;          // Filter for featured products
  tags?: string[];               // Tags for additional categorization
  customAttributes?: {
    [key: string]: string | string[]; // Custom attributes for advanced filtering
  };
}

export interface UserProps {
  name: string;
  email: string;
  _id: string;
  phone: number;
}




export interface ReviewResponse {
  success: boolean;
  averageRating: string;
  message: string;
  reviews: Review[];
}

export interface Review {
  _id: string;
  userId: User;
  productId: Product;
  comment: string;
  rating: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Product {
  _id: string;
  title: string;
  category: string;
}
