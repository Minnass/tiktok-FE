import React from 'react'
import { useState } from 'react'
import { UploadError } from '../../props';
import { BiLoader, BiLoaderCircle, BiSolidCloudUpload } from 'react-icons/bi';
import { PiKnifeLight } from 'react-icons/pi'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PopUp from '../../components/popup/popup';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UploadPage = () => {
  let [hasPopUp, setHasPopUp] = useState<boolean>(false);
  let [fileDisplay, setFileDisplay] = useState<string>('');
  let [caption, setCaption] = useState<string>('');
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);


  const onFileInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
      const videoElement = document.createElement('video');
      videoElement.src = fileUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        videoElement.currentTime = 1000;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg'); // Change format as needed
        console.log(dataURL);
        // Set the background image data in state

      });
    }
  }
  const clearVideo = () => {
    setFileDisplay('');
    setFile(null);
  }
  const createNewPost = () => {
    //Push video len
  }

  const discardHandler = () => {
    setHasPopUp(true)
  }

  const popUpConfirmHandler = (clickOption: boolean) => {
    !clickOption && clearVideo();
    setHasPopUp(false)
  }


  return (
    <>
      <div className='fixed bg-white z-30 flex items-center w-full border-b top-0 h-[60px]'>
        <div className=' mx-auto  w-full max-w-[1140px] flex items-center'>
          <Link to='/'>
            <img className='max-h-full w-[115px] ' src={require('../../utils/tikter.png')} />
          </Link>
          <Link to='/upload'>
            <div className='ml-2 cursor-pointer'>
              <div className='rounded-sm px-2 ' style={{ backgroundImage: `linear-gradient(to right, rgba(37, 244, 238), rgba(254, 44, 85))`, }}>
                <div className='bg-[#0f0606] rounded-sm px-2 py-0 text-[15px] font-bold text-white'>
                  Creator Center
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1140px] m-auto mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4 min-w-[400px] "     >
        <div className='text-left'>
          <h1 className="text-[23px] font-semibold">Upload video</h1>
          <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
        </div>
        <div className="mt-8 md:flex gap-6">

          {!fileDisplay ?
            <label
              htmlFor="fileInput"
              className="  border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100    md:mx-0 w-full  p-3  border-dashed  border-2   max-w-[260px]  text-center   h-[470px]  mx-auto mt-4  mb-6  flex  flex-col  items-center  justify-center 
                                  "
            >
              <BiSolidCloudUpload size="40" color="#b3b3b1" />
              <p className="mt-4 text-[17px]">Select video to upload</p>
              <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</p>
              <p className="mt-12 text-gray-400 text-sm">MP4</p>
              <p className="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</p>
              <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>
              <label
                htmlFor="fileInput"
                className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#5623ff] rounded-sm cursor-pointer"
              >
                Select file
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={onFileInputChanged}
                hidden
                accept=".mp4"
              />
            </label>
            :
            <div
              className="md:mx-0  
                mx-auto mt-4  items-center relative rounded-2xl  cursor-pointer p-3    h-[530px]  justify-center  max-w-[260px]    w-full   flex  mb-16  md:mb-12
                                  "
            >
              {isUploading ? (
                <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                  <div className="mx-auto flex items-center justify-center gap-1">
                    <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                    <div className="text-white font-bold">Uploading...</div>
                  </div>
                </div>
              ) : null}
              <img
                className="absolute z-20 pointer-events-none "
                src={require('../../utils/mobile-case.png')}
              />
              <img
                className="absolute right-4 bottom-6 z-20 "
                width="90"
                src={require('../../utils/tiktok-logo-white.png')}
              />
              <video
                autoPlay
                loop
                muted
                className="absolute rounded-xl  object-cover  z-10 p-[13px] w-full h-full"
                src={fileDisplay}
              />

              <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                <div className="flex items-center truncate">
                  <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                  <p className="text-[11px] pl-1 truncate text-ellipsis">{file?.name}</p>
                </div>
                <button onClick={() => clearVideo()} className="text-[11px] ml-2 font-semibold">
                  Change
                </button>
              </div>
            </div>
          }

          <div className="mt-4 mb-6">
            <div className="flex bg-[#F8F8F8] py-4 px-6">
              <div>
                <PiKnifeLight className="mr-4" size="20" />
              </div>
              <div>
                <div className="text-semibold text-[15px] mb-1.5">Divide videos and edit</div>
                <div className="text-semibold text-[13px] text-gray-400">
                  You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos
                </div>
              </div>
              <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                <button className="px-8 py-1.5 text-white text-[15px] bg-[#5623ff] rounded-sm"
                  onClick={() => {
                    toast.warning("Feature has not been finished!", {
                      autoClose: 1000,
                      theme: 'colored'
                    })
                  }}
                >
                  <ToastContainer />
                  Edit
                </button>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <div className="mb-1 text-[15px]">Caption</div>
                <div className="text-gray-400 text-[12px]">{caption.length}/150</div>
              </div>
              <input
                maxLength={150}
                type="text"
                className="
                                          w-full
                                          border
                                          p-2.5
                                          rounded-md
                                      focus:outline-none
                                      "
                value={caption}
                onChange={event => setCaption(event.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                disabled={isUploading}
                onClick={discardHandler}
                className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
              >
                Discard
              </button>
              {hasPopUp && <PopUp eventListener={popUpConfirmHandler} content='The video and all edits will be discarded.' tittle='Discard this post?' firstOption='Discard' secondOption='Continue' />}
              <button
                disabled={isUploading || !file}
                onClick={() => createNewPost()}
                className={`px-10 py-2.5 mt-8 border text-[16px] text-white ${file ? 'bg-[#5623ff] hover:bg-sky-800' : ' bg-[rgba(22,24,35,0.34)]'}  rounded-sm`}
              >
                {isUploading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Post'}
              </button>

            </div>

            {error ? (
              <div className="text-[#5623ff] mt-4  hover:bg-sky-800">
                {error.message}
              </div>
            ) : null}

          </div>

        </div>
      </div>

    </>

  )
}
export default UploadPage