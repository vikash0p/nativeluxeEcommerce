export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  total: number;
  color: string;
  availableColors : string[];
  image: string;
  productId: string;
}

export interface CartData {
  cartId: string;
  items: CartItem[];
  totalAmount: number;
  totalProducts: number;
  totalQuantity: number;
  userId: string;
}
