import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NextRouter {
    router: string;
}
const initialState: NextRouter = {
    router: ''
};

const nextRouterSlice = createSlice({
    name: 'nextRouter',
    initialState,
    reducers: {
        setNextRouter: (state, action: PayloadAction<string>) => {
            state.router = action.payload
        },

    },
});

export const { setNextRouter } = nextRouterSlice.actions;
export const selectNextRouter = (state: { nextRouter: NextRouter }) =>
    state.nextRouter.router;

export default nextRouterSlice.reducer;