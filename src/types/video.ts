import { UserInfomation } from "../model";
import { HasTag } from "../model/hasTag";
import { User } from "./user";

export interface VideoItem{
            videoId?:number
            caption?:string,
            videoURL?:string,
            likes?:number,
            shares?:number,
            comments?:number,
            uploadDate?:Date,
            hasTag?:HasTag[],
            profile?:User
}
export interface LikedVideo{
            videoId:string
}