import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action) => {
  console.log('login reducer called with:', action.payload);
  state.user = action.payload.user;
  state.isAuthenticated = true;
},

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
