import React, { useEffect, useState } from 'react'
import { FollowRequest, UserInfomation } from '../../../model';
import { useNavigate } from 'react-router-dom';
import { FollowItemProps } from '../../../types/followItemProps';
import { getUserInfo } from '../../../service/userService';
import axios from 'axios';
import { BASEAPIURL, BASEURL } from '../../../const/baseUrl';
import { addFollowing, removeFollowing, selectFollowingUser, setFollowing } from '../../../store/following';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import FollowService from '../../../service/followService';

const FollowItem = (props: FollowItemProps) => {
  const dispatch = useDispatch()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const followingUser = useSelector((state: RootState) => selectFollowingUser(state));
  const userInfo = getUserInfo();
  useEffect(() => {
    setIsFollowing(followingUser.some(user => user.userId === props.user.userId!))
  }, [followingUser])
  const followOrUnFollow = (userId: number) => {
    const followRequest: FollowRequest = {
      followerId: userInfo?.userId,
      followedId: userId
    };
    FollowService.followOrUnFollow(followRequest)
      .then((status) => {
        if (status) {
          console.log('OK')
          if (isFollowing) {
            dispatch(removeFollowing((props.user?.userId)!));
          }
          else {
            dispatch(addFollowing(props.user));
          }
          setIsFollowing(prev => !prev);
        }
      })
      .catch((error) => { console.log(error) })
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
        <img
          className='rounded-full object-cover'
          src={(props.user.avatar == null) ? require('../../../utils/user.png') : `${BASEURL}${props.user.avatar}`} height={48} width={48} />
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