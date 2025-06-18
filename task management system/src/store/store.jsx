import projectReducer from "../slices/projectSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import authListenerReducer from "../slices/authListenerSlice";
import notificationReducer from "../slices/notificationSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
    authListener: authListenerReducer,
    notifications: notificationReducer,
  },
});

export default store;
