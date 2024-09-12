import { createSlice } from "@reduxjs/toolkit";
import {
  GetProfile,
  LoginUser,
  signInUser,
  SocialLoginUser,
} from "@/services/authService";
import toast from "react-hot-toast";

interface AuthState {
  socialLoginUserData: object;
  user: object;
  profileData: object;
  loginData: object;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  loginData: {},
  user: {},
  profileData: {},
  socialLoginUserData: {},
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.socialLoginUserData = {};
      state.user = {};
      state.loginData = {};
      state.profileData = {};
      localStorage.removeItem("userSession");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === false) {
          toast.error(action.payload?.message || "Error occurred");
        } else {
          toast.success(action.payload?.message || "Registration successful");
        }
        state.user = action.payload?.user || "";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred");
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === false) {
          toast.error(action.payload?.message || "Error occurred");
        } else {
          toast.success(action.payload?.message || "Login successful");
        }
        state.loginData = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred");
      })
      .addCase(SocialLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(SocialLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === false) {
          toast.error(action.payload?.message || "Error occurred");
        } else {
          console.log(action.payload?.message);
        }
        state.socialLoginUserData = action.payload;
      })
      .addCase(SocialLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred");
      })
      .addCase(GetProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
