import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FollowingState {
    followings: number[]
}
const initialState: FollowingState = {
    followings: []
};

const FollowingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowing: (state, action: PayloadAction<number[]>) => {
            state.followings = action.payload;
        },
        addFollowing: (state, action: PayloadAction<number>) => {
            state.followings.push(action.payload);
        },
        removeFollowing: (state, action: PayloadAction<number>) => {
            state.followings = state.followings.filter(
                (userId) => userId !== action.payload
            );
        },
    },
});

export const { setFollowing, addFollowing, removeFollowing } = FollowingSlice.actions;
export const selectFollowingUser = (state: { following: FollowingState }) =>
state.following.followings;
export default FollowingSlice.reducer;