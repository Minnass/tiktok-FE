import axios from "axios";
import { BASEAPIURL } from "../const/baseUrl";
import { FeedbackModel } from "../model/feedbackMode";

const token = localStorage.getItem('token');
const _axios = axios.create({
    baseURL: BASEAPIURL,
    headers: {
        'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
        'Content-Type': 'multipart/form-data', // Set the content type if needed
    },
});
const FeedbackService={
    sendFeedBack: async (model:FeedbackModel) => {
        try{
            const formData = new FormData();
            formData.append('image', model.img!)
            formData.append('title', model.title!);
            formData.append('problem', model.problem!);
            formData.append('userId', model.userId?.toString()!);
            const response=await _axios.post('Feedback',formData)
            if(response.status===200){
                return true
            }
        }
        catch(error){
            console.log('dadadaad')
            return false;
        }
    }

}
export default FeedbackService