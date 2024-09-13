import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Discover the Best Products
          </h1>
          <p className="text-xl mb-6">
            Amazing deals on the latest products and collections
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-lg hover:bg-gray-200">
            Shop Now
          </button>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Category 1"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Category 1</h3>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Category 2"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Category 2</h3>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Category 3"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Category 3</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Best Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 1"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Product 1</h3>
              <p className="text-blue-600 font-semibold">$50</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 2"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Product 2</h3>
              <p className="text-blue-600 font-semibold">$70</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 3"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Product 3</h3>
              <p className="text-blue-600 font-semibold">$30</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="italic mb-4">
                "Amazing products! Will definitely shop again!"
              </p>
              <p className="font-semibold">- Customer 1</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="italic mb-4">
                "Fast shipping and great customer service!"
              </p>
              <p className="font-semibold">- Customer 2</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="italic mb-4">
                "Highly recommend this store for quality products."
              </p>
              <p className="font-semibold">- Customer 3</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
