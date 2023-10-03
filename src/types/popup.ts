export interface PopUpModel{
    tittle?:string,
    content?:string,
    firstOption?:string,
    secondOption?:string,
   eventListener:(param:boolean)=>void;
}