import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUserOrders,  getUserInfo, updateUser } from './UserAPI';

const initialState = {
  status: 'idle',
  userInfo : null,
  checkedUserOrder : false,
};

export const getAllOrdersAsync = createAsyncThunk(
  'user/getOrders',
  async () => {
    const response = await getAllUserOrders();
    return response.data;
  }
);

export const getUserInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async() => {
    const response = await getUserInfo();
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async(update) => {
    const response = await updateUser(update);
    return response.data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
        state.checkedUserOrder = true;
      })
      .addCase(getUserInfoAsync.pending , (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfoAsync.fulfilled , (state, action) => {
        state.status = "idle" ;
        state.userInfo = action.payload;
        state.checkedUserOrder = true;
      })
      .addCase(updateUserAsync.pending , (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled , (state , action) => {
        state.status = "idle";
        state.userInfo = action.payload;
        state.checkedUserOrder = true;
      })
  },
});

export const selectAllUserOrders = (state) => state.user.userInfo.orders;

export const selectUserInfo = (state) => state.user.userInfo;

export const selectUserStatus = (state) => state.user.status;

export const selectCheckedUserOrder = (state) => state.user.checkedUserOrder;

export default orderSlice.reducer;
