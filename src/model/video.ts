import { HasTag } from "./hasTag"
import { UserInfomation } from "./loginResult"

export interface VideoUpload{
    caption:string,
    videoFile:File
    hashTag:string
}
export interface VideoModel{
    videoId:number,
    videoUrl:string,
    caption:string,
    uploadDate:Date,
    like:number,
    comment:number,
    hasTag:HasTag[],
    user:UserInfomation
}
