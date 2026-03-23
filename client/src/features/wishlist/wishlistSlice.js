import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistApi from "./wishlistApi";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const data = await wishlistApi.getWishlist();
  return data.wishlist;
});

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId) => {
    await wishlistApi.addToWishlist(productId);

    return { id: productId };
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId) => {
    await wishlistApi.removeFromWishlist(productId);
    return productId;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
