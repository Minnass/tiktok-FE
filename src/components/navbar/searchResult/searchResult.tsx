import React, { useEffect, useState } from 'react'
import { SearchProps } from '../../../types/searchProp'
import { SearchHistory } from '../../../model/searchModel';
import { UserInfomation } from '../../../model';
import RecentSearchItem from './items/recentSearchItem';
import AccountSearchItem from './items/accountItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { selectFollowingUser } from '../../../store/following';
import { addKeyWord, selectKeywords } from '../../../store/search';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../service/userService';
import SearchService from '../../../service/searchService'
import { error } from 'console';
const SearchResult = (props: SearchProps) => {
    const userInfo = getUserInfo();
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const totalHistory = useSelector((state: RootState) => selectKeywords(state));
    const [histories, setHistories] = useState<SearchHistory[]>([]);
    const [accounts, setAccount] = useState<UserInfomation[]>([]);
    const followingUser = useSelector((state: RootState) => selectFollowingUser(state));
    useEffect(() => {
        if (props.keyWord != null && props.keyWord.length !== 0) {
            setAccount(followingUser.filter(x => x.displayedName?.includes(props.keyWord!) ||
                x.userName === props.keyWord
            ))
            setHistories([])
        }
        else {
            setAccount([]);
            setHistories(totalHistory);
        }

    }, [props.keyWord,totalHistory])

    return (
        <div className='absolute text-[16px] hiden bg-white h-[440px] w-full z-20 left-0 top-12 border p-4'>
            {histories.length > 0 &&
                <div>
                    <p>Recent searches</p>
                    {histories.map((item, index) => (
                        <RecentSearchItem key={index} historyItem={item} />
                    ))}
                </div>
            }
            {accounts.length > 0 &&
                <div>
                    <p className='font-bold'>Accounts</p>
                    {
                        accounts.map((item, index) => (
                            <AccountSearchItem search={props.keyWord}
                                user={item}
                            />
                        ))
                    }
                </div>
            }
            <p
                onClick={() => {
                    if (userInfo != null) {
                        const model: SearchHistory = {
                            keyWord: props.keyWord,
                            userId: userInfo?.userId
                        }
                        console.log(model);
                        SearchService.addHistory(model)
                            .then((data) => {
                                dispatch(addKeyWord(data!));
                            })
                            .catch((error) => {

                            })
                    }
                    navigator(`/search/video?q=${props.keyWord}`);
                }}
                className='font-bold text-[15px] cursor-pointer'>{`See all results for '${props.keyWord}'`}</p>
        </div>
    )
}

export default SearchResult