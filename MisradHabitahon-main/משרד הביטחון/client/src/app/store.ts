import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
