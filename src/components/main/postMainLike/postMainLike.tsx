import React, { useEffect, useState } from 'react';
import { VideoItem } from '../../../types';
import { AiFillHeart } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaShare, FaCommentDots } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from '../../../const/baseUrl';
import { LikeModel } from '../../../model';
import { selectIsLoggedIn } from '../../../store/auth';
import { RootState } from '../../../store/store';
import { setLoginRequestStatus } from '../../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedVideoIds } from '../../../store/likedVideos';
function PostMainLike(post: VideoItem) {
    const baseUrl = BASEURL;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
    const likedVideos = useSelector((state: RootState) => selectLikedVideoIds(state));
    const [hasClickedLike, setHasClickLike] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);
    const [comments, setComments] = useState<number>(post.comments || 0)
    const [likes, setLikes] = useState<number>(post.likes || 0)
    // const [shares, setShares] = useState<number>(0)

    useEffect(() => {
        setUserLiked(likedVideos.includes(post.videoId!));
    }, [likedVideos]);

    const navigater = useNavigate();
    const likeOrUnlike = () => {
        if (!isLoggedIn) {
            dispatch(setLoginRequestStatus(true));
            return;
        }
        console.log(post);
        const likeModel: LikeModel = { userId: post.profile?.userID, videoId: post.videoId }
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
            setHasClickLike(prev => !prev)
            setTimeout(() => {
                setHasClickLike(prev => !prev)
            }, 200);
            setLikes(likes => likes + 1);
        }
        setUserLiked(prev => !prev)
    }

    return (
        <>
            <div id={`PostMainLikes-${post.videoId}`} className='relative mr-[75]'>
                <div className='absolute bottom-0 pl-2'>
                    <div className='pb-4 text-center' >
                        <button
                            onClick={() => likeOrUnlike()}
                            className='rounded-full bg-gray-200 p-2 cursor-pointer'
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={userLiked ? '#ff2626' : ''} size="25" />
                            ) :
                                (
                                    <BiLoaderCircle className="animate-spin" size="25" />
                                )
                            }
                        </button>
                        <span className="text-xs text-gray-800 font-semibold">
                            {likes}
                        </span>
                    </div>
                    <button
                        onClick={() => { navigater(`/${post.profile?.userName}/${post.videoId}`) }}
                        className="pb-4 text-center"
                    >
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaCommentDots size="25" />
                        </div>
                        <span className="text-xs text-gray-800 font-semibold">{comments}</span>
                    </button>

                    <button className="text-center">
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaShare size="25" />
                        </div>
                        <span className="text-xs text-gray-800 font-semibold">55</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostMainLike