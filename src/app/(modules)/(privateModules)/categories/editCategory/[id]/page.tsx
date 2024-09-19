"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import {
  EditCategoryHandler,
  getSingleCategory,
} from "@/services/categoryService";
import { categoryValidationSchema } from "@/utils/validation/categoryValidation";

interface CategoryFormValues {
  name: string;
  description: string;
  isActive: string;
}

const EditCategory = () => {
  const { singleCategory } = useSelector((state: any) => state.root.categories);
  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { id }: any = useParams();

  useEffect(() => {
    dispatch(getSingleCategory({ id, token: Token }));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleCategory) {
      setInitialValues({
        name: singleCategory?.name || "",
        description: singleCategory?.description || "",
        isActive: singleCategory?.isActive ? "true" : "false",
      });
    }
  }, [singleCategory]);

  const [initialValues, setInitialValues] = useState<CategoryFormValues>({
    name: "",
    description: "",
    isActive: "true",
  });

  const onSubmit = async (
    values: CategoryFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = {
      name: values.name,
      description: values.description,
      isActive: values.isActive === "true",
    };

    try {
      console.log(values, "values");
      await dispatch(EditCategoryHandler({ id, formData })).unwrap();
      router.push("/categories");
    } catch (error) {
      console.error("Error:", error);
    }

    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Category</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={categoryValidationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Active/Inactive Dropdown */}
                <div>
                  <label
                    htmlFor="isActive"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <Field
                    as="select"
                    id="isActive"
                    name="isActive"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </Field>
                  <ErrorMessage
                    name="isActive"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Category
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/categories")}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCategory;
