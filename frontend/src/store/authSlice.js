import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: null,
    data: null,
    loading: true,
  },
  reducers: {
    setUser(state, action) {
      state.role = "user";
      state.data = action.payload;
      state.loading = false;
    },
    setPartner(state, action) {
      state.role = "partner";
      state.data = action.payload;
      state.loading = false;
    },
    clearAuth(state) {
      state.role = null;
      state.data = null;
      state.loading = false;
    },
  },
});

export const { setUser, setPartner, clearAuth } = authSlice.actions;
export default authSlice.reducer;
