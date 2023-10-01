import { HomePage,FollowingPage,ProfilePage,UploadPage, PostPage } from "../pages"; 
import {DefaultLayout,Navbar} from '../components/'

const publicRoutes=[
    {path:'/',component:HomePage},
    {path:'/following',component:FollowingPage},
    {path:'/userID',component:ProfilePage},
    {path:'/upload',component:UploadPage},
    {path:'/:userID/:postID' ,component:PostPage}
];
const privateRoutes=[
    {} 
];
export {publicRoutes,privateRoutes}