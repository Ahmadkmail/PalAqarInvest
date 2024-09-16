import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    message:''    
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginFail: (state, action) => {
            state.user = null;
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        },
        loginSeccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isError = false;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});
export const{ loginStart, loginFail, loginSeccess, logout } = userSlice.actions;
export default userSlice.reducer