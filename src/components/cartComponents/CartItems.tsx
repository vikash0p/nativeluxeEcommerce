// CartItems.js
import React from 'react';
import {ScrollView} from 'react-native';
import {CartData} from '../../utils/types/cartType';
import {CartItem} from '../../utils/types/cartType';
import CartCard from './CartCard';
import OrderSummary from './OrderSummary';

const CartItems = ({items,cartData}: {  items: CartItem[];  cartData: CartData}) => {
  return (
    <ScrollView>
      {items.map(item => (
        <CartCard item={item} key={item.id} />
      ))}
      <OrderSummary cartData={cartData} />
    </ScrollView>
  );
};

export default CartItems;
