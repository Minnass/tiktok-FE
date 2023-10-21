import React, { useEffect, useState } from 'react'
import PostSearch from '../../components/main/video/postNameSearching'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASEAPIURL } from '../../const/baseUrl';
import { VideoModel } from '../../model';

const VideoSearch = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');
  const [videoList, setVideoList] = useState<VideoModel[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const _axios = axios.create({
      baseURL: BASEAPIURL,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Set the content type if needed

      },
    });
    _axios.get(`Post/getAll/${query}`)
      .then((response) => {
        setVideoList(response.data.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])
  return (
    <div className='mt-5 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5'>
      {videoList.map((item, index) => (
        <PostSearch caption={item.caption}
          hasTag={item.hasTag}
          key={index}
          uploadDate={item.uploadDate}
          videoId={item.videoId}
          user={item.user}
          videoUrl={item.videoUrl}
        />
      ))}
    </div>
  )
}

export default VideoSearch