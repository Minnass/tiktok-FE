import { UserInfomation } from "./loginResult";

export interface FollowModel{
    userId:string,
    followers:UserInfomation[],
    followings:UserInfomation[],
}