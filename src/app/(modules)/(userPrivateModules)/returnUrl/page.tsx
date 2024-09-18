"use client";
import { capturePayment } from "@/services/authService";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function ReturnUrl() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const search = searchParams.get("token");
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push("/");
  };

  useEffect(() => {
    dispatch(capturePayment(search));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="green"
          className="w-16 h-16 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m0 9a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-3xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We’ve received your payment, and your
          order is now being processed.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Payment Details</h3>
          <div className="text-left">
            <div className="flex justify-between mb-2">
              <span>Order Number:</span>
              <span>#123456789</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Payment Method:</span>
              <span>Credit Card</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Paid:</span>
              <span>$45.00</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>Sep 18, 2024</span>
            </div>
          </div>
        </div>

        {/* Redirect Button */}
        <button
          onClick={handleHomeRedirect}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-medium w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ReturnUrl;
