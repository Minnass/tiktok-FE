import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    isLoggedIn: boolean;
    isLoginRequest: boolean
}
const initialState: LoginState = {
    isLoggedIn: false,
    isLoginRequest: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedIn: (state) => {
            state.isLoggedIn = true;
        },
        setLoggedOut: (state) => {
            state.isLoggedIn = false;
        },
        setLoginRequestStatus: (state,action:PayloadAction<boolean>) => {
            state.isLoginRequest = action.payload;
        },
    },
});

export const { setLoggedIn, setLoggedOut, setLoginRequestStatus } = loginSlice.actions;
export const selectIsLoggedIn = (state: { login: LoginState }) =>
    state.login.isLoggedIn;
export const selectIsLoginRequest = (state: { login: LoginState }) =>
    state.login.isLoginRequest

export default loginSlice.reducer;