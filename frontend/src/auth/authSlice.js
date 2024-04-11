import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
        },
        updateToken(state, action) {

            state.token = action.payload;
        },
    },
});


export const { login, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;