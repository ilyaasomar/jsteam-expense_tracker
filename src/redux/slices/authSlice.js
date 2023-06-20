import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// funciton
export const Login = createAsyncThunk(
  'auth/login',
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/login',
        userData
      );
      toast.success('🦄 Login Successfully', {
        position: 'top-right',
        autoClose: 1000,
      });
      navigate('/');
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
    Logout: (state) => {
      state.user = [];
      localStorage.clear();
    },
  },
  extraReducers: {
    [Login.pending]: (state) => {
      state.loading = true;
    },
    [Login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      state.error = '';
    },
    [Login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { clearError, Logout } = authSlice.actions;
export default authSlice.reducer;
