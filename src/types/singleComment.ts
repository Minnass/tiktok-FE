import { User } from "./user";

export interface SingleCommentProps{
    id?:string,
    post_id?:string,
    text?:string,
    user?:User
    created_at?:Date
}