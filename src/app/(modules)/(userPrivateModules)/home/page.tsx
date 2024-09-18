"use client";
import { AppDispatch } from "@/redux/store";
import { GetAllCategories } from "@/services/categoryService";
import { fetchUsersProducts } from "@/services/productService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
  const { userProductsList } = useSelector((state: any) => state.root.products);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const dispatch: AppDispatch = useDispatch();
  const GetAllCategory = useSelector((state: any) => state.root.categories);
  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;

  const categories = GetAllCategory?.categories?.map((category: any) => ({
    value: category._id,
    label: category.name,
  }));

  useEffect(() => {
    dispatch(GetAllCategories({ token: Token }));
  }, [dispatch, Token]);

  useEffect(() => {
    const categoriesString = selectedCategories
      .map((cat: any) => cat.value)
      .join(",");
    dispatch(
      fetchUsersProducts({
        category: categoriesString,
        minPrice,
        maxPrice,
        token: Token,
      })
    );
  }, [selectedCategories, minPrice, maxPrice, dispatch, Token]);

  const handleCategoryChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions || []);
  };

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
            {GetAllCategory?.categories?.map((cat: any) => {
              return (
                <div
                  className="bg-white p-6 shadow-lg rounded-lg"
                  key={cat._id}
                >
                  <h3 className="text-xl font-semibold">{cat?.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Best Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userProductsList?.products?.length > 0 ? (
              userProductsList?.products?.map((product: any) => (
                <div
                  className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-between"
                  key={product?._id}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.image[0]}`}
                    alt={product?.name}
                    className="mb-4 w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold text-center">
                    {product?.name}
                  </h3>
                  <p className="text-gray-600">
                    Category: {product?.category?.name}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    ${product?.price}
                  </p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-600">
                No products found.
              </p>
            )}
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
