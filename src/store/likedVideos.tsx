import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LikedVideosState {
    likedVideoIds: number[]
}

const initialState: LikedVideosState = {
    likedVideoIds: []
};
const likedVideosSlice = createSlice({
    name: 'likedVideos',
    initialState,
    reducers: {
      setLikedVideos:(state,action: PayloadAction<number[]>)=>{
        state.likedVideoIds=action.payload;
      },
      addLikedVideo: (state, action: PayloadAction<number>) => {
        state.likedVideoIds.push(action.payload);
      },
      removeLikedVideo: (state, action: PayloadAction<number>) => {
        state.likedVideoIds = state.likedVideoIds.filter(
          (videoId) => videoId !== action.payload
        );
      },
    },
  });
  
  export const { addLikedVideo, removeLikedVideo,setLikedVideos } = likedVideosSlice.actions;
  export const selectLikedVideoIds = (state: { likedVideos: LikedVideosState }) =>
    state.likedVideos.likedVideoIds;
  export default likedVideosSlice.reducer;