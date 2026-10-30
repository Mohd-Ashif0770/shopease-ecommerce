import { createSlice } from "@reduxjs/toolkit";
import { getProductsAPI } from "../../apis/product.api";

const initialState = {
  products: [],
  loading: false,
  error: null,
  pagination: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },

    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProductError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductLoading,
  setProductError,
} = productSlice.actions;

// Async action creator (without createAsyncThunk)
export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setProductLoading(true));
    dispatch(setProductError(null));

    const {
      page = 1,
      limit = 10,
      search = "",
      category_id,
      sortBy = "created_at",
      order = "desc",
    } = params;

    const response = await getProductsAPI(
      page,
      limit,
      search,
      category_id,
      sortBy,
      order
    );

    dispatch(
      setProducts({
        products: response.data.products,
        pagination: response.data.pagination,
      })
    );
  } catch (error) {
    dispatch(
      setProductError(
        error.response?.data?.message || "Failed to fetch products"
      )
    );
  } finally {
    dispatch(setProductLoading(false));
  }
};

export default productSlice.reducer;