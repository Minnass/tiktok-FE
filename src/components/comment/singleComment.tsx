import React from 'react'
import { SingleCommentProps } from '../../types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { BsTrash3 } from 'react-icons/bs'
import getDateString from '../../utils/convertDateToString'
import { getUserInfo } from '../../service/userService'
import axiosInstance from '../../aixos/axios'
import { motion } from 'framer-motion'
const SingleComment = ({ created_at, text, user, id, deleteHandler }: SingleCommentProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasPopUp, setHasPopUp] = useState<boolean>(false)
  const userInfo = getUserInfo();
  const date = new Date(created_at!);
  var value = getDateString(date);
  const showPopup = () => {
    setHasPopUp(true);
  }
  const deleteComment = () => {
    setIsDeleting(true);
    axiosInstance.delete(`/Comment/${id}`)
      .then((response) => {
        deleteHandler();
        setIsDeleting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDeleting(false);
      });
  }
  return (
    <>  
      {hasPopUp &&
        <motion.div
          initial={
            {
              scale: 0
            }
          }
          animate={{
            scale: 1
          }}
          className="fixed flex items-center justify-center z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50">
          <div className='relative text-center bg-white w-full max-w-[350px] p-4 z-50 rounded-lg'>
            <p className='font-bold'>Warning</p>
            <p className='text-gray-500 text-[15px] font-thin mb-6'>Do you want to delete this comment?</p>
            <button className='bg-[#ff2e2e] w-full border text-[20px] rounded-sm py-2 font-bold text-white hover:bg-red-600'
              onClick={() => deleteComment()}
            >
              Delete
            </button>
            <button className='text-[16px] hover:bg-gray-100 rounded-sm  py-2 border w-full mt-3 '
              onClick={() => setHasPopUp(false)}
            >
              Discard
            </button>
          </div>

        </motion.div>}
      <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
        <div className="flex items-center relative w-full">
          <Link to={`/${user?.userName}`}>
            <img
              className="absolute top-0 rounded-full lg:mx-0 mx-auto"
              width="40"
              src={(user?.avatar == null) ? require('../../utils/user.png') : require(user.avatar)}
              alt=''
            />
          </Link>
          <div className='ml-14 pt-0.5 w-full text-left'>
            <div className='text-[18px] font-semibold flex items-center justify-between'>
              <span className='flex items-center'>{user?.displayedName}
                <span className='text-[12px] text-gray-600 font-light ml-1'>
                  {value}
                </span>
              </span>
              {userInfo?.userId === user?.userId ? (
                <button
                  disabled={isDeleting}
                  onClick={() => showPopup()}
                >
                  {
                    isDeleting ? (
                      <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
                    ) : (
                      <BsTrash3 className="cursor-pointer" size="15" />
                    )}
                </button>
              ) : (null)}
            </div>
            <p className="text-[15px] font-light">{text}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleComment