import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { SiSoundcharts } from "react-icons/si"
import { BiErrorCircle } from "react-icons/bi"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import { VideoItem } from '../../../props'

const PostUser = (post:VideoItem) => {
  return (
    <>
    <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
       {!post.videoURL ? (
            <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                <AiOutlineLoading3Quarters className="animate-spin ml-1" size="80" color="#FFFFFF" />
            </div>
        ) : (
            <Link to={`/${post.profile?.userID}/video/${post.videoId}`}>
                <video 
                    id={`video${post.videoId}`}
                    muted
                    loop
                    className="aspect-[3/4] object-cover rounded-md" 
                    src={require('../../../utils/beach.mp4')}
                />
            </Link>
        )}
        <div className="px-1">
            <p className="text-gray-700 text-[15px] pt-1 truncate text-left">
                {post.caption}
            </p>
        </div>
    </div>
</>
  )
}

export default PostUser