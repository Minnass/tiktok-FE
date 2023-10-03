import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './auth';
import likedVideosReducer from './likedVideos'


const store = configureStore({
  reducer: {
    login: loginReducer,
    likedVideos: likedVideosReducer,
  },
  // ...other store configuration options
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;