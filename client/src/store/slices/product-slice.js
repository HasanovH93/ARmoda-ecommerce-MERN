import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, deleteProductById } from "../../api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { dispatch }) => {
    const products = await fetchAllProducts();
    dispatch(setProducts(products));
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    await deleteProductById(id);
    dispatch(fetchProducts());
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
