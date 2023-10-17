import React, { useEffect } from 'react'
import { DefaultLayout, PostMain } from '../../components'
import axiosInstance from '../../aixos/axios'
import { useState } from 'react'
import { VideoModel } from '../../model'
import { getUserInfo } from '../../service/userService'
import { selectIsLoggedIn, } from '../../store/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useLocation } from 'react-router-dom'
export const HomePage = () => {
  
  const [searh, setSearch] = useState<string | null>(null)
  const [videoList, setVideoList] = useState<VideoModel[]>([])
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  useEffect(() => {
    axiosInstance.get(`Post/getAll/${searh}`)
      .then((response) => {
        if (response.status === 200) {
          setVideoList(response.data.data)
        }
      }).catch((error) => {
        console.error('Error fetching data:', error);
      })
  }, [isLoggedIn])
  return (
    <DefaultLayout>
      <div className='w-[calc(100%-90px)] max-w-[690px] ml-auto '  >
        {videoList.map((video, index) => (
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
                avatar: video.user!.avatar,
                displayedName: video.user!.displayedName,
                userName: video.user!.userName,
                userID: video.user!.userId,
              }
            }
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default HomePage