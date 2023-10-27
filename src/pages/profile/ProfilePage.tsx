import React, { useEffect } from 'react';
import { BsPencil } from "react-icons/bs";
import PostUser from '../../components/main/video/postUser';
import { DefaultLayout, EditProfileOverlay } from '../../components';
import { useState } from 'react';
import { FollowModel, FollowRequest, UserInfomation, VideoModel } from '../../model';
import axiosInstance from '../../aixos/axios';
import { useLocation, useParams } from 'react-router-dom';
import { getUserInfo } from '../../service/userService';
import FollowPopUp from './followPopup/FollowPopUp';
import { selectIsLoggedIn, setLoginRequestStatus } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addFollowing, removeFollowing } from '../../store/following';
import axios from 'axios';
import { BASEAPIURL, BASEURL } from '../../const/baseUrl';
import FollowService from '../../service/followService';

export const ProfilePage = () => {
    const userInfo = getUserInfo();
    const location = useLocation();
    const { userName } = useParams();
    const [user, setUser] = useState<UserInfomation | null>(null);
    const [videoList, setVideoList] = useState<VideoModel[]>([]);
    const [followSection, setFollowSection] = useState<FollowModel | null>(null);
    const [openedProfileEditor, setOpenedProfileEditor] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [hasFollowPopUp, setHasFollowPopUp] = useState<boolean>(false);
    const [followersMode, setFollowersMode] = useState<boolean>(false);
    const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
    const dispatch = useDispatch();
    useEffect(() => {
        axiosInstance.get(`User/getUserInfo/${userName}`)
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [location]);
    useEffect(() => {
        if (user) {
            axiosInstance.get(`Post/GetVideosForUser/${user?.userId}`)
                .then((response) => {
                    setVideoList(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [user]);
    useEffect(() => {
        if (user) {
            axiosInstance.get(`Follow/${user?.userId}`)
                .then((response) => {
                    setFollowSection(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);
    useEffect(() => {
        setIsFollowing(followSection?.followers.some(x => x.userId === getUserInfo()?.userId) || false);
    },
        [followSection]);

    const showPopUp = (mode: boolean) => {
        setHasFollowPopUp(true);
        if (mode !== followersMode)
            setFollowersMode(mode);
    };
    const followOrUnFollow = () => {
        if (!isLoggedIn) {
            dispatch(setLoginRequestStatus(true))
        }
        else {
            const followRequest: FollowRequest = {
                followerId: userInfo?.userId,
                followedId: user?.userId
            };
            FollowService.followOrUnFollow(followRequest)
                .then((status) => {
                    if (status) {
                        if (isFollowing) {
                            dispatch(removeFollowing((user?.userId)!));
                        }
                        else {
                            dispatch(addFollowing(user!));
                        }
                        setIsFollowing(prev => !prev)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    };

    return (
        <DefaultLayout>
            {user ? (
                <>
                    {hasFollowPopUp && <FollowPopUp mode={followersMode} closeButtonHandler={() => { setHasFollowPopUp(false); }} displayedName={user.displayedName} followModel={followSection!} />}
                    {openedProfileEditor && <EditProfileOverlay openedProfileEditorListener={setOpenedProfileEditor} />}
                    <div className="ml-[90px] min-w-[460px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                        <div className="flex ">
                            {user ? (
                                <img className="w-[116px] min-w-[116px] rounded-full" src={(user.avatar == null) ? require('../../utils/user.png') : `${BASEURL}${user.avatar}`} />
                            ) : (
                                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                            )}

                            <div className="ml-5 w-full text-left">

                                {(user)?.displayedName ? (
                                    <div>
                                        <p className="text-[30px] font-bold truncate">{user.displayedName}</p>
                                        <p className="text-[18px] truncate">{user?.userName}</p>
                                    </div>
                                ) : (
                                    <div className="h-[60px]" />
                                )}

                                {getUserInfo()?.userId === user.userId ? (
                                    <button
                                        onClick={() => setOpenedProfileEditor(true)}
                                        className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                                    >
                                        <BsPencil className="mt-0.5 mr-1" size="18" />
                                        <span>Edit profile</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={followOrUnFollow}
                                        className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                )}
                            </div>

                        </div>
                        <div className="flex items-center pt-4">
                            <div className="mr-4" onClick={() => showPopUp(false)}>
                                <span className="font-bold cursor-pointer ">{followSection?.followings.length}</span>
                                <span className="text-gray-500 hover:underline cursor-pointer font-light text-[15px] pl-1.5">Following</span>
                            </div>
                            <div className="mr-4" onClick={() => showPopUp(true)}>
                                <span className="font-bold cursor-pointer ">{followSection?.followers.length}</span>
                                <span className="text-gray-500 hover:underline cursor-pointer font-light text-[15px] pl-1.5">Followers</span>
                            </div>
                        </div>
                        <p className="text-left pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                            {(user.bio) ? (user.bio) : ('No bio yet.')}
                        </p>

                        <ul className="w-full flex items-center pt-4 border-b">
                            <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                            <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Liked</li>
                        </ul>
                        <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                            {videoList.map((video, index) => (
                                <PostUser comments={video.comment} likes={video.like} videoURL={video.videoUrl} videoId={video.videoId} shares={12} caption={video.caption} key={index} />
                            ))}

                        </div>

                        <div className="pb-20" />
                    </div>
                </>
            ) : (
                <div className='lg:ml-[310px] flex-col ml-[75px] mt-[60px] text-center   flex justify-center items-center'>
                    <img height={90} width={90} src={require('../../utils/userNotFound.png')} />
                    <p className='text-[18px] font-black'>
                        Couldn't find this account
                    </p>
                    <p className='text-[16px] font-extralight text-center'>
                        Looking for videos? Try browsing our trending creators, hashtags, and sounds.
                    </p>
                </div>
            )}
        </DefaultLayout>
    );
};
