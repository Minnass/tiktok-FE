import { UserInfomation } from "../model";

export const getUserInfo = () => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString != null) {
        return (JSON.parse(userInfoString) as UserInfomation);
    }
    return null;
}