import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get('/api/categories');
    // Handle .NET ReferenceHandler.Preserve format
    const raw = response.data;
    const categoriesArr = Array.isArray(raw) ? raw : (raw?.$values || []);
    return categoriesArr.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      products: Array.isArray(cat.products) ? cat.products : (cat.products?.$values || []),
    }));
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categoriesSlice.reducer;
