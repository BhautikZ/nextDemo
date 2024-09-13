import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface EditCategoryPayload {
  id: string;
  formData: Object;
}

// Thunk to fetch Category for Product
export const GetAllCategories = createAsyncThunk(
  "product/getCategories",
  async ({ token }: { token: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/category/getcategory`,
        token,
      });
      console.log(response, "response");
      return response.data.data.categories;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const AddCategoryHandler = createAsyncThunk(
  "auth/addCategory",
  async (formData: Object, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const User = state.root.signIn;
    const SocialUserToken = User?.socialLoginUserData?.token;
    const UserToken = User?.loginData?.token;
    const token: string = SocialUserToken || UserToken;
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/category/addcategory",
        contentType: "application/json",
        token,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Thunk to fetch users with pagination and search query
export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async (
    {
      page,
      searchQuery,
      token,
      sortcoloum,
      sortorder,
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
        url: `/category/getcategory?page=${page}&search=${searchQuery}&sortBy=${sortcoloum}&sortOrder=${sortorder}`,
        token,
      });
      console.log(response, "response");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleCategory = createAsyncThunk(
  "auth/getSingleCategory",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/category/getcategory/${id}`,
        contentType: "application/json",
        token,
      });
      console.log(response.data.data, "34");
      return response.data.data.category;
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

export const EditCategoryHandler = createAsyncThunk(
  "auth/editCategory",
  async (payload: EditCategoryPayload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const User = state.root.signIn;
    const SocialUserToken = User?.socialLoginUserData?.token;
    const UserToken = User?.loginData?.token;
    const token: string = SocialUserToken || UserToken;

    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: payload.formData,
        url: `/category/updatecategory/${payload.id}`,
        contentType: "application/json",
        token,
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCategoryHandler = createAsyncThunk(
  "auth/deleteCategory",
  async ({ id, token }: { id: string; token: string }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/category/deletecategory/${id}`,
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
