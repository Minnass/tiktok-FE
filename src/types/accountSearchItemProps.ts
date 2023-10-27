import { UserInfomation } from "../model";

export interface AccountItemProps{
    user?: UserInfomation,
   search?:string,
   clickHandler?:(keyWord:string)=>void,
}