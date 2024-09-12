import { fetchUsers } from "@/services/authService";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import toast from "react-hot-toast";

interface UserState {
  users: Array<object>;
  loading: boolean;
  error?: string;
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: undefined,
  totalPages: 1,
  currentPage: 1,
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetData: (state) => {
      state.users = [];
      state.loading = false;
      state.totalPages = 1;
      state.currentPage = 1;
      state.totalUsers = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.users || [];
        state.totalPages = action.payload?.totalPages || 1;
        state.totalUsers = action.payload?.totalUsers;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(state.error || "An error occurred while fetching users");
      });
  },
});

export const { setCurrentPage, resetData } = userSlice.actions;
export default userSlice.reducer;
