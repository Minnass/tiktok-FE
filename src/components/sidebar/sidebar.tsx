import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuItem from './menuItem/menuItem'
import FollowingUser from './followingItem/followingItem'
import { MenuItemModel, UserInfomation } from '../../model'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { selectIsLoggedIn } from '../../store/auth'
import axiosInstance from '../../aixos/axios'
import { FollowingCollection } from '../../model/collection/pagedFollowingCollection'
import { getUserInfo } from '../../service/userService'
import { error } from 'console'
import { BASEAPIURL } from '../../const/baseUrl'
import axios from 'axios'
import { SuggestedUser } from '../../model/collection/suggestedUser'
const Sidebar = () => {
  const baseUrl = BASEAPIURL;
  const navigator = useNavigate();
  const userInfo = getUserInfo();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  const [followingPageNumber, setFollowingPageNumber] = useState<number>(1);
  const [suggestedPageNumber, setSuggestedPageNumber] = useState<number>(1);
  const [itemsMenu, setItemsMenu] = useState<MenuItemModel[]>([
    { colorString: "F02C56", iconString: "For You", sizeString: "25", link: "/" },
    { colorString: "F02C56", iconString: "Following", sizeString: "25", link: "/following" },
    { colorString: "F02C56", iconString: "LIVE", sizeString: "25", link: "/live" },
  ]);

  const [followingUsers, setFollowingUser] = useState<UserInfomation[]>([])
  const [suggestedUsers, setSuggestedUser] = useState<UserInfomation[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Update the active item based on the current route
    setItemsMenu((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        colorString: location.pathname === item.link ? "F02C56" : "",
      }))
    );
  }, [location]);

  useEffect(() => {
    const model: FollowingCollection = {
      userId: userInfo?.userId,
      pageNumber: followingPageNumber,
      pageSize: 2
    }
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const _axios = axios.create({
        baseURL: baseUrl,
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Bearer token to the request header
          'Content-Type': 'application/json', // Set the content type if needed
        },
      });

      _axios.post('Follow/GetFollowingForPaged', model)
        .then((response) => {
          setFollowingUser(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [isLoggedIn, followingPageNumber]);

  useEffect(() => {
    const model: SuggestedUser = {
      userId: userInfo?.userId,
      pageNumber: suggestedPageNumber,
      pageSize: 2
    }

    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const _axios = axios.create({
        baseURL: baseUrl,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      _axios.post(`User/GetSuggestedUsers/`, model)
        .then((response) => {
          const suggestedUsers: UserInfomation[] = response.data.data;
          const notFollowingSuggestedUsers = suggestedUsers.filter(suggestedUser => {
            // Check if the suggested user's userId is not in the followingUsers array
            return !followingUsers.some(followingUser => followingUser.userId === suggestedUser.userId)
              ;
          });
          setSuggestedUser(notFollowingSuggestedUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn, suggestedPageNumber, followingUsers]);

  return (
    <>
      <div className={`fixed z-20 bg-white  h-full  lg:border-r-0 border-r w-[75px] overflow-auto
      ${!true ? 'lg:w-[310px]' : 'lg:w-[220px]'}
      `}>
        <div className='lg:w-full w-[55px]'>
          {itemsMenu.map((item, index) => (
            <div className='cursor-pointer' key={index} onClick={() => {
              navigator(item.link)
            }}>
              <MenuItem
                sizeString='25'
                iconString={item.iconString}
                colorString={item.colorString}
              />
            </div>
          ))}
          {suggestedUsers.length > 0 ? (<>
            <div className='border-b  lg:ml-2  mt-2' />
            <h3 className='lg:block hidden text-xs text-left text-gray-600 font-semibold pt-4 pb-2'>Suggested accounts</h3>
            <div className='lg:hidden block pt-3' />
            {suggestedUsers.map((user, index) => (
              <FollowingUser key={index} avatar={user.avatar}
                displayedName={user.displayedName}
                userName={user.userName} />
            ))}

            <button className='lg:block hidden text-[#F0C56] pt-1.5 pl-2 text-[13px]'
              onClick={() => { setSuggestedPageNumber(prev => prev + 1) }}
            >
              See more
            </button></>) : null}
          {followingUsers.length > 0 ? (
            <div>
              <div className='border-b  lg:ml-2  mt-2' />
              <h3 className='lg:block hidden text-xs text-left text-gray-600 font-semibold pt-4 pb-2'>Following accounts</h3>
              <div className='lg:hidden block pt-3' />
              {followingUsers.map((user, index) => (
                <FollowingUser key={index} avatar={user.avatar}
                  displayedName={user.displayedName}
                  userName={user.userName} />
              ))}
              <button
                onClick={() => { setFollowingPageNumber(prev => prev + 1) }}
                className='lg:block hidden text-[#F0C56] pt-1.5 pl-2 text-[13px]'>
                See more
              </button>
            </div>
          ) : null}
          <div className="lg:block hidden border-b lg:ml-2 mt-2" />
          <div className="lg:block hidden text-[11px] text-gray-500 text-left">
            <p className="pt-4 px-2">About Newsroom TikTer Shop Contact Careers ByteDance</p>
            <p className="pt-4 px-2">TikTer for Good Advertise Developers Transparency TikTer Rewards TikTer Browse TikTer Embeds</p>
            <p className="pt-4 px-2">Help Safety Terms Privacy Creator Portal Community Guidelines</p>
            <p className="pt-4 px-2">© 2023 TikTer</p>
          </div>

          <div className="pb-14"></div>
        </div>
      </div>
    </>
  )
}

export default Sidebar