"use client";
import React from "react";
import { useSelector } from "react-redux";

function UserDashboard() {
  const { users } = useSelector((state: any) => state.root);
  console.log(users, "users");
  return (
    <div className="p-4 m-2 bg-white shadow-md rounded-lg bg-blue-500 text-white mt-[14px]">
      <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
      <p className="text-2xl font-bold text-gray-900">{users?.totalUsers}</p>
    </div>
  );
}

export default UserDashboard;
