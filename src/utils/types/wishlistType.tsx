export interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  color: string;
  addedAt: string; // ISO 8601 date string
}

export interface WishlistResponse {
  userId: string;
  items: WishlistItem[];
}
