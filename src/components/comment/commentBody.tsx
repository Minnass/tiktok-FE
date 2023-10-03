import React from 'react'
import { VideoItem } from '../../types'
import SingleComment from './singleComment'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'

const CommentBody = (videoItems: VideoItem) => {
    const [comment, setComment] = useState<string>('')
    const [inputFocused, setInputFocused] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const addComment = () => {
        //Them comment
    }
    const commentsByPost = [
        {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        },
        {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        },

        {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        },
        {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        }, {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        },
        {
            id: '123',
            post_id: '123',
            text: 'This is beatiful post',
            user: {
                userID: '123',
                userName: 'TrieuDeptrai',
                displayedName: 'Ngu ma li',
                Email: 'phannhattrieu012@gmail.com',
                Bio: '123',
                avatar: 'string'
            }
        },

    ]

    return (
        <>
            <div
                id="Comments"
                className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100%-310px)] border-t-2 overflow-auto"
            >
                <div className="pt-2" />
                {commentsByPost.length < 1 ? (
                    <div className='text-center mt-6 text-xl text-gray-500'>No Comment...</div>
                ) : (
                    <div>
                        {
                            commentsByPost.map((comment, index) => (
                                <SingleComment key={index} text={comment.text} user={comment.user} />
                            ))
                        }
                    </div>
                )}
                <div className="mb-28" />
            </div>
            <div
                id="CreateComment"
                className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
            >
                <div
                    className={`
                        bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]
                        ${inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'}
                    `}
                >
                    <input
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={e => setComment(e.target.value)}
                        value={comment || ''}
                        className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
                        type="text"
                        placeholder="Add comment..."
                    />
                </div>
                {!isUploading ? (
                    <button
                        disabled={!comment}
                        onClick={() => addComment()}
                        className={`
                            font-semibold text-sm ml-5 pr-1
                            ${comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'}
                        `}
                    >
                        Post
                    </button>
                ) : (
                    <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
                )}

            </div>

        </>
    )
}

export default CommentBody