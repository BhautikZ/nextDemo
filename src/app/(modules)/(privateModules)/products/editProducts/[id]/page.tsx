"use client";

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Select from "react-select";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { EditProducts, getSingleProduct } from "@/services/productService";
import { AppDispatch } from "@/redux/store";
import { productValidationSchema } from "@/utils/validation/productValidation";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { GetAllCategories } from "@/services/categoryService";

interface ProductsFormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  images: File[];
}

const EditProduct = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const { singleProduct } = useSelector((state: any) => state.root.products);
  const GetAllCategory = useSelector((state: any) => state.root.categories);
  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;

  const productCategoryOptions = GetAllCategory.categories.map(
    (category: any) => ({
      value: category._id,
      label: category.name,
    })
  );

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { id }: any = useParams();

  useEffect(() => {
    dispatch(getSingleProduct({ id, token: Token }));
    dispatch(GetAllCategories({ token: Token }));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct) {
      setInitialValues({
        name: singleProduct?.product?.name || "",
        description: singleProduct?.product?.description || "",
        price: singleProduct?.product?.price.toString() || "",
        category: singleProduct?.product?.category
          ? singleProduct?.product?.category?._id
          : "",
        stock: singleProduct?.product?.stock?.toString() || "",
        images: singleProduct?.product?.image,
      });

      // Set previews for existing images
      setPreviews(
        singleProduct.product.image.map(
          (img: string) => `${process.env.NEXT_PUBLIC_BASE_URL}${img}`
        )
      );
    }
  }, [singleProduct]);

  const [initialValues, setInitialValues] = useState<ProductsFormValues>({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  console.log(previews, "previews");

  const onSubmit = async (
    values: ProductsFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);

    values.images.forEach((image) => {
      formData.append("image", image);
    });

    try {
      console.log(values, "values");
      await dispatch(EditProducts({ id, formData })).unwrap();
      router.push("/products");
    } catch (error) {
      console.error("Error:", error);
    }

    resetForm();
    setPreviews([]);
  };

  const handleRemoveImage = (
    index: number,
    setFieldValue: (field: string, value: any) => void,
    values: ProductsFormValues
  ) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFieldValue(
      "images",
      values.images.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 overflow-hidden">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Product</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={onSubmit}
          encType="multipart/form-data"
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
                    Product Name
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

                {/* Price Field */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Stock Field */}
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <Field
                    type="number"
                    id="stock"
                    name="stock"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Category Field */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <Field name="category">
                    {({ field }: any) => (
                      console.log(field.value, "form value"),
                      (
                        <Select
                          id="category"
                          options={productCategoryOptions}
                          value={productCategoryOptions.find(
                            (option: any) => option.value === field.value
                          )}
                          onChange={(selectedOption: any) => {
                            setFieldValue(
                              "category",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                          className="basic-single"
                          classNamePrefix="select"
                        />
                      )
                    )}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Multiple Images Upload with Previews */}
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/jpeg, image/png, image/jpg"
                    multiple
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        const files = Array.from(event.currentTarget.files);
                        setFieldValue("images", files);
                        setPreviews(
                          files.map((file) => URL.createObjectURL(file))
                        );
                      }
                    }}
                    className="sr-only"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("images")?.click()}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <AiOutlineCloudUpload className="text-gray-500 w-6 h-6" />
                  </button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previews.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {previews.map((preview, index) => (
                          <div key={preview} className="relative w-32 h-32">
                            <Image
                              src={preview}
                              alt={`Preview ${index}`}
                              layout="fill"
                              objectFit="cover"
                              className="border border-gray-300 rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveImage(index, setFieldValue, values)
                              }
                              className="absolute top-1 right-1 text-sm text-red-600 hover:text-red-700"
                            >
                              <AiOutlineClose className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/products")}
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

export default EditProduct;
