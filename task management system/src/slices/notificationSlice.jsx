import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/fbconfig";
import { collection, getDocs } from "firebase/firestore";

// Fetch notifications thunk
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "notifications"));
      return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
