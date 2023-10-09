import React from 'react'
import { SingleCommentProps } from '../../types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { BsTrash3 } from 'react-icons/bs'

const SingleComment = ({ created_at, text, user }: SingleCommentProps) => {
  console.log(user, text);
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteThisComment = () => {
    console.log('Dang xoa comment');
    setIsDeleting(true);
  }
  return (
    <>

      <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
        <div className="flex items-center relative w-full">
          <Link to={`/${user?.userName}`}>
            <img
              className="absolute top-0 rounded-full lg:mx-0 mx-auto"
              width="40"
              src={require('../../utils/user.png')}
              alt=''
            />
          </Link>
          <div className='ml-14 pt-0.5 w-full text-left'>
            <div className='text-[18px] font-semibold flex items-center justify-between'>
              <span className='flex items-center'>{user?.displayedName}
                <span className='text-[12px] text-gray-600 font-light ml-1'>
                  {true ? ('17-09') : (created_at?.toString())}
                </span>
              </span>
              {true ? (
                <button
                  disabled={isDeleting}
                  onClick={() => deleteThisComment()}
                >
                  {isDeleting
                    ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
                    : <BsTrash3 className="cursor-pointer" size="15" />
                  }
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