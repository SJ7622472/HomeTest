
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CartItem } from '../cart/cartSlice';
// Thunk לשליחת הזמנה לשרת Node.js
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (order: { form: OrderForm; products: CartItem[] }) => {
    await axios.post('http://localhost:4000/api/orders', {
      form: order.form,
      products: order.products.map((p) => ({
        productId: p.id,
        name: p.name,
        quantity: p.quantity,
      })),
    });
  }
);

interface OrderForm {
  fullName: string;
  address: string;
  email: string;
}

interface OrderState {
  form: OrderForm;
  products: CartItem[];
  status: 'idle' | 'submitting' | 'success' | 'error';
}

const initialState: OrderState = {
  form: {
    fullName: '',
    address: '',
    email: '',
  },
  products: [],
  status: 'idle',
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<OrderForm>) => {
      state.form = action.payload;
    },
    setProducts: (state, action: PayloadAction<CartItem[]>) => {
      state.products = action.payload;
    },
    setStatus: (state, action: PayloadAction<OrderState['status']>) => {
      state.status = action.payload;
    },
    clearOrder: (state) => {
      state.form = initialState.form;
      state.products = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'submitting';
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(submitOrder.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setForm, setProducts, setStatus, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
