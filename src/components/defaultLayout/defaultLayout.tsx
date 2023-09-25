import React from 'react'
import Navbar from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'

type DefaultLayoutProps = {
    children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
    return (
        <div>
            <Navbar />
            <div className=''>
                <Sidebar />
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout