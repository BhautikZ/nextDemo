"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { forgotPasswordHandler } from "@/services/authService";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .trim("No leading or trailing spaces allowed")
    .strict(true),
});

function ForgotPassword() {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    console.log(data, "ForgotPassword Data");
    try {
      await dispatch(forgotPasswordHandler(data));
    } catch (error) {
      // Handle error
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6 animate-fade-in">
        Forgot Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          Send Reset Link
        </button>
        <div className="text-sm text-center mt-4">
          <Link href="/auth/loginPage">
            <p className="text-blue-600 font-semibold hover:underline">
              Back to Login
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default withAuthPublic(ForgotPassword);
