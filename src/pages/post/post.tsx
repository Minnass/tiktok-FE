import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'


const PostPage = () => {

  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
         <button
            //click navigate back to link
            className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <AiOutlineClose size="27" />
        </button>

        </div>
      </div>
    </>)
}

export default PostPage