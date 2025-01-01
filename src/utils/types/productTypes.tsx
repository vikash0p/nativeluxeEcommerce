


export interface Dimension {
  length: string;
  width: string;
  height: string;
}

export interface Product {
  dimension: Dimension;
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
  views: number;
  sales: number;

}


export interface Review {
  _id: string;
  userId: string;
  productId: string;
  comment: string;
  rating: number;
  date: string; // ISO 8601 string format
  __v: number;
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  product: Product;
  review: Review[];
}

export interface ProductsParams {
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
  location?: string | string[];
}

export interface ProductResponse {
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
export interface ProductFilters {
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
