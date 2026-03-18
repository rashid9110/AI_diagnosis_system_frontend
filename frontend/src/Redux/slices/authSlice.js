import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    register: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },

  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;