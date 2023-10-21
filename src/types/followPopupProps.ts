import { FollowModel } from "../model";

export interface FollowPopUpProps{
    followModel?:FollowModel,
    displayedName?:string,
    mode:boolean,
    closeButtonHandler:()=>void;
}