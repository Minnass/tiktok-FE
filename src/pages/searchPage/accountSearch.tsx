import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserInfomation } from '../../model';
import axios from 'axios';
import { error } from 'console';
import { BASEURL } from '../../const/baseUrl';

const AccountSearch = () => {
    const navigator=useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');
    const [accountList, setAccountList] = useState<UserInfomation[]>([])
    useEffect(() => {
        const _axios = axios.create({
            baseURL: BASEURL,
            headers: {
                'Content-Type': 'application/json', // Set the content type if needed
            },
        });
        _axios.get(`User/${query}`)
            .then((response) => {
                setAccountList(response.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])
    return (
        <>
            {
                accountList.map((item, index) => (
                    <div key={index} 
                    onClick={()=>navigator(`/${item.userName!}`)}
                    className='
                    flex items-center p-3 cursor-pointer hover:bg-gray-200'>
                        <img height={60} width={60} className='rounded-full h-full ' src={(item.avatar != null) ? item.avatar : require('../../utils/user.png')} />
                        <div className='flex h-full flex-col ml-3 w-full'>
                            <p className='font-bold truncate text-[17px]'>{item.displayedName}</p>
                            <p className='font-extralight truncate text-[15px]'>{item.userName}</p>
                            <p className='font-extralight truncate text-[15px]'>{item.bio}</p>

                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default AccountSearch