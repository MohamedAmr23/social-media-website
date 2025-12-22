import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData } from "../../interfaces/login.js";
import axios, { AxiosError } from "axios";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string;
  isSuccess: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  error: '',
  isSuccess: false,
}

// Async thunk
export const login = createAsyncThunk<
  { token: string; error?: string }, // Return type
  LoginData,                         // Argument type
  { rejectValue: string }            // Reject type
>(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`, values);
      return data;
    } catch (err) {
      let errorMessage = 'Unknown error';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = (err.response.data as any).error || 'Unknown error';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; error?: string }>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.error = action.payload.error || '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.token = null;
        state.error = action.payload || 'Failed to login';
      });
  },
});

export const authReducer = authSlice.reducer;
