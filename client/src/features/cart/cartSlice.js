import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "./cartApi";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const data = await cartApi.addToCart(productId, quantity);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartApi.getCart();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const data = await cartApi.updateCartItem(itemId, quantity);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const data = await cartApi.removeCartItem(itemId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const initialState = {
  items: [],
  totalItems: 0,
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.items = action.payload.cart;
  state.totalItems = action.payload.totalItems;
  state.totalQuantity = action.payload.totalQuantity;
  state.totalAmount = action.payload.totalAmount;
  state.loading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "Something went wrong";
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, handleFulfilled)
      .addCase(fetchCart.rejected, handleRejected)

      // addToCart
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, handleRejected)

      // updateCartItem
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, handleFulfilled)
      .addCase(updateCartItem.rejected, handleRejected)

      // removeCartItem
      .addCase(removeCartItem.pending, handlePending)
      .addCase(removeCartItem.fulfilled, handleFulfilled)
      .addCase(removeCartItem.rejected, handleRejected);
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
