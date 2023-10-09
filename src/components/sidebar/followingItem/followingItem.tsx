import React from 'react'
import { User } from '../../../types'
import { Link } from 'react-router-dom'
import { AiOutlineCheck } from 'react-icons/ai'
const FollowingUser = (user: User) => {
    return (
        <>
            <Link to={`/2`}
                className='flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2'
            >
                <img className='rounded-full lg:mx-0 mx-auto h-[35px] w-[35px] object-cover' src={user.avatar} />
                <div className='lg:pl-2.5 lg:block hidden min-w-0'>
                    <div className="flex items-center ]" >
                        <p className='font-bold text-[14px]  truncate'>{user.displayedName}</p>
                        <p className='ml-1 bg-[#58D5EC] rounded-full'>
                            <AiOutlineCheck className='p-[3px]' color='#FFFFFF' size='15' />
                        </p>
                    </div>
                    <p className='text-left font-light text-[12px] text-gray-600 truncate' >{user.userName}</p>
                </div>
            </Link>
        </>
    )
}

export default FollowingUser