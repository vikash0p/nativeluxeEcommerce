import {Product} from './productTypes';
import {Address} from './addressTypes'
export interface OrderResponse {
  message: string;
  order: Order;
}
export interface Order {
  userId: string;
  items: Item[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Item {
  productId: Product;
  color: string;
  quantity: number;
  price: number;
  _id: string;
}



// ------------------------------------------------------------------------------




export interface getUserOrdersResponse {
  orders: OrderDetails[];
}

// ------------------------------------------------------------------------------



export interface GetOrderByIdResponse {
  order: OrderDetails;
}

export interface OrderDetails {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderItem {
  productId: Product;
  color: string;
  quantity: number;
  price: number;
  _id: string;
}








