import React from 'react';
import Cart from '../components/Cart/Cart';

const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage; 