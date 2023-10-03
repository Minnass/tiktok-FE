import React, { useState } from 'react';
import { VideoItem } from '../../../types';
import { AiFillHeart } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaShare, FaCommentDots } from 'react-icons/fa'
function PostMainLike(post: VideoItem) {
    const [hasClickedLike, setHasClickLike] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false)

    const [comments, setComments] = useState<number>(post.comments || 0)
    const [likes, setLikes] = useState<number>(post.likes || 0)
    const [shares, setShares] = useState<number>(0)

    const likeOrUnlike = () => {
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
        //push request len server
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
                        onClick={() => { console.log('Da click ') }}
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