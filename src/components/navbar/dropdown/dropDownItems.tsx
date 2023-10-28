import React from 'react'
import { BiCommentDetail, BiLogOut, BiUser } from 'react-icons/bi'
import { MenuProps } from '../../../types/menuProps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '../../../service/userService'
import {  setLoggedOut } from '../../../store/auth'

const Menu = (props: MenuProps) => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    return (
        <div className='absolute bg-white rounded-lg py-1.5 w-[150px]  shadow-xl border top-[50px] right-0'
            onMouseLeave={() => props.onMouseLeavehandler()}
        >
            <button
                onClick={() => navigator(`/${getUserInfo()?.userName}`)}
                className='flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer'>
                <BiUser size='20' />
                <span className='pl-2 font-semibold text-sm '>Edit Profile</span>
            </button>
            <button
            onClick={()=>{
                navigator('/feedback')
            }}
            className='flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer'>
                <BiCommentDetail size='20' />
                <span className='pl-2 font-semibold text-sm'>Feed Back</span>
            </button>
            <button
            onClick={()=>{
                dispatch(setLoggedOut())
                props.onMouseLeavehandler()
                window.location.reload()
            }}
            className='flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer'>
                <BiLogOut size='20' />
                <span className='pl-2 font-semibold text-sm'>Log Out</span>
            </button>
        </div>
    )
}

export default Menu