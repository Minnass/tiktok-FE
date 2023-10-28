import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoModel } from '../model';
import { stat } from 'fs';

interface CurrentVideosState {
    videos: VideoModel[]|undefined;
    previousRoute:string
}

const initialState: CurrentVideosState = {
    videos: [],
    previousRoute:''
};

const currentVideosSlice = createSlice({
    name: 'currentVideos',
    initialState,
    reducers: {
        setCurrentVideos: (state, action: PayloadAction<VideoModel[]|undefined>) => {
            state.videos = action.payload;
        },
        setPreviousRoute:(state, action: PayloadAction<string>)=>{
            state.previousRoute=action.payload
        }
    },
});

export const { setCurrentVideos ,setPreviousRoute} = currentVideosSlice.actions;

export const selectCurrentVideos = (state: { currentVideosReducer: CurrentVideosState }) =>
    state.currentVideosReducer.videos;
    export const selectPreviousRoute = (state: { currentVideosReducer: CurrentVideosState }) =>
    state.currentVideosReducer.previousRoute
export default currentVideosSlice.reducer;