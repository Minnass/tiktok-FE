import { UserInfo } from "os";
import { User } from "./user";
import { UserInfomation } from "../model";

export interface SingleCommentProps{
    id?:number,
    post_id?:string,
    text?:string,
    user?:UserInfomation,
    created_at?:Date
    deleteHandler:()=>void;
}