import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { VideoItem } from '../../types'
import { CommentBody, CommentHeader } from '../../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { VideoModel } from '../../model'
import axiosInstance from '../../aixos/axios'
import { BASEAPIURL, BASEURL } from '../../const/baseUrl'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { selectCurrentVideos, selectPreviousRoute } from '../../store/currentListVideo'
import { parseNumber } from 'react-advanced-cropper'

const PostPage = () => {
  const navigator = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { postID } = useParams();

  const [post, setPost] = useState<VideoModel | null>(null);
  const currentVideos = useSelector((state: RootState) => selectCurrentVideos(state));
  const previousRoute = useSelector((state: RootState) => selectPreviousRoute(state));
  useEffect(() => {

  }, [currentVideos])
  const fetchData = () => {
    axiosInstance.get(`Post/${postID}`)
      .then((response) => {
        setPost(response.data.data);

      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    fetchData();
  }, [postID]);
  useEffect(() => {
    const index = currentVideos?.findIndex(x => x.videoId === parseNumber(postID!))
    setCurrentIndex(index!);
  }, [postID])
  const gotoPreviousVideo = () => {
    const previousVideo = currentVideos![currentIndex! - 1];
    navigator(`/${previousVideo.user?.userName}/${previousVideo.videoId}`)
  }
  const gotoNextVideo = () => {
    const nextVideo = currentVideos![currentIndex! + 1];
    console.log(nextVideo);
    navigator(`/${nextVideo.user?.userName}/${nextVideo.videoId}`)
  }
  return (
    <>
      <div
        id="PostPage"
        className="lg:flex justify-between w-screen h-screen bg-black "
      >
        <div className="lg:w-[calc(100%-540px)] h-full  relative">
          <button
            onClick={() => {
              navigator(previousRoute);
            }
            }
            className="absolute text-white cursor-pointer z-20 m-5 top-0 left-0 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
            <AiOutlineClose size="27" />
          </button>
          <div >
            {currentIndex != 0 &&
              <button
                onClick={gotoPreviousVideo}
                className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
              >
                <BiChevronUp size="30" color="#FFFFFF" />
              </button>
            }
            {currentIndex != currentVideos?.length! - 1 &&
              <button
                onClick={gotoNextVideo}
                className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
              >
                <BiChevronDown size="30" color="#FFFFFF" />
              </button>
            }
          </div>

          {true ? (
            <video
              className="fixed object-cover w-full my-auto  h-screen"
              src={`${BASEURL}${post?.videoUrl}`}
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
                src={`${BASEURL}${post?.videoUrl}`}
              />
            ) : null}
          </div>
        </div>
        <div id="InfoSection" className="lg:max-w-[550px] relative overflow-auto w-full h-full bg-white">
          {
            post ?
              (<CommentHeader
                caption={post.caption}
                comments={post.comment}
                likes={post.like}
                videoId={post.videoId}
                // shares={post.}
                hasTag={post.hasTag}
                profile={{ userID: post.user!.userId, avatar: post.user!.avatar, displayedName: post.user!.displayedName, userName: post.user!.userName }}
                uploadDate={post.uploadDate}
                videoURL={post.videoUrl}
              />)
              : (null)}
          <CommentBody
            newItemHandler={fetchData}
            videoItems={{
              caption: post?.caption, hasTag: post?.hasTag, comments: post?.comment, likes: post?.like, profile: post?.user,
              // shares:post.shares
              uploadDate: post?.uploadDate,
              videoId: post?.videoId,
              videoURL: post?.videoUrl
            }}
          />
        </div>
      </div>
    </>)
}

export default PostPage