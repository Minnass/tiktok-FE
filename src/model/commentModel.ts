import { UserInfomation } from "./loginResult";

export interface CommentRequest{
    videoId:number,
    userId:number,
    text:string
}
export interface CommentResult{
    commentId:string,
    videoId:string,
    time:Date,
    text:string,
    user:UserInfomation,
}