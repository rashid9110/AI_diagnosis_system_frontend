import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modelReducer from "./slices/modelSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    aiModel: modelReducer, 
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;