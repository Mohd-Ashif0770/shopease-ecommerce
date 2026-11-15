import { createSlice } from "@reduxjs/toolkit";
import { getProductDetailsAPI, getProductsAPI } from "../../apis/product.api";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
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

    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },

    setDetailsLoading: (state, action) => {
      state.detailsLoading = action.payload;
    },

    setDetailsError: (state, action) => {
      state.detailsError = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductLoading,
  setProductError,
  setCurrentProduct,
  setDetailsLoading,
  setDetailsError,
} = productSlice.actions;

// Async action creator for fetching product list
export const fetchProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setProductLoading(true));
      dispatch(setProductError(null));

      const {
        page = 1,
        limit = 8,
        search = "",
        category_id,
        category,
        minPrice,
        maxPrice,
        sortBy = "created_at",
        order = "desc",
      } = params;

      const response = await getProductsAPI(
        page,
        limit,
        search,
        category_id,
        minPrice,
        maxPrice,
        sortBy,
        order,
        category,
      );

      dispatch(
        setProducts({
          products: response.data.products,
          pagination: response.data.pagination,
        }),
      );
    } catch (error) {
      dispatch(
        setProductError(
          error.response?.data?.message || "Failed to fetch products",
        ),
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

// Async action creator for fetching single product details
export const fetchProductDetails = (identifier) => async (dispatch) => {
  try {
    dispatch(setDetailsLoading(true));
    dispatch(setDetailsError(null));

    const response = await getProductDetailsAPI(identifier);
    dispatch(setCurrentProduct(response.data));
  } catch (error) {
    dispatch(
      setDetailsError(
        error.response?.data?.message || "Failed to fetch product details",
      ),
    );
  } finally {
    dispatch(setDetailsLoading(false));
  }
};

export default productSlice.reducer;
