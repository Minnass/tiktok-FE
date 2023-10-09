import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { VideoItem } from '../../types'
import { CommentBody, CommentHeader } from '../../components'


const PostPage = () => {
  const post: VideoItem = {
    caption: 'Trieu dep trai',
    comments: 1,
    likes: 2,
    shares: 3,
    profile: {

    },
    videoURL: '../../utils/beach.mp4'
  }

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-screen h-screen bg-black "
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <button
            //  onClick={()={}
            className="absolute text-white z-20 m-5 top-0 left-0 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <AiOutlineClose size="27" />
          </button>
          <div >
            <button
              // onClick={() => loopThroughPostsUp()}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronUp size="30" color="#FFFFFF" />
            </button>
            <button
              // onClick={() => loopThroughPostsDown()}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
            >
              <BiChevronDown size="30" color="#FFFFFF" />
            </button>
          </div>

          {post.videoURL ? (
            <video
              className="fixed object-cover w-full my-auto  h-screen"
              src={require('../../utils/beach.mp4')}
            />
          ) : null}

          <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
            {true ? (
              <video
                autoPlay
                controls
                loop
                muted
                className="h-screen mx-auto"
                src={require('../../utils/beach.mp4')}
              />
            ) : null}
          </div>
        </div>
        <div id="InfoSection" className="lg:max-w-[550px] relative overflow-auto w-full h-full bg-white">

          {
            post ?
              (<CommentHeader caption='Trieu dep trai' />)
              : (null)}
          <CommentBody />
        </div>
      </div>
    </>)
}

export default PostPage