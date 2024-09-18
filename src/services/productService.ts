import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface EditProductPayload {
  id: string;
  formData: FormData;
}

// Thunk to fetch users with pagination and search query
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      page,
      searchQuery,
      token,
      sortorder,
      sortcoloum,
    }: {
      page: number;
      searchQuery: string;
      token: string;
      sortorder: string;
      sortcoloum: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/product/products?page=${page}&search=${searchQuery}&sortBy=${sortcoloum}&sortOrder=${sortorder}`,
        token,
      });
      console.log(response, "response");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch users with Filter
export const fetchUsersProducts = createAsyncThunk(
  "product/fetchUsersProducts",
  async (
    {
      category,
      minPrice,
      maxPrice,
      token,
    }: { category: string; minPrice: number; maxPrice: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/product/userProducts?categories=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        token,
      });
      console.log(response, "response");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const addProducts = createAsyncThunk(
  "auth/addProduct",
  async (formData: FormData, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const User = state.root.signIn;
    const SocialUserToken = User?.socialLoginUserData?.token;
    const UserToken = User?.loginData?.token;
    const token: string = SocialUserToken || UserToken;
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/product/products",
        contentType: "multipart/form-data", // Ensure content type is set for FormData
        token,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const EditProducts = createAsyncThunk(
  "auth/editProduct", // Updated action type
  async (payload: EditProductPayload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const User = state.root.signIn;
    const SocialUserToken = User?.socialLoginUserData?.token;
    const UserToken = User?.loginData?.token;
    const token: string = SocialUserToken || UserToken;
    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: payload.formData,
        url: `/product/products/${payload.id}`,
        contentType: "multipart/form-data",
        token,
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "auth/getSingleProduct",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/product/products/${id}`,
        contentType: "application/json",
        token,
      });
      console.log(response.data.data, "34");
      return response.data.data;
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteProductHandler = createAsyncThunk(
  "auth/deleteProduct",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/product/products/${id}`,
        contentType: "application/json",
        token,
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

//create payment order api
export const createPayment = createAsyncThunk(
  "product/payments",
  async ({ data }: { data: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/payment/createpayment`,
        contentType: "application/json",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);
