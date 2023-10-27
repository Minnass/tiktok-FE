import { SearchHistory } from "../model/searchModel"

export interface SearchProps{
    keyWord?:string
}
export interface SearchHistoryProps{
    historyItem?:SearchHistory,
}