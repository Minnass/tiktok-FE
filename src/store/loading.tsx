import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Loading {
    isLoading: boolean;
}
const initialState: Loading = {
    isLoading: false
};

const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

    },
});

export const { setLoading } = LoadingSlice.actions;
export const selectIsLoading = (state: { loading: Loading }) =>
    state.loading.isLoading

export default LoadingSlice.reducer;