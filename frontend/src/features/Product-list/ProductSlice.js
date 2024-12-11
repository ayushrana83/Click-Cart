import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getAllBrands,
  getAllCategories,
  getProductById,
  getProductsByfilter,
  searchProduct,
  updateProduct,
} from "./ProductAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProduct: null,
};

export const getProductsByfilterAsync = createAsyncThunk(
  "product/getProductsByFilter",
  async ({ filter, sort, pagination, admin }) => {
    // console.log(filter);
    const response = await getProductsByfilter({
      filter,
      sort,
      pagination,
      admin,
    });
    // console.log(response);
    return response.data;
  }
);

export const getAllBrandsAsync = createAsyncThunk(
  "product/getAllBrands",
  async () => {
    const response = await getAllBrands();
    return response.data;
  }
);

export const getAllCategoriesAsync = createAsyncThunk(
  "product/getAllCategories",
  async () => {
    const response = await getAllCategories();
    return response.data;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await addProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const searchProductAsync = createAsyncThunk(
  "product/search",
  async (pro) => {
    const response = await searchProduct(pro);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductsByfilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByfilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (pro) => pro.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(searchProductAsync.pending , (state) => {
        state.status = "loading";
      })
      .addCase(searchProductAsync.fulfilled , (state , action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
  },
});

export const { increment } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
