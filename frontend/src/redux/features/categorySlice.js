import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesAPI } from "../../apis/categories.api";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setCategoryLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCategoryError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  setCategoryLoading,
  setCategoryError,
} = categorySlice.actions;

// Async action
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    dispatch(setCategoryError(null));

    const response = await getCategoriesAPI();

    dispatch(setCategories(response.data));
  } catch (error) {
    dispatch(
      setCategoryError(
        error.response?.data?.message ||
          "Failed to fetch categories"
      )
    );
  } finally {
    dispatch(setCategoryLoading(false));
  }
};

export default categorySlice.reducer;