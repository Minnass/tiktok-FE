import React from 'react'
import { FaClock, FaTimes } from 'react-icons/fa'
import { SearchHistoryProps, SearchProps } from '../../../../types/searchProp'
import { SearchHistory } from '../../../../model/searchModel'
import { BASEURL } from '../../../../const/baseUrl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SearchService from '../../../../service/searchService'
import { error } from 'console'
import { useDispatch } from 'react-redux'
import { removeKeyWord } from '../../../../store/search'

const RecentSearchItem = (props: SearchHistoryProps) => {
    const navigater = useNavigate();
    const dispatch = useDispatch();
    const DeleteHistory = (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation();
        SearchService.removeSearch(props.historyItem?.searchId!)
            .then((status) => {
                dispatch(removeKeyWord(props.historyItem?.searchId!))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div
            onClick={() => {
                navigater(`/search/video?q=${props.historyItem?.keyWord}`)
            }}
            className='w-full p-1 flex items-center justify-between hover:bg-gray-100'>
            <div className='flex items-center '>
                <FaClock />
                <p className='ml-2'>{props.historyItem?.keyWord}</p>
            </div>
            <FaTimes className='cursor-pointer' onClick={DeleteHistory} />
        </div>
    )
}

export default RecentSearchItem