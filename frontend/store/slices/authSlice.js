import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestMagicCode, verifyMagicCode } from '@/services/authService';

export const requestCode = createAsyncThunk(
  'auth/requestCode',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await requestMagicCode(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send code');
    }
  }
);

export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await verifyMagicCode(token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sessionToken', response.sessionToken);
        localStorage.setItem('email', response.email);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid code');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    sessionToken: typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null,
    email: typeof window !== 'undefined' ? localStorage.getItem('email') : null,
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('sessionToken') : false,
    codeSent: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.sessionToken = null;
      state.email = null;
      state.isAuthenticated = false;
      state.codeSent = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('email');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestCode.fulfilled, (state, action) => {
        state.loading = false;
        state.codeSent = true;
        state.error = null;
      })
      .addCase(requestCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.codeSent = false;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionToken = action.payload.sessionToken;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.sessionToken = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
