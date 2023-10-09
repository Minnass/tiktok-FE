import React from 'react'
import { useEffect } from 'react'
import { VideoItem } from '../../../types'
import { Link, useLocation } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { ImMusic } from 'react-icons/im';
import PostMainLike from '../postMainLike/postMainLike';
const PostMain = (post: VideoItem) => {
    const location = useLocation();
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
                    <Link to={`/${post.profile?.userName}`}>
                        <img className='rounded-full max-h-[60px]' width="60" src={(post?.profile?.avatar == null) ?
                            (require('../../../utils/user.png')) : (post?.profile?.avatar)} />
                    </Link>
                </div>
                <div className='pl-3 w-full px-4 text-left'>
                    <div className='flex items-center justify-between pb-0.5'>
                        <Link to={`${post.profile?.userName}`}>
                            <div className='flex items-end'>
                                <span className='font-bold hover:underline cursor-pointer'>
                                    {post.profile?.userName}
                                </span>
                                <span className='ml-1 text-[14px] cursor-pointer py-1'>
                                    {post.profile?.displayedName}
                                </span>
                            </div>
                        </Link>
                        {location.pathname === '/' &&
                            <button className='border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md'>
                                Follow
                            </button>
                        }
                    </div>
                    <p className='text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]'>{post.caption}</p>
                    <div className='flex w-full  text-[14px] text-gray-500 pb-0.5 items-center'>
                        {
                            post.hasTag?.map((video) => (
                                <p className='mr-2' key={video.hasTagId}>{`#${video.hasTagName}`}</p>
                            ))
                        }
                    </div>
                    <p className='text-[14px] pb-0.5 flex items-center font-semibold'>
                        <ImMusic size='17' />
                        <span className='px-1'>Original sound- AWESOME</span>
                        <AiFillHeart size='20' />
                    </p>
                    <div className='mt-2.5 flex'>
                        <div className='relative min-h-[480px] max-h-[580px]   max-w-[260px] flex items-center    cursor-pointer'>
                          <Link to={`/${post.profile?.userName}/${post.videoId}`}>
                          <video
                                id={`video-${post.videoId}`}
                                controls
                                muted
                                className=' object-cover mx-auto rounded-lg h-full'
                                src={require('../../../utils/beach.mp4')} />
                          </Link>
                        </div>
                        <PostMainLike profile={post.profile} videoId={post.videoId} likes={post.likes} comments={post.comments} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostMain