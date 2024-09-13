"use client";
import { AppDispatch } from "@/redux/store";
import { GetAllCategories } from "@/services/categoryService";
import { fetchUsersProducts } from "@/services/productService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

// Define types for product
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

function UserDashboard() {
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
      .map((cat) => cat.value)
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
    <div className="flex flex-col min-h-screen h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Products Dashboard</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Filter by Category
          </label>
          <Select
            isMulti
            value={selectedCategories}
            onChange={handleCategoryChange}
            options={categories}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select categories"
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Filter by Price Range
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              max="10000"
              className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          {/* Price Range Slider */}
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>${minPrice}</span>
              <span>${maxPrice === 10000 ? "10000+" : maxPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProductsList?.products?.length > 0 ? (
            userProductsList?.products?.map((product: any) => (
              <div
                key={product?._id}
                className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.image[0]}`}
                  alt={product?.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product?.name}
                </h3>
                <p className="text-gray-600">
                  Category: {product?.category?.name}
                </p>
                <p className="text-gray-800 font-bold">${product?.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-600">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
