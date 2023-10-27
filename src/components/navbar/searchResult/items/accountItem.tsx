import React from 'react'
import { UserInfomation } from '../../../../model'
import { BASEURL } from '../../../../const/baseUrl'
import axios from 'axios'
import { SearchHistory } from '../../../../model/searchModel'
import { getUserInfo } from '../../../../service/userService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { selectFollowingUser } from '../../../../store/following'
import { addKeyWord, selectKeywords } from '../../../../store/search'
import { AccountItemProps } from '../../../../types/accountSearchItemProps'
import SearchService from '../../../../service/searchService'
import { useNavigate } from 'react-router-dom'
const AccountSearchItem = (props: AccountItemProps) => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        navigator(`/search/user?q=${props.user?.displayedName}`)
        const newItem: SearchHistory = {
            userId: getUserInfo()?.userId,
            keyWord: props.user?.displayedName
        }
        SearchService.addHistory(newItem)
            .then((data) => {
                dispatch(addKeyWord(newItem))
            })
            .catch((error) => { console.log(error) })
    }
    return (
        <div className='w-full p-1 flex cursor-pointer hover:bg-gray-100'
            onClick={clickHandler}
        >
            <img className='rounded-full object-cover' width="40" height="40" alt=''

                src={(props.user?.avatar != null) ? (`${BASEURL}${props.user.avatar}`) : require('../../../../utils/user.png')}
            />
            <div className='ml-2 truncate'>
                <p className='font-bold text-[15px]'>
                    {props.user?.displayedName}
                </p>
                <p className='truncate text-[14px]'>
                    {props.user?.userName}
                </p>
            </div>
        </div>
    )
}

export default AccountSearchItem