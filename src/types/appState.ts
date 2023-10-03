import { LikedVideo } from "./video";

export interface AppState {
    auth: {
      isLogin: boolean;
    };
    likedVideos:LikedVideo[]
  }