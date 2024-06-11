import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { userapi } from "../api";
import axiosInstance from "../Pages/axiosInstance";
import axios from "axios";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error:null
};

export const login = createAsyncThunk("user/login", async (credentials) => {
    try {
      const response = await axios.post(`${userapi}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  });
  

export const register = createAsyncThunk("user/register", async (userData) => {
  const response = await axios.post(`${userapi}/register`, userData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.error = null; 
    });
    builder.addCase(login.rejected, (state, action) => {
        state.error = action.payload; // Set error state
      });
    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.error = null; 
    });
    builder.addCase(register.rejected, (state, action) => {
        state.error = action.payload; // Set error state
      });
  },
});

export default authSlice.reducer;
