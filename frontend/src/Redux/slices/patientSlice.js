import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  patients: [],
  error: null,
};

// ✅ Fetch all patients
export const fetchPatients = createAsyncThunk(
  "/patient/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/AI_Model/patients");

      // Return the data array directly
      return response.data.data || response.data || [];

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch patients");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    resetPatientState: (state) => {
      state.loading = false;
      state.patients = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.patients = [];
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch patients";
      });
  },
});

export const { resetPatientState } = patientSlice.actions;
export default patientSlice.reducer;