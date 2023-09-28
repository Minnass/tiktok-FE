import React from 'react'
import Navbar from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'

type DefaultLayoutProps = {
    children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className='max-w-[1140px] pt-[70px] m-auto'> 
                <Sidebar /> 
                <div >
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default DefaultLayout