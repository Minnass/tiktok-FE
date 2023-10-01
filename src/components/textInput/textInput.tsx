import React from 'react'
import { TextInputCompType } from '../../props'

const TextInput = ({ string, inputType, placeHolder, error, onUpdate }: TextInputCompType) => {
    return (
        <>
            <input type={inputType}
                placeholder={placeHolder}
                className='block w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none'
                value={string || ''}
                autoComplete='off'
                onChange={(event) => onUpdate(event.target.value)}
            />
            <div className='text-red-500 text-[14px] font-semibold'>
                {error ? (error) : null}
            </div>
        </>
    )
}

export default TextInput