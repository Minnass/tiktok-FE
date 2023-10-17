import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DefaultLayout } from '../../components';

const SearchPage = () => {
  const location = useLocation();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');
  useEffect(() => {
    if (location.pathname.includes('video')) {
      setActive(0)
    }
    else {
      setActive(1);
    }
  }, [location])
  const [active, setActive] = useState<number>(0);

  const tabs = [
    { aKey: "video", title: "Video", link: 'video' },
    { aKey: "account", title: "Account", link: 'user' }
  ]

  return (
    <DefaultLayout>
      <div className='  lg:ml-[310px] ml-[75px] '>
        <div className=' flex border-b max-w-[750px] w-full'>
          {tabs.map((item, index) => (
            <Link to={`${item.link}?q=${query}`} onClick={() => setActive(index)} key={index}>
              <div className={`relative py-2 px-4 h-[50px] ${(active == index) ? 'text-red-500 shadow-sm border-b-red-400  border ' : 'text-gray-500'} text-[16px] cursor-pointer font-bold`}>{item.title}</div>
            </Link>
          ))}
        </div>
        <div className='p-3'>
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default SearchPage