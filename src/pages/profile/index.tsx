import React from 'react'
import { BsPencil } from "react-icons/bs"
import { User } from '../../props';
import PostUser from '../../components/main/video/postUser';
import { EditProfileOverlay } from '../../components';
import {useState} from 'react'
const ProfilePage = () => {

  const user: User = {
    avatar: 'http://placehold.co/200',
    Bio: 'Dep trai',
    displayedName: 'Phan Nhat Trieu',
    userID: '12',
    userName: 'trieu3706_',
  }

  const [openedProfileEditor,setOpenedProfileEditor]=useState<boolean>(false);


  return (
    <>
      {openedProfileEditor&&<EditProfileOverlay openedProfileEditorListener={setOpenedProfileEditor} />}
      <div className="ml-[90px] min-w-[460px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">

        <div className="flex ">
          {true ? (
            <img className="w-[116px] min-w-[116px] rounded-full" src={user.avatar} />
          ) : (
            <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
          )}

          <div className="ml-5 w-full text-left">

            {(user)?.displayedName ? (
              <div>
                <p className="text-[30px] font-bold truncate">{user.displayedName}</p>
                <p className="text-[18px] truncate">{user?.userName}</p>
              </div>
            ) : (
              <div className="h-[60px]" />
            )}



            {true ? (
              <button
                onClick={()=>setOpenedProfileEditor(true)}
                className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
              >
                <BsPencil className="mt-0.5 mr-1" size="18" />
                <span>Edit profile</span>
              </button>
            ) : (
              <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                Follow
              </button>
            )}
          </div>

        </div>
        <div className="flex items-center pt-4">
          <div className="mr-4">
            <span className="font-bold">10K</span>
            <span className="text-gray-500 font-light text-[15px] pl-1.5">Following</span>
          </div>
          <div className="mr-4">
            <span className="font-bold">44K</span>
            <span className="text-gray-500 font-light text-[15px] pl-1.5">Followers</span>
          </div>
        </div>
        <p className="text-left pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
          {(user.Bio)?(user.Bio):('No bio yet.')}
        </p>
       
        <ul className="w-full flex items-center pt-4 border-b">
          <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
          <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Liked</li>
        </ul>
          <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
            
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              />
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              />
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              /> 
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep 1212312 123123 123123213123  qua'
                videoId='121' 
              /> 
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              /> 
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              /> 
              <PostUser comments={12} likes={12} videoURL='../../utils/beach.mp4' shares={12} caption='Dep qua'
                videoId='121' 
              /> 
              
          </div>

        <div className="pb-20" />
      </div>
    </>
  )
}

export default ProfilePage;