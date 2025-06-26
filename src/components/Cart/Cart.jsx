import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some perfumes to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaMinus className="text-gray-600" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaPlus className="text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">Total:</p>
          <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
        </div>
        <button
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => {
            // Handle checkout logic here
            alert('Checkout functionality will be implemented soon!');
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; 