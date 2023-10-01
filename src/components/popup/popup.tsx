import React from 'react'
import { PopUpModel } from '../../props'
import { motion } from 'framer-motion'

const PopUp = ({ tittle, content, firstOption, secondOption, eventListener }: PopUpModel) => {
    const optionHandler = (option: boolean) => {
        eventListener(option)
    }
    return (
        <>
            <div
                className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.2)] flex justify-center items-center'>
                <motion.div
                    initial={
                        {
                            scale: 0
                        }
                    }
                    animate={{
                        scale: 1
                    }}
                    className='w-[400px] bg-white rounded-lg flex flex-col justify-center items-center py-7 px-10 '>
                    <p className='font-bold'>{tittle}</p>
                    <p className='text-gray-500 text-[15px] font-thin mb-6'>{content}</p>
                    <button className='bg-[#5623ff] w-full border text-[20px] rounded-sm py-2 font-bold text-white hover:bg-sky-800'
                        onClick={() => optionHandler(true)}
                    >
                        {firstOption}
                    </button>
                    <button className='text-[16px] hover:bg-gray-100 rounded-sm  py-2 border w-full mt-3 '
                        onClick={() => optionHandler(false)}
                    >
                        {secondOption}
                    </button>
                    <p></p>
                </motion.div>
            </div>
        </>
    )

}

export default PopUp