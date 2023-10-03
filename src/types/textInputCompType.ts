export interface TextInputCompType{
    string?:string,
    inputType?:string,
    placeHolder?:string,
    onUpdate:(newValue:string)=>void,
    error?:string
}   