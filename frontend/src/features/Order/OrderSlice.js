import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, getAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders : [],
  status: 'idle',
  currOrder : null ,
  totalOrders : 0,
  checkedOrder : false,
};

export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);

export const getAllOrdersAsync = createAsyncThunk(
  'order/getAllOrders',
  async({sort ,pagination}) => {
    const response = await getAllOrders({sort , pagination});
    return response.data;
  }
)
export const updateOrderAsync = createAsyncThunk(
  'order/update',
  async(update) => {
    const response = await updateOrder(update);
    return response.data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder : (state) => {
      state.currOrder = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currOrder = action.payload;
        state.checkedOrder = true;
      })
      .addCase(getAllOrdersAsync.pending , (state) =>{
        state.status = 'loading';
      })
      .addCase(getAllOrdersAsync.fulfilled , (state , action) => {
        state.status = 'idle' ;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.checkedOrder = true;
      })
      .addCase(updateOrderAsync.pending , (state) =>{
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled , (state , action)=>{
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        state.orders[index] = action.payload;
        state.checkedOrder = true;
      })
  },
});

export const {resetOrder} = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrOrder = (state) => state.order.currOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectCheckedOrder = (state) => state.order.checkedOrder;


export default orderSlice.reducer;
