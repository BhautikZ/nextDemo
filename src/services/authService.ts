import AxiosDefaultSetting from "@/AxiosSetting";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface EditProfilePayload {
  userID: string;
  formData: FormData;
}

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: formData,
        url: "/users/register",
        contentType: "multipart/form-data", // Ensure content type is set for FormData
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/signInUser",
  async (payload: EditProfilePayload, { rejectWithValue, getState }) => {
    const state = getState() as any;
    const User = state.root.signIn;
    const SocialUserToken = User?.socialLoginUserData?.token;
    const UserToken = User?.loginData?.token;
    const token: string = SocialUserToken || UserToken;
    try {
      const response = await AxiosDefaultSetting({
        method: "PUT",
        data: payload.formData,
        url: `/users/updateusers/${payload.userID}`,
        contentType: "multipart/form-data", // Ensure content type is set for FormData
        token,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/login",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      return response.data.data;
    } catch (error: any) {
      console.log(error, "error");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const SocialLoginUser = createAsyncThunk(
  "auth/SocialLoginUser",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/sociaLogin",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      return response.data.data;
    } catch (error: any) {
      console.log(error, "error");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const forgotPasswordHandler = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        data: data,
        url: "/auth/forgotPassword",
        contentType: "application/json", // Ensure content type is set for FormData
      });
      console.log(response, "response123");
      return toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const ResetPasswordHandler = createAsyncThunk(
  "auth/resetPassword",
  async ({ slug, data }: { slug: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "PATCH",
        data: data,
        url: `/auth/resetPassword/${slug}`,
        contentType: "application/json",
      });
      return toast.success(response?.data?.message);
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

// Thunk to fetch users with pagination and search query
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
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
        url: `/users/getall?page=${page}&search=${searchQuery}&sortBy=${sortcoloum}&sortOrder=${sortorder}`,
        token,
      });
      console.log(response, "response");
      return response?.data?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const GetProfile = createAsyncThunk(
  "auth/getProfile",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/users/profile/${id}`,
        contentType: "application/json",
        token,
      });
      return response?.data?.data;
    } catch (error: any) {
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteUserHandler = createAsyncThunk(
  "auth/resetPassword",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "DELETE",
        url: `/users/deleteUser/${id}`,
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

export const capturePayment = createAsyncThunk(
  "auth/confirmpayment",
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/payment/getpaymentdetails/${data}`,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
