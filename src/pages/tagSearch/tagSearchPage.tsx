import React, { useEffect, useState } from 'react'
import { DefaultLayout } from '../../components'
import { useParams } from 'react-router-dom'
import PostSearching from '../../components/main/video/postHasTagSearching';
import axiosInstance from '../../aixos/axios';
import { VideoModel } from '../../model';
const TagSearchPage = () => {
    const { tagName } = useParams();
    const [videoList,setVideoList]=useState<VideoModel[]>([])
    useEffect(() => {
        axiosInstance.get(`Post/GetVideosByTagName/${tagName}`)
            .then((response) => {
                setVideoList(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <DefaultLayout>
            <div className='text-[32px] font-bold lg:ml-[310px] ml-[75px] p-3'>
                <div className='flex '>
                    <div className='flex p-4 bg-gray-100 items-center justify-center'>
                        <svg className='text-gray-300' width="80" data-e2e="" height="80" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.41 17L18.9739 7.47047C18.9895 7.20626 19.2083 7 19.473 7H20.4682C20.7558 7 20.9841 7.24206 20.9673 7.52919L20.4135 17H28.41L28.9739 7.47047C28.9895 7.20626 29.2083 7 29.473 7H30.4682C30.7558 7 30.9841 7.24206 30.9673 7.52919L30.4135 17H38.5C38.7761 17 39 17.2239 39 17.5V18.5C39 18.7761 38.7761 19 38.5 19H30.2958L29.7664 28H37.5C37.7761 28 38 28.2239 38 28.5V29.5C38 29.7761 37.7761 30 37.5 30H29.6488L29.0276 40.5596C29.0114 40.8353 28.7748 41.0456 28.4991 41.0294L27.5009 40.9706C27.2252 40.9544 27.0149 40.7178 27.0311 40.4422L27.6453 30H19.6488L19.0276 40.5596C19.0114 40.8353 18.7748 41.0456 18.4991 41.0294L17.5009 40.9706C17.2252 40.9544 17.0149 40.7178 17.0311 40.4422L17.6453 30H9.5C9.22386 30 9 29.7761 9 29.5V28.5C9 28.2239 9.22386 28 9.5 28H17.763L18.2924 19H10.5C10.2239 19 10 18.7761 10 18.5V17.5C10 17.2239 10.2239 17 10.5 17H18.41ZM20.2958 19L19.7664 28H27.763L28.2924 19H20.2958Z"></path></svg>
                    </div>
                    <p className='ml-5'>#{tagName}</p>
                </div>
                <div className='mt-5 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5'>
                  {
                    videoList.map((video,index)=>(
                        <PostSearching caption={video.caption}
                        videoId={video.videoId}
                        hasTag={video.hasTag}
                        key={index}
                        user={video.user}
                        />
                    ))
                  }
                </div>
            </div>
        </DefaultLayout>
    )
}

export default TagSearchPage