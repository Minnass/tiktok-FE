import { info } from "console"

export interface UserInfomation{
    avatar?:string,
    bio?:string,
    displayedName?:string
    email?:string
    userId?:number,
    userName?:string
}
export interface JwtResult{ 
    accessToken:string,
    refreshToken:RefreshToken
}
export interface LoginResult{
    userInfomation:UserInfomation,
    jwtResult:JwtResult
}
export interface RefreshToken{
    userID:number,
    userName:string,
    tokenString:string,
    expireAt:Date
}
