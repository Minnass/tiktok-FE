import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FollowPopUpProps } from '../../../types/followPopupProps'
import { UserInfomation } from '../../../model'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getUserInfo } from '../../../service/userService'
import { useSelector } from 'react-redux'
import { selectFollowingUser } from '../../../store/following'
import { RootState } from '../../../store/store'

const FollowPopUp = (props: FollowPopUpProps) => {
    const userInfo = getUserInfo();
    const navigator = useNavigate();
    const [followerMode, setFollowerMode] = useState<boolean>(true)
    const [userList, setUserList] = useState<UserInfomation[] | null>([]);
    const followingUser = useSelector((state: RootState) => selectFollowingUser(state));

    useEffect(() => {
        setFollowerMode(props.mode)
    }
        , [props]
    )
    useEffect(() => {
        if (followerMode) {
            setUserList(props.followModel?.followings!)
        }
        else {
            setUserList(props.followModel?.followers!)
        }
    }, [followerMode])
    return (
        <div

            className='fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50'>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-6 relative bg-white w-full h-screen mt-10 flex flex-col  max-w-[470px] rounded-lg">
                <p className='text-[18px] text-center font-bold'>{props.displayedName}</p>
                <FaTimes onClick={() => props.closeButtonHandler()} size={25} className='absolute cursor-pointer right-5 top-4' />
                <div className='flex border-b justify-center'>
                    <div onClick={() => setFollowerMode(prev => !prev)} className={` cursor-pointer flex px-8 py-3  mr-4 ${(followerMode) ? 'border-black border-b-2' : ''}  `}>
                        <p className='text-[16px]  mr-2 '> Follower</p>
                        <p className='text-[16px]'> {props.followModel?.followers.length}</p>
                    </div>
                    <div onClick={() => setFollowerMode(prev => !prev)} className={` cursor-pointer flex px-8 py-3 ${(!followerMode) ? 'border-black border-b-2' : ''}`}>
                        <p className='text-[16px] mr-2' > Following</p>
                        <p className='text-[16px]'> {props.followModel?.followings.length}</p>
                    </div>
                </div>
                {userList &&
                    userList.map((user, index) => (
                        <div key={index} className='p-2 flex items-center justify-between cursor-pointer'
                            onClick={() => {
                                navigator(`/${user.userName}`);
                                props.closeButtonHandler()
                            }

                        }
                        >
                            <div className='flex'>
                                <img src={(user.avatar == null) ? require('../../../utils/user.png') : user.avatar} height={48} width={48} />
                                <div className='max-w-[200px] ml-3'>
                                    <p className='text-[16px] font-extrabold truncate'>
                                        {user.displayedName}
                                    </p >
                                    <p className='text-[15px] font-light truncate'>
                                        {user.userName}
                                    </p>
                                </div>
                            </div>

                            {userInfo && userInfo.userId !== user.userId && <button className="flex item-center rounded-md py-1.5 px-4 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                                {followingUser.includes(user.userId!) ? 'Following' : 'Follow'}
                            </button>}
                        </div>
                    ))
                }

            </motion.div >
        </div>
    )
}

export default FollowPopUp