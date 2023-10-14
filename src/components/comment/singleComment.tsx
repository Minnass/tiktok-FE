import React from 'react'
import { SingleCommentProps } from '../../types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { BsTrash3 } from 'react-icons/bs'
const SingleComment = ({ created_at, text, user }: SingleCommentProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteThisComment = () => {
    setIsDeleting(true);
  }
  const date = new Date(created_at!);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0'); // Get hours

  const currentDate = new Date();
  const timeDifference = +currentDate - +date; // Calculate the time difference in milliseconds
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
  var value: string = "";
  if (timeDifference > oneDayInMilliseconds) {
    value = `${month}-${day}-${year}`;
  } else {
    const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000)); // Convert to hours
    value = `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
  }
  return (
    <>

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