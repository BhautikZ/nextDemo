"use client";
// pages/shop.js
import { useRouter } from "next/navigation";
import React from "react";

const Shop = () => {
  const router = useRouter();
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$50",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$70",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$30",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$90",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$40",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Shop Our Collection</h1>
        <p className="text-xl mt-4">Explore our range of quality products</p>
      </header>

      {/* Product Grid */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-semibold">{product.price}</p>
              <button
                onClick={() => router.push("/check-out")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
