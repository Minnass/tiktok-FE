import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FollowPopUpProps } from '../../../types/followPopupProps'
import { FollowRequest, UserInfomation } from '../../../model'
import { motion } from 'framer-motion'
import { getUserInfo } from '../../../service/userService'
import axios from 'axios'
import { BASEAPIURL } from '../../../const/baseUrl'
import FollowItem from './followItem'

const FollowPopUp = (props: FollowPopUpProps) => {
  
    const [followerMode, setFollowerMode] = useState<boolean>(true)
    const [userList, setUserList] = useState<UserInfomation[] | null>([]);
    useEffect(() => {
        setFollowerMode(props.mode)
    }
        , [props]
    )
    useEffect(() => {
        if (followerMode) {
            setUserList(props.followModel?.followers!)
        }
        else {
            setUserList(props.followModel?.followings!)
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
                        <FollowItem user={user} closePopUpHandler={props.closeButtonHandler} key={index} />
                    ))
                }

            </motion.div >
        </div>
    )
}

export default FollowPopUp