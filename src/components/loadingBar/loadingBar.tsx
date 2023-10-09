import React from 'react'
import { BeatLoader } from 'react-spinners'


const LoadingBar = () => {
  return (
<div className={`flex justify-center fixed z-50 top-0 left-0 w-full h-full items-center bg-black bg-opacity-50`}>
    <BeatLoader color={'#ffffff'} loading={true}  />
</div>
  )
}


export default LoadingBar