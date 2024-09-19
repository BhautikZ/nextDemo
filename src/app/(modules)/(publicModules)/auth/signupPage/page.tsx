"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Select from "react-select";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/services/authService";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { signupValidationSchema } from "../../../../../utils/validation/signUpValidation";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

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

const skillOptions = [
  { value: 1, label: "JavaScript" },
  { value: 2, label: "React" },
  { value: 3, label: "Node.js" },
  { value: 4, label: "TypeScript" },
  { value: 5, label: "CSS" },
];

const Signup = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const { loading } = useSelector((state: any) => state.root.signIn);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    skills: [],
    terms: false,
    images: [],
  };

  const onSubmit = async (
    values: SignupFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    const skillValues = values?.skills?.map((skill) => skill.value);

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("gender", values.gender);
    formData.append("terms", values.terms.toString());
    formData.append("skills", JSON.stringify(skillValues));

    values.images.forEach((image) => {
      formData.append("profile_image", image);
    });

    try {
      const response = await dispatch(signInUser(formData)).unwrap();
      console.log("Success:", response);
      router.push("/auth/loginPage");
    } catch (error) {
      console.error("Error:", error);
    }

    resetForm();
    setPreviews([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 max-h-screen overflow-y-auto relative">
        <button
          onClick={() => router.push("/auth/loginPage")}
          className="absolute top-4 left-4 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back to Login
        </button>

        <h1 className="text-2xl font-bold text-center mb-8 mt-10">
          Formik Sign Up
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
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
                      <Field
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
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
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Skills
                  </label>
                  <Field name="skills">
                    {({ field, form }: any) => (
                      <Select
                        isMulti
                        options={skillOptions}
                        value={field.value}
                        onChange={(selectedOptions: any) =>
                          form.setFieldValue("skills", selectedOptions)
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="skills"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="images"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Images (Multi Images)
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      onChange={(event) => {
                        const files = event.target.files;
                        if (files) {
                          const newImages: File[] = Array.from(files);
                          setFieldValue("images", newImages);
                          const newPreviews = newImages.map((file) =>
                            URL.createObjectURL(file)
                          );
                          setPreviews(newPreviews);
                        }
                      }}
                      className="absolute left-0 top-0 opacity-0 h-full w-full cursor-pointer"
                    />
                    <div className="flex items-center justify-center py-3 px-6 border border-dashed border-gray-300 rounded-md text-gray-500">
                      <AiOutlineCloudUpload className="w-6 h-6 mr-2" />
                      <span>Upload Images</span>
                    </div>
                  </div>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  {previews.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={preview}
                            alt={`Profile Preview ${index}`}
                            width={100}
                            height={100}
                            className="object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = previews.filter(
                                (_, i) => i !== index
                              );
                              setPreviews(newPreviews);
                              const newImages = values.images.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("images", newImages);
                            }}
                            className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I accept the terms and conditions
                </label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading ? <Spinner /> : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withAuthPublic(Signup);
