"use client";
// pages/checkout.js
import React, { useState } from "react";

const Checkout = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 50,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 70,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleQuantityChange = (id: any, value: any) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Checkout Header */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Checkout</h1>
        <p className="text-xl mt-4">Review your cart and proceed to payment</p>
      </header>

      {/* Cart Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 shadow-lg rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-semibold">${item.price}</p>
                <div className="flex items-center mt-4">
                  <label className="mr-4 font-semibold">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg"
                  />
                </div>
                <p className="mt-4 font-semibold">
                  Total: ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Summary and Proceed to Payment */}
        {cart.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold">
              Order Total: ${calculateTotal()}
            </h3>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Proceed to Payment
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Checkout;
