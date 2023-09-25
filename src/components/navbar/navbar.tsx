import React from 'react'
import {BiSearch} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
const logo_path = require('../../utils/tikter.png');
const Navbar = () => {
  const handleSearchName = (event: { target: { value: string } }) => {
    console.log(event.target.value);
  }
  const uploadHandler=()=>{
    console.log('Treee');
  }
  return (
    <>
      <div id="TopNav" className='fixed bg-white z-30 flex items-center w-full border-b h-[60px]'>
        <div className='flex items-center justify-between gap-6 w-full px-4 mx-auto max-w-[1150px]'>
          <a href='/'>
            <img className='max-h-full w-[115px]' src={logo_path} alt='Logo' />
          </a>
          <div className='relative hidden w-full md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px]'>
            <input type="text"
              onChange={handleSearchName}
              className='w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none'
              placeholder='Search accounts'
            />
            <div className='absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1'>
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
            <div className='px-3 py-1 flex items-center border-l border-l-gray-300'>
              <BiSearch color="#A1A2A7" size="22"/> 
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={uploadHandler}
              className='flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5'
              >
                <AiOutlinePlus color="#000000" size="22"/>
                <span className='px-2 font-medium text-[15px]' >Upload</span>  
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar