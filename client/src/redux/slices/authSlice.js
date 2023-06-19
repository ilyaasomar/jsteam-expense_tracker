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
  reducers: {},
  extraReducers: {
    [Login.pending]: (state) => {
      state.loading = true;
    },
    [Login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    },
    [Login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
