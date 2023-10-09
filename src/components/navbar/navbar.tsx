import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store/store';
import { setLoginRequestStatus, selectIsLoginRequest, selectIsLoggedIn } from '../../store/auth'
import { useSelector, useDispatch } from 'react-redux';
import { setNextRouter } from '../../store/nextRouter'

const logo_path = require('../../utils/tikter.png');

const Navbar = () => {
  //redux section
  const isLoggedIRequest = useSelector((state: RootState) => selectIsLoginRequest(state));
  const isLoggedIn=useSelector((state:RootState)=>selectIsLoggedIn(state));
  const dispatch: AppDispatch = useDispatch();
  //
  const navigater = useNavigate();
  const handleSearchName = (event: { target: { value: string } }) => {
    console.log(event.target.value);
  }

  const uploadHandler = () => {
    if (!isLoggedIRequest&&!isLoggedIn) {
      dispatch(setLoginRequestStatus(true));
      dispatch(setNextRouter('./upload'))
      return;
    }
    navigater('/upload');
  }
  const loginHandler=()=>{
    dispatch(setLoginRequestStatus(true));
  }
  return (
    <>
      <div id="TopNav" className='fixed bg-white z-30 flex items-center w-full border-b h-[60px] '>
        <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto  max-w-[1140px] `}>
          <Link to='/'>
            <img className='max-h-full w-[115px]' src={logo_path} alt='Logo' />
          </Link>
          <div className='relative hidden w-full md:flex items-center justify-end bg-[#F1F1F2] rounded-full max-w-[430px]'>
            <input type="text"
              onChange={handleSearchName}
              className='w-full  caret-red-600 pl-3 py-1  border-r bg-transparent placeholder-[#838383] text-[15px] focus:outline-none'
              placeholder='Search accounts'
            />
            <div className='absolute hidden bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1'>
              <div className='p-1'>
                <a href={`/profile/1`}
                  className='flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white'
                >
                  <div className='flex items-center'>
                    <img className='rounded-md' width="40" src='https://placehold.co/40' alt='' />
                    <div className='truncate ml-2'>John Week</div>
                  </div>
                </a>
              </div>
            </div>
            <div className=' flex items-center p-3 justify-center  active:bg-stone-200 rounded-r-full '>
              <BiSearch color="#A1A2A7" size="22" />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={uploadHandler}
              className='flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5' >
              <AiOutlinePlus color="#000000" size="22" />
              <span className='px-2 font-medium text-[15px]' >Upload</span>
            </button>
            {!isLoggedIn ? (
              <div className='flex items-center'>
                <button className='flex items-center h-full bg-[#F02C56] text-white border rounded-md px-3 py-[6px]'>
                  <span className='whitespace-nowrap mx-4 font-medium text-[15px]'
                  onClick={()=>loginHandler()}
                  >Log in</span>
                </button>
                <BsThreeDotsVertical color='#161724' size='25' />
              </div>
            ) : (
              <div className='flex items-center'>
                <div className='relative'>
                  <button className='mt-1 border border-gray-200 rounded-full'>
                    <img className='rounded-full w-[35px] h-[35px]' src='https://placehold.co/35' />
                  </button>
                  <div className='hidden absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[50px] right-0'>
                    <button className='flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer'>
                      <BiUser size='20' />
                      <span className='pl-2 font-semibold text-sm'>Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar