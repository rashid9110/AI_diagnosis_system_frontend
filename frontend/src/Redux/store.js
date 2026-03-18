import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;