
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isInitializing = false;
      state.loading = false;
      state.error = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    finishAuthInitialization: (state) => {
      state.isInitializing = false;
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isInitializing = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  setAccessToken,
  setLoading,
  setError,
  clearAuthError,
  finishAuthInitialization,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
