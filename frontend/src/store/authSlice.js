import { createSlice } from "@reduxjs/toolkit";

//Defining the initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // important for fresh load
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
        authChecked: (state) => {
            state.loading = false;
        },
    }
});


export const { loginSuccess, logout, authChecked } = authSlice.actions;
export default authSlice.reducer;