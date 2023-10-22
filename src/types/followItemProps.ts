import { UserInfomation } from "../model";

export interface FollowItemProps{
    user:UserInfomation,
    closePopUpHandler:()=>void
}