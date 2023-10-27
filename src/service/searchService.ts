import axios from "axios";
import { getUserInfo } from "./userService";
import { BASEAPIURL, BASEURL } from "../const/baseUrl";
import { SearchHistory } from "../model/searchModel";
import { addKeyWord } from "../store/search";
import { Dispatch } from 'redux';
import axiosInstance from "../aixos/axios";

const token = localStorage.getItem('token');
const _axios = axios.create({
    baseURL: BASEAPIURL,
    headers: {
        'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
        'Content-Type': 'application/json', // Set the content type if needed
    },
});
const SearchService = {
    getAllKeyWords: async (userId:number) => {
        try {
            const response= await _axios.get(`Search/${userId}`)
           if(response.status===200){
            return response.data.data;
           }
        }
        catch (error) {
            console.log(error);
        }
    },
    addHistory: async ( newItem: SearchHistory) => {
        try {
            const response = await _axios.post('Search', newItem);
            if (response.status === 200) {
                newItem.searchId = response.data.data;
                return newItem;
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    removeSearch:async (id:number)=>{
            try{
                const response=await _axios.delete(`Search/${id}`)
                if(response.status===200){
                    console.log('thanhcong')
                    return true;
                }
            }
            catch(error){
                console.log(error);
            }
    }
}

export default SearchService;
