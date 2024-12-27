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
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  discount?: number;
  category?: string[];
  brand?: string[];
  material?: string[];
  color?: string[];
  location?: string[];
}

export interface UserProps {
  name: string;
  email: string;
  _id: string;
  phone: number;
}
