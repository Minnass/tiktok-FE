import React, { useEffect, useState } from 'react'
import { DefaultLayout, PostMain } from '../../components';
import { selectIsLoggedIn, setLoginRequestStatus } from '../../store/auth';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { VideoModel } from '../../model';
import { selectFollowingUser } from '../../store/following';
import axiosInstance from '../../aixos/axios';
const FollowingPage = () => {
  const followingUser =  useSelector((state: RootState) => selectFollowingUser(state));
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  const [videoList, setVideoList] = useState<VideoModel[]>([]) 
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setLoginRequestStatus(true))
    }
    else{
      axiosInstance.post(`Post/getFollowing`,followingUser)
      .then((response) => {
        if (response.status === 200) {
          setVideoList(response.data.data)
        }
      }).catch((error) => {
        console.error('Error fetching data:', error);
      })
    }
  }, [isLoggedIn])

  return (
    <DefaultLayout>
      <div className='w-[calc(100%-90px)] max-w-[690px] ml-auto ' >
      {isLoggedIn&&videoList.map((video, index) => (
          <PostMain key={index}
            videoId={video.videoId}
            caption={video.caption}
            videoURL={video.videoUrl}
            likes={video.like}
            comments={video.comment}
            shares={0}
            hasTag={video.hasTag}
            profile={
              {
                avatar: video.user.avatar,
                displayedName: video.user.displayedName,
                userName: video.user.userName,
                userID: video.user.userId,
              }
            }
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default FollowingPage;