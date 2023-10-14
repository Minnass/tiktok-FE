import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResult, UserInfomation } from '../model/loginResult';

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
        setUserInfo: (state, action: PayloadAction<LoginResult>) => {
            localStorage.setItem('token', action.payload.jwtResult.accessToken);
            localStorage.setItem('refreshToken', action.payload.jwtResult.refreshToken.tokenString);
            localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfomation))
        },
        setLoggedOut: (state) => {
            state.isLoggedIn = false;
            localStorage.clear();
        },
        setLoginRequestStatus: (state, action: PayloadAction<boolean>) => {
            state.isLoginRequest = action.payload;

        },
    },
});

export const { setLoggedIn, setLoggedOut, setLoginRequestStatus, setUserInfo } = loginSlice.actions;
export const selectIsLoggedIn = (state: { login: LoginState }) =>
    state.login.isLoggedIn;
export const selectIsLoginRequest = (state: { login: LoginState }) =>
    state.login.isLoginRequest

export default loginSlice.reducer;