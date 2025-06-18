import { createSlice } from "@reduxjs/toolkit";

const authListenerSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authListenerSlice.actions;
export default authListenerSlice.reducer;
