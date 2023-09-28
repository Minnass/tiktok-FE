import { HomePage,FollowingPage,ProfilePage,UploadPage } from "../pages"; 
import {DefaultLayout,Navbar} from '../components/'

const publicRoutes=[
    {path:'/',component:HomePage,layout:DefaultLayout},
    {path:'/following',component:FollowingPage,layout:DefaultLayout},
    {path:'/profile',component:ProfilePage,layout:DefaultLayout},
    {path:'/upload',component:UploadPage,layout:null}
];
const privateRoutes=[
    {} 
];
export {publicRoutes,privateRoutes}