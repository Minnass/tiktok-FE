import React, { useEffect, useRef } from 'react'
import { VideoItem } from '../../types'
import { ImMusic } from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import { BsChatDots } from 'react-icons/bs'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import getDateString from '../../utils/convertDateToString'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { selectIsLoggedIn, setLoginRequestStatus } from '../../store/auth'
import { LikeModel } from '../../model'
import axios from 'axios'
import { BASEURL } from '../../const/baseUrl'
import { selectLikedVideoIds } from '../../store/likedVideos'

const CommentHeader = (item: VideoItem) => {
    const baseUrl = BASEURL;
    const [userLiked, setUserLiked] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false)
    const uploadDate = getDateString(new Date(item.uploadDate!))
    const [likes, setLikes] = useState<number>(item.likes || 0)
    const [comments, setComments] = useState<number>(item.comments || 0)
    const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
    const likedVideos = useSelector((state: RootState) => selectLikedVideoIds(state));
    const dispatch = useDispatch();

    useEffect(() => {
        setUserLiked(likedVideos.includes(item.videoId!));
    }, [likedVideos]);


    const likeOrUnlike = () => {
        if (!isLoggedIn) {
            dispatch(setLoginRequestStatus(true));
            return;
        }
        const likeModel: LikeModel = { userId: item.profile?.userID, videoId: item.videoId }
        const token = localStorage.getItem('token');
        const _axios = axios.create({
            baseURL: baseUrl,
            headers: {
                'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
                'Content-Type': 'application/json', // Set the content type if needed
            },
        });

        _axios.post(`${baseUrl}Like/like`, likeModel)
            .then((response) => { console.log('thahnh cong') })
            .catch((error) => {
                console.log('that bai')
            });
        if (userLiked) {
            setLikes(likes => likes - 1);
        }
        else {
            setUpdating(prev => !prev)
            setTimeout(() => {
                setUpdating(prev => !prev)
            }, 200);
            setLikes(likes => likes + 1);
        }
        setUserLiked(prev => !prev)
    }
    return (
        <>
            <div className='md:px-5 md:py-6 px-3 py-3 w-full'>
                <div className='rounded-xl bg-gray-100 p-3 text-[15px] text-left '>
                    <div className='relative flex items-center '>
                        <img className='rounded-full'
                            width={40}
                            src={(item.profile?.avatar == null) ? require('../../utils/user.png') : item.profile.avatar}
                            alt=''
                        />
                        <div className='ml-2' >
                            <div className='font-bold text-[18px]' >
                                {item.profile?.displayedName}
                            </div>
                            <div className='flex items-center font-light text-[14px]'>
                                <p>
                                    {item.profile?.userName}
                                </p>
                                <p className='ml-2'>
                                    {uploadDate}
                                </p>
                            </div>
                        </div>
                        <button className=' right-2 top-2 absolute border text-[15px] px-[21px]  bg-[#F02C56] text-white hover:bg-[#d25b43] font-semibold rounded-sm  py-1 px-2 '>
                            {true ? `Follow` : `Following`}
                        </button>
                    </div>
                    <div className='flex w-full  text-[14px] text-gray-500 pb-0.5 items-center'>
                        {
                            item.hasTag?.map((video) => (
                                <p className='mr-2' key={video.hasTagId}>{`#${video.hasTagName}`}</p>
                            ))
                        }
                    </div>
                    <div className='flex items-center'>
                        <ImMusic size="17" />
                        <p className='ml-2'>nhạc nền-Lương sơn bạc</p>
                    </div>
                </div>
                <div className='my-2 p-3 flex text-[15px]'>
                    <div className='flex items-center' >
                        <button
                            onClick={() => likeOrUnlike()}
                            className='rounded-full bg-gray-200 p-2 cursor-pointer'>
                            {!updating ? (<AiFillHeart color={userLiked ? ('#ff2626') : ('')} size="20" />) :
                                (<BiLoaderCircle className="animate-spin" size="20" />)}
                        </button>
                        <p className='ml-2'>{item.likes}</p>
                    </div>
                    <div className='flex ml-5 items-center'>
                        <button className='rounded-full bg-gray-200 p-2'>
                            < BsChatDots size={20} />
                        </button>
                        <p className='ml-2'>{item.comments}</p>
                    </div>
                </div>
                <div className='rounded-lg bg-gray-100 border-gray-500 border-2  flex items-center  justify-between pl-3'>
                    <p className='text-[13px] truncate'>{window.location.href}</p>
                    <button className=' rounded-tr-lg rounded-br-lg  font-bold text-[13px] ml-4 hover:bg-white py-2 px-4  basis-auto shrink-0 grow-0 '
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link was copied successfully!");
                        }}
                    >
                        Coppy link
                    </button>
                </div>
            </div>
        </>
    )
}

export default CommentHeader