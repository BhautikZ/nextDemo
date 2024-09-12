import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchUsersProducts,
  getSingleProduct,
} from "@/services/productService";

interface ProductsState {
  products: Array<object>;
  singleProduct: Object;
  userProductsList: Array<object>;
  loading: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: ProductsState = {
  products: [],
  userProductsList: [],
  singleProduct: {},
  loading: false,
  totalPages: 1,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetProductData: (state) => {
      state.products = [];
      state.singleProduct = {};
      state.userProductsList = [];
      state.loading = false;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUsersProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProductsList = action.payload;
      })
      .addCase(fetchUsersProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage, resetProductData } = productSlice.actions;
export default productSlice.reducer;
