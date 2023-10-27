import React from 'react'
import { Navbar } from '../../components'

const NotFoundPage = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-screen -mt-[60px]'>
                <div className=' text-[300px] flex items-center'>
                    <span>4</span>
                    <img height="244" width="244" className='object-cover' src={require('../../utils/notFoundIcon.png')} />
                    <span>4</span>
                </div>
                <p>Couldn't find this page</p>
            </div>

        </>
    )
}

export default NotFoundPage