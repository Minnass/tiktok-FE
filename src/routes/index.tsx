import { HomePage,FollowingPage,ProfilePage,UploadPage } from "../pages"; 
import {DefaultLayout,Navbar} from '../components/'

const publicRoutes=[
    {path:'/',component:HomePage,layout:DefaultLayout},
    {path:'/following',component:FollowingPage,layout:DefaultLayout},
    {path:'/profile',component:ProfilePage,layout:DefaultLayout},
    {path:'/update',component:UploadPage,layout:Navbar}
];
const privateRoutes=[
    {} 
];
export {publicRoutes,privateRoutes}