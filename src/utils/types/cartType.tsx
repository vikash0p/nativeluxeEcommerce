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
  originalPrice: number;
  discount: number;
}

export interface CartData {
  cartId: string;
  items: CartItem[];
  totalAmount: number;
  totalProducts: number;
  totalQuantity: number;
  userId: string;
  totalOriginalPrice: number;
  discountPrice: number;
}
