import axios from "axios";
import { BASEAPIURL } from "../const/baseUrl";
import { FollowRequest } from "../model";

const token = localStorage.getItem('token');
const _axios = axios.create({
    baseURL: BASEAPIURL,
    headers: {
        'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
        'Content-Type': 'application/json', // Set the content type if needed
    },
});
const FollowService={
    followOrUnFollow: async (model:FollowRequest) => {
        try{
         const response=await   _axios.post('Follow', model)
         if(response.status===200){
            return true;
         }
        }
        catch(error){

        }
    }

}
export default FollowService