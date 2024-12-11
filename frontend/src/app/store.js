import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/Product-list/ProductSlice.js'
import authReducer from '../features/Auth/AuthSlice.js'
import cartReducer from '../features/Cart/CartSlice.js';
import orderReducer from '../features/Order/OrderSlice.js';
import userReducer from '../features/User/UserSlice.js';


export const store = configureStore({
  reducer: {
    product : productsReducer,
    auth : authReducer ,
    cart : cartReducer ,
    order : orderReducer ,
    user : userReducer,
  },
});
