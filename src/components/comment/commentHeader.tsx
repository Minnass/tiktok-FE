import React from 'react'
import { VideoItem } from '../../types'
import { ImMusic } from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import { BsChatDots } from 'react-icons/bs'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'

const CommentHeader = (item: VideoItem) => {
    const [liked, setLiked] = useState<boolean>(false)
    const [updating, setUpdating] = useState<boolean>(false)
    const post: VideoItem = {
        caption: 'Trieu dep trai',
        comments: 1,
        likes: 2,
        shares: 3,
        profile: {

        },
        videoURL: '../../utils/beach.mp4'
    }
    const likeClickHandler = () => {
        if (!liked) {
            setTimeout(() => {
                setUpdating(false);
            }, 200)
            setUpdating(true)
        }
        setLiked(prev => !prev);
    }
    return (
        <>
            <div className='md:px-5 md:py-6 px-3 py-3 w-full'>
                <div className='rounded-xl bg-gray-100 p-3 text-[15px] text-left '>
                    <div className='relative flex items-center '>
                        <img className='rounded-full'
                            width={40}
                            src='https://placehold.co/40'
                            alt=''
                        />
                        <div className='ml-2' >
                            <div className='font-bold text-[18px]' >
                                {/* {post.profile?.displayedName} */}
                                Trieudeptria
                            </div>
                            <div className='flex items-center font-light text-[14px]'>
                                <p>
                                    {/* {post.profile?.userName} */}
                                    Trieu3708
                                </p>
                                <p className='ml-2'>
                                    {/* {post.uploadDate?.toString()} */}
                                    19-07
                                </p>
                            </div>
                        </div>
                        <button className=' right-2 top-2 absolute border text-[15px] px-[21px]  bg-[#F02C56] text-white hover:bg-[#d25b43] font-semibold rounded-sm  py-1 px-2 '>
                           {true? `Follow`:`Following`}
                        </button>
                    </div>
                    <p className='my-3'> Nước sào nấu  #food #delicous</p>
                    <div className='flex items-center'>
                        <ImMusic size="17" />
                        <p className='ml-2'>nhạc nền-Lương sơn bạc</p>
                    </div>
                </div>
                <div className='my-2 p-3 flex text-[15px]'>
                    <div className='flex items-center' >
                        <button
                            onClick={() => likeClickHandler()}
                            className='rounded-full bg-gray-200 p-2 cursor-pointer'>
                            {!updating ? (<AiFillHeart color={liked ? ('#ff2626') : ('')} size="20" />) :
                                (<BiLoaderCircle className="animate-spin" size="20" />)}
                        </button>
                        <p className='ml-2'>{post.likes}</p>
                    </div>
                    <div className='flex ml-5 items-center'>
                        <button className='rounded-full bg-gray-200 p-2'>
                            < BsChatDots size={20} />
                        </button>
                        <p className='ml-2'>{post.likes}</p>
                    </div>
                </div>
                <div className='rounded-lg bg-gray-100 border-gray-500 border-2  flex items-center  pl-3'>
                    <p className='text-[13px] truncate'>https://www.tiktok.com/@nguyenthanhha213/video/7275184658105584914?is_from_webapp=1&sender_device=pc&web_id=7210224518375360001</p>
                    <button className=' rounded-tr-lg rounded-br-lg  font-bold text-[13px] ml-4 hover:bg-white py-2 px-4  basis-auto shrink-0 grow-0 '
                    // onClick={()}
                    >
                        Coppy link
                    </button>
                </div>
            </div>
        </>
    )
}

export default CommentHeader