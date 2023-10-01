import React from 'react'
import { useEffect } from 'react'
import { VideoItem } from '../../../props'
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { ImMusic } from 'react-icons/im';
import PostMainLike from '../postMainLike/postMainLike';
const PostMain = (post: VideoItem) => {
    useEffect(() => {
        const video = document.getElementById(`video-${post.videoId}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.videoId}`)
        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause();
            }, { threshold: [0.6] });
            observer.observe(postMainElement);
        }
    }, []);
    return (
        <>
            <div id={`PostMain-${post.videoId}`} className='flex border-b py-5 min-w-[400px]'>
                <div className='cursor-pointer '>
                    <Link to={`/profile/${post.profile?.userID}`}>
                        <img className='rounded-full max-h-[60px]' width="60" src={post?.profile?.avatar} />
                    </Link>
                </div>
                <div className='pl-3 w-full px-4 text-left'>
                    <div className='flex items-center justify-between pb-0.5'>
                        <Link to={`/profile/${post.profile?.userID}`}>
                            <span className='font-bold hover:underline cursor-pointer'>
                                {post.profile?.displayedName}
                            </span>
                        </Link>
                        <button className='border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md'>
                            Follow
                        </button>
                    </div>
                    <p className='text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]'>{post.caption}</p>
                    <p className='text-[14px] text-gray-500 pb-0.5'>#fun #cool #02221221112 #supperAwesome </p>
                    <p className='text-[14px] pb-0.5 flex items-center font-semibold'>
                        <ImMusic size='17' />
                        <span className='px-1'>Original sound- AWESOME</span>
                        <AiFillHeart size='20' />
                    </p>
                    <div className='mt-2.5 flex'>
                        <div className='relative min-h-[480px] max-h-[580px]   max-w-[260px] flex items-center    cursor-pointer'>
                            <video
                                id={`video-${post.videoId}`}
                                controls
                                muted
                                className=' object-cover mx-auto rounded-lg h-full'
                                src={require('../../../utils/beach.mp4')} />
                            <img
                                className='absolute right-2 bottom-10'
                                width='90'
                                src={require('../../../utils/tiktok-logo-white.png')}
                            />
                        </div>
                        <PostMainLike videoId={post.videoId} likes={post.likes} comments={post.comments} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostMain