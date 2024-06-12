// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userapi } from "../api";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  error: null,
};

export const login = createAsyncThunk("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${userapi}/login`, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const register = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${userapi}/register`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
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
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login successful:", action.payload);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login failed:", action.payload);
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Registration successful:", action.payload);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Registration failed:", action.payload);
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, setRefreshToken, setUser } = authSlice.actions;
export default authSlice.reducer;
