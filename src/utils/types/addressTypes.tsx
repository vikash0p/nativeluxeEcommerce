interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
}

export interface Address {
  _id: string;
  userId: User;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  mobile: number;
  __v: number;
}



export interface AddressResponse {
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string; // Could use a union type like 'Billing' | 'Shipping' for stricter typing
  name: string;
  mobile: string;
}

