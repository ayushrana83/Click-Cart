import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserCart , addProductToCart, updateCart, deleteItemIncart, resetCart } from './CartAPI';

const initialState = {
  status: 'idle',
  items : [],
};

export const addProductToCartAsync = createAsyncThunk(
  'cart/addProductToCart',
  async (item) => {
    const response = await addProductToCart(item);
    return response.data;
  }
);

export const getUserCartAsync = createAsyncThunk(
  'cart/getUserCart',
  async () => {
    const response = await getUserCart();
    return response.data;
  }
)

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
)

export const deleteItemIncartAsync = createAsyncThunk(
  "cart/deleteItemInCart" ,
  async(itemId) => {
    const response = await deleteItemIncart(itemId);
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  "cart/resetClear" ,
  async() => {
    const response = await resetCart();
    return response.data;
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(getUserCartAsync.pending , (state) =>{
        state.status = "loading";
      })
      .addCase(getUserCartAsync.fulfilled , (state , action) => {
        state.status = 'idle';
        state.items = action.payload; 
      })
      .addCase(updateCartAsync.pending , (state) =>{
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled , (state , action) =>{
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItemIncartAsync.pending , (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemIncartAsync.fulfilled , (state , action) => {
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index , 1);
      })
      .addCase(resetCartAsync.pending , (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled , (state , action) =>{
        state.status = "idle";
        state.items = [];
      })
  },
});

export const selectCartProduct = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;



export default cartSlice.reducer;
