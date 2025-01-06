export interface SalesResponse {
  message: string;
  sales: {
    _id: string;
    productId: string;
    userId: string;
    salesCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export type TotalSalesResponse = {
  totalSales: number;
};

export type IncrementDecrementResetRequest = {
  productId: string;
  userId: string;
};


export interface UserSalesResponse {
  message: string;
  userSalesLength: number;
  totalSalesCount: number;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  userSales: Array<{
    _id: string;
    productId: {
      _id: string;
      title: string;
      category: string;
      image: string;
      finalPrice: number;
      quantity: number;
      material: string;
      color: string[];
      brand: string;
    };
    userId: string;
    salesCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
}







export interface SalesDataResponse {
  message: string;
  totalSales: number;
  productsBySales: Array<ProductSales>;
}

export interface ProductSales {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  origin: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  material: string;
  stock: number;
  brand: string;
  updatedAt: string;
  filteredSalesData: Array<Sale>;
  totalSales: number;
}

interface Sale {
  _id: string;
  productId: string;
  userId: string;
  salesCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
