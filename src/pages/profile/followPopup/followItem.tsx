import React, { useEffect, useState } from 'react'
import { FollowRequest, UserInfomation } from '../../../model';
import { useNavigate } from 'react-router-dom';
import { FollowItemProps } from '../../../types/followItemProps';
import { getUserInfo } from '../../../service/userService';
import axios from 'axios';
import { BASEAPIURL } from '../../../const/baseUrl';
import { addFollowing, removeFollowing, selectFollowingUser, setFollowing } from '../../../store/following';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

const FollowItem = (props: FollowItemProps) => {
  const dispatch = useDispatch()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const followingUser = useSelector((state: RootState) => selectFollowingUser(state));
  const userInfo = getUserInfo();
  useEffect(() => {
    setIsFollowing(followingUser.includes(props.user.userId!))
  }, [followingUser])
  const followOrUnFollow = (userId: number) => {
    const token = localStorage.getItem('token');
    const _axios = axios.create({
      baseURL: BASEAPIURL,
      headers: {
        'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
        'Content-Type': 'application/json', // Set the content type if needed
      },
    });
    const followRequest: FollowRequest = {
      followerId: userInfo?.userId,
      followedId: userId
    };


    _axios.post('Follow', followRequest)
      .then((response) => {
        if (isFollowing) {
          console.log('ok')
          dispatch(removeFollowing((props.user?.userId)!));
        }
        else {
          dispatch(addFollowing((props.user?.userId)!));
        }
        setIsFollowing(prev => !prev);
      })
      .catch((error) => { })
  };

  const navigator = useNavigate();
  return (
    <div className='p-2 flex items-center justify-between cursor-pointer'
      onClick={() => {
        navigator(`/${props.user.userName}`);
        props.closePopUpHandler();
      }
      }
    >
      <div className='flex'>
        <img src={(props.user.avatar == null) ? require('../../../utils/user.png') : props.user.avatar} height={48} width={48} />
        <div className='max-w-[200px] ml-3'>
          <p className='text-[16px] font-extrabold truncate'>
            {props.user.displayedName}
          </p >
          <p className='text-[15px] font-light truncate'>
            {props.user.userName}
          </p>
        </div>
      </div>

      {userInfo && userInfo.userId !== props.user.userId &&
        <button onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
          followOrUnFollow(props.user.userId!);
        }} className="flex item-center rounded-md py-1.5 px-4 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
          {isFollowing ? 'Following' : 'Follow'}
        </button>}
    </div>
  )
}

export default FollowItem