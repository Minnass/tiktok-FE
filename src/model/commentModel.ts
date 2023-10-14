import { UserInfomation } from "./loginResult";

export interface CommentRequest{
    videoId?:number,
    userId?:number,
    text?:string
}
export interface CommentResult{
    commentId?:number,
    videoId?:number,
    time?:Date,
    text?:string,
    userId:number,
    user?:UserInfomation,
}