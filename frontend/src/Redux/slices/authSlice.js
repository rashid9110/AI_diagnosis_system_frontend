import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null,
// };
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,

  user: (() => {
    try {
      const data = localStorage.getItem("user");
      if (!data || data === "undefined") return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  })(),

  token: localStorage.getItem("token") || null,
};


// 🔹 REGISTER
export const register = createAsyncThunk(
  "/auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/User", data);

      toast.promise(response, {
        loading: "Creating account...",
        success: (res) => res?.data?.message || "Registered successfully",
        error: "Registration failed",
      });

      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 🔹 LOGIN
export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/login/login", data);

      toast.promise(response, {
        loading: "Logging in...",
        success: (res) => res?.data?.message || "Login successful",
        error: "Login failed",
      });

      const apiResponse = await response; 
      return apiResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 🔹 LOGOUT
export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/logout");

      toast.promise(response, {
        loading: "Logging out...",
        success: (res) => res?.data?.message || "Logout successful",
        error: "Logout failed",
      });

      const apiResponse = await response;
      return apiResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// 🔹 SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder


      // ✅ LOGIN SUCCESS
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = true;
      //   state.user = action?.payload?.data?.user;
      //   state.token = action?.payload?.data?.token;

      //   localStorage.setItem("isLoggedIn", true);
      //   // localStorage.setItem("user", JSON.stringify(state.user));
      //   localStorage.setItem('data',JSON.stringify(action?.payload?.data?.data?.userData));
        
      //   // localStorage.setItem("token", state.token);
      // })

      .addCase(login.fulfilled, (state, action) => {
        const userData = action?.payload?.data?.data?.userData;

        state.isLoggedIn = true;
        state.user = userData;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(userData));
      })

      // ❌ LOGIN FAILED
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload?.message || "Login failed");
      })

      // ✅ LOGOUT SUCCESS
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;

        localStorage.clear();
      });
  },
});

export default authSlice.reducer;