import Link from "next/link";
import React from "react";

function UserHeader() {
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            <a href="/">YourStore</a>
          </div>

          <div className="flex-1 mx-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <nav className="hidden lg:flex space-x-6">
            <Link href="/home" className="text-gray-600 hover:text-indigo-500">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-indigo-500">
              Shop
            </Link>
            <a href="#" className="text-gray-600 hover:text-indigo-500">
              Deals
            </a>
            <Link
              href="/contact-us"
              className="text-gray-600 hover:text-indigo-500"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="/cart" className="text-gray-600 hover:text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19l-2 8H7z"
                />
              </svg>
            </a>
            <a href="/account" className="text-gray-600 hover:text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A8.002 8.002 0 0112 16a8.002 8.002 0 016.879 1.804M12 14a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserHeader;
