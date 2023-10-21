import React, { useEffect, useState } from 'react'
import { VideoItem } from '../../../types'
import { Link, useNavigate } from 'react-router-dom'
import { VideoModel } from '../../../model'
import { BASEAPIURL, BASEURL } from '../../../const/baseUrl'

const PostSearching = (post: VideoModel) => {
    const navigator = useNavigate()
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
        <div className=" brightness-90 hover:brightness-[1.1] cursor- w-full">
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
                <div className='absolute left-0 bottom-0 p-2 flex'
                    onClick={() => {
                        navigator(`/${post.user?.userName}`)
                    }}
                >
                    <img width={30} className=' rounded-full cursor-pointer' src={require('../../../utils/user.png')} />
                    <p className='text-white cursor-pointer text-[15px] hover:underline ml-1 truncate'>{post.user?.userName}</p>
                </div>
            </div>

            <div className='flex truncate'>
                {post.hasTag?.map((item, index) => (
                    <div
                        onClick={() => { navigator(`/tag/${item.hasTagName}`) }}
                        className='hover:underline text-[15px] cursor-pointer font-extralight mr-1'>#{item.hasTagName}</div>
                ))}
            </div>
        </div>
    )
}

export default PostSearching