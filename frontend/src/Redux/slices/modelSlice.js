
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  result: null,
  error: null,
};

// ✅ API call
export const analyzeXray = createAsyncThunk(
  "/ai/analyze",
  async (formData, { rejectWithValue }) => {
    try {
      const response = axiosInstance.post("/AI_Model", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(response, {
        loading: "Analyzing X-ray...",
        success: "Analysis completed!",
        error: "Failed to analyze X-ray",
      });

      const result = await response;

      return result.data; // contains { success, data }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const modelSlice = createSlice({
  name: "aiModel",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeXray.pending, (state) => {
        state.loading = true;
        state.result = null;
      })
      .addCase(analyzeXray.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload.data; // ✅ important
      })
      .addCase(analyzeXray.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed";
      });
  },
});

export const { resetState } = modelSlice.actions;
export default modelSlice.reducer;