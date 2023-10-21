import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { SiSoundcharts } from "react-icons/si"
import { BiErrorCircle } from "react-icons/bi"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import { VideoItem } from '../../../types'
import { BASEAPIURL, BASEURL } from '../../../const/baseUrl'

const PostUser = (post: VideoItem) => {

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
        <>
            <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
                {!post.videoURL ? (
                    <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                        <AiOutlineLoading3Quarters className="animate-spin ml-1" size="80" color="#FFFFFF" />
                    </div>
                ) : (
                    <Link to={`/${1}/${2}`}>
                        <video
                            id={`video${post.videoId}`}
                            muted
                            loop
                            className="aspect-[3/4] object-cover rounded-md"
                            src={`${BASEURL}${post?.videoURL}`}
                        >
                        </video>
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