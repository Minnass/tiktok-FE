import React, { useEffect } from 'react'
import { VideoModel } from '../../../model'
import { Link, useNavigate } from 'react-router-dom'
import getDateString from '../../../utils/convertDateToString'
import { BASEAPIURL, BASEURL } from '../../../const/baseUrl'

const PostSearch = (post: VideoModel) => {
  const navigator = useNavigate();
  useEffect(() => {
    const video = document.getElementById(`video${post?.videoId}`) as HTMLVideoElement

    setTimeout(() => {
      video.addEventListener('mouseenter', () => { video.play() })
      video.addEventListener('mouseleave', () => { video.pause() })
    }, 50)
    return () => {
      video.removeEventListener('mouseenter', () => video.play())
      video.removeEventListener('mouseleave', () => video.pause())
    }
  }, [])
  return (
    <div className='w-full'>
      <div className=" brightness-90 hover:brightness-[1.1] cursor- ">
        <div className='relative'>
          <Link to={`/${post.user?.userId}/${post.videoId}`}>
            <video
              id={`video${post.videoId}`}
              muted
              loop
              className="aspect-[3/4] object-cover rounded-md"
              src={`${BASEURL}${post?.videoUrl}`}
            >
            </video>
          </Link>
          <p className='absolute  text-white  text-[16px] font-bold left-0 bottom-0 p-2 flex'>
            {getDateString(new Date(post.uploadDate!))}
          </p>
        </div>
      </div>
      <div className='p-2 text-[16px] '>
        <div className=' flex-wrap flex  '>
          <div className='line-clamp-2 flex'>
            <p>{post.caption}</p>
            {
              post.hasTag?.map((item, index) => (
                <p
                  onClick={() => navigator(`/tag/${item.hasTagName}`)}
                  className='text-blue-700 truncate ml-1 hover:underline cursor-pointer'>#{item.hasTagName}</p>
              ))
            }
          </div>
        </div>
        <div className='flex'>
          <img height={30} width={30} className='rounded-full h-full ' 
           src={post.user?.avatar? `${BASEURL}${post.user.avatar}` :require('../../../utils/user.png')}
          />
          <p className='truncate ml-2'>{post.user?.displayedName}</p>
        </div>
      </div>
    </div>
  )
}

export default PostSearch