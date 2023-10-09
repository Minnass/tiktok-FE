import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './menuItem/menuItem'
import FollowingUser from './followingItem/followingItem'

const Sidebar = () => {
  return (
    <>
      <div className={`fixed z-20 bg-white  h-full  lg:border-r-0 border-r w-[75px] overflow-auto
      ${!true ? 'lg:w-[310px]' : 'lg:w-[220px]'}
      `}>
        <div className='lg:w-full w-[55px]'>
          <Link to='/'>
            <MenuItem
              iconString="For You"
              colorString={true ? '#F02C56' : ''}
              sizeString="25"
            />
          </Link>
          <MenuItem iconString='Following' colorString='#000000' sizeString='25' />
          <MenuItem iconString='LIVE' colorString='#000000' sizeString='25' />
          <div className='border-b  lg:ml-2  mt-2' />
          <h3 className='lg:block hidden text-xs text-left text-gray-600 font-semibold pt-4 pb-2'>Suggested accounts</h3>
          <div className='lg:hidden block pt-3' />
          <FollowingUser avatar='https://placehold.co/35' displayedName='Triesddasd 22222222222222 22yyyyyyuu' userName='trieu12_'   />
          <button className='lg:block hidden text-[#F0C56] pt-1.5 pl-2 text-[13px]'>
            See all
          </button>
          {true ? (
            <div>
              <div className='border-b  lg:ml-2  mt-2' />
              <h3 className='lg:block hidden text-xs text-left text-gray-600 font-semibold pt-4 pb-2'>Following accounts</h3>
              <div className='lg:hidden block pt-3' />
              <FollowingUser avatar='https://placehold.co/35' displayedName='Triesddasd 22222222222222 22yyyyyyuu' userName='trieu12_'  />
              <button className='lg:block hidden text-[#F0C56] pt-1.5 pl-2 text-[13px]'>
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