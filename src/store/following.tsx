import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfomation } from '../model';

interface FollowingState {
    followings: UserInfomation[]
}
const initialState: FollowingState = {
    followings: []
};

const FollowingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        setFollowing: (state, action: PayloadAction<UserInfomation[]>) => {
            state.followings = action.payload;
        },
        addFollowing: (state, action: PayloadAction<UserInfomation>) => {
            state.followings.push(action.payload);
        },
        removeFollowing: (state, action: PayloadAction<number>) => {
            state.followings = state.followings.filter(
                (user) => user.userId !== action.payload
            );
        },
    },
});

export const { setFollowing, addFollowing, removeFollowing } = FollowingSlice.actions;
export const selectFollowingUser = (state: { following: FollowingState }) =>
    state.following.followings;
export default FollowingSlice.reducer;