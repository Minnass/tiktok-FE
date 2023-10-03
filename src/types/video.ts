import { User } from "./user";

export interface VideoItem{
            videoId?:string
            caption?:string,
            videoURL?:string,
            likes?:number,
            shares?:number,
            comments?:number,
            uploadDate?:Date,
            profile?:User
}
export interface LikedVideo{
            videoId:string
}