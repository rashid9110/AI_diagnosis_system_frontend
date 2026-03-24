import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modelReducer from "./slices/modelSlice";
import patientReducer from "./slices/patientSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    aiModel: modelReducer,
    patient: patientReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;