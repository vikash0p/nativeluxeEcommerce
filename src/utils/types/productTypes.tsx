export interface Product {
  _id: string;
  title: string;
  description: string;
  finalPrice: number;
  rating: number;
  category: string;
  brand: string;
  image?: string;
}
