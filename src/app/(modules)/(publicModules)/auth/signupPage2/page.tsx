"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { signInUser } from "@/services/authService";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "../../../../../utils/validation/signUpValidation";
import { AppDispatch } from "@/redux/store";

const skillOptions = [
  { value: 1, label: "JavaScript" },
  { value: 2, label: "React" },
  { value: 3, label: "Node.js" },
  { value: 4, label: "TypeScript" },
  { value: 5, label: "CSS" },
];

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  skills: { label: string; value: string }[];
  terms: boolean;
  images: File[];
}

const Signup2 = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      skills: [],
      terms: false,
      images: [],
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Create a FormData object
    const formData = new FormData();
    const skillValues = data?.skills?.map((skill) => skill.value);

    // Append each field to FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    // formData.append("confirmPassword", values.confirmPassword);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("gender", data.gender);
    formData.append("terms", data.terms.toString()); // Convert boolean to string

    // Append skills as a comma-separated string if needed
    formData.append("skills", JSON.stringify(skillValues));

    // Append images
    data.images.forEach((image) => {
      formData.append("profile_image", image);
    });

    try {
      const response = await dispatch(signInUser(formData)).unwrap();
      // Handle success
      console.log("Success:", response);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }

    // Reset form and previews
    reset();
    setPreviews([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 max-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-center mb-6 mt-[27px]">
          React Hook Form Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  id="password"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input
                  type="password"
                  id="confirmPassword"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="phoneNumber"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </div>
            )}
          </div>

          {/* Gender Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-2 space-y-2">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        value="male"
                        checked={field.value === "male"}
                        onChange={() => field.onChange("male")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        value="female"
                        checked={field.value === "female"}
                        onChange={() => field.onChange("female")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                )}
              />
            </div>
            {errors.gender && (
              <div className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </div>
            )}
          </div>

          {/* Skills Multi-Select */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skills
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={skillOptions}
                  value={field.value}
                  onChange={(selectedOptions: any) => {
                    console.log("dqdqd");
                    setValue("skills", selectedOptions, {
                      shouldValidate: true,
                    });
                    clearErrors("skills");
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.skills && (
              <div className="text-red-500 text-sm mt-1">
                {errors.skills.message}
              </div>
            )}
          </div>

          {/* Multiple Images Upload with Previews */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Images (Multi Images)
            </label>
            <div className="relative">
              <input
                type="file"
                id="images"
                accept="image/jpeg, image/png, image/jpg"
                multiple
                onChange={(event) => {
                  if (event.target.files) {
                    const files = Array.from(event.target.files);
                    setValue("images", files);
                    setPreviews(files.map((file) => URL.createObjectURL(file)));
                    clearErrors("images");
                  }
                }}
                className="sr-only" // Hide the actual input element
              />
              <button
                type="button"
                onClick={() => document.getElementById("images")?.click()}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <AiOutlineCloudUpload className="text-gray-500 w-6 h-6" />
              </button>
              <div className="mt-2 flex flex-wrap gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <Image
                      src={preview}
                      alt={`Preview ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedPreviews = previews.filter(
                          (_, i) => i !== index
                        );
                        setPreviews(updatedPreviews);
                        setValue(
                          "images",
                          (watch("images") || []).filter((_, i) => i !== index),
                          { shouldValidate: true }
                        );
                      }}
                      className="absolute top-1 right-1 text-sm text-red-600 hover:text-red-700"
                    >
                      <AiOutlineClose className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {errors.images && (
              <div className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </div>
            )}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div>
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    type="checkbox"
                    id="terms"
                    // Remove value attribute
                    checked={field.value} // Use checked to reflect current value
                    onChange={(e) => field.onChange(e.target.checked)} // Handle change correctly
                    onBlur={field.onBlur} // Handle blur event
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I accept the terms and conditions
                  </label>
                </div>
              )}
            />
            {errors.terms && (
              <div className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthPublic(Signup2);
