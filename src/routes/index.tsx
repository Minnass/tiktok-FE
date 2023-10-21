import { HomePage,FollowingPage,ProfilePage,UploadPage, PostPage } from "../pages"; 
import {DefaultLayout,Navbar} from '../components/'
import TagSearchPage from "../pages/tagSearch/tagSearchPage";
import SearchPage from "../pages/searchPage/searchPage";

const publicRoutes=[
    {path:'/',component:HomePage},
    {path:'/following',component:FollowingPage},
    {path:'/:userName',component:ProfilePage},
    {path:'/upload',component:UploadPage},
    {path:'/:userID/:postID' ,component:PostPage},
    {path:'/tag/:tagName',component:TagSearchPage},
    {path:'/search/video',component:SearchPage},
    {path:'/search/user',component:SearchPage},

    // {path:'*',component:null}
];
const privateRoutes=[
    {} 
];
export {publicRoutes,privateRoutes}