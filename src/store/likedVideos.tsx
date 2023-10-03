import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LikedVideosState {
    likedVideoIds: string[];
}

const initialState: LikedVideosState = {
    likedVideoIds: ['12','1234','123'],
};
const likedVideosSlice = createSlice({
    name: 'likedVideos',
    initialState,
    reducers: {
      addLikedVideo: (state, action: PayloadAction<string>) => {
        state.likedVideoIds.push(action.payload);
      },
      removeLikedVideo: (state, action: PayloadAction<string>) => {
        state.likedVideoIds = state.likedVideoIds.filter(
          (videoId) => videoId !== action.payload
        );
      },
    },
  });
  
  export const { addLikedVideo, removeLikedVideo } = likedVideosSlice.actions;
  export const selectLikedVideoIds = (state: { likedVideos: LikedVideosState }) =>
    state.likedVideos.likedVideoIds;
  export default likedVideosSlice.reducer;