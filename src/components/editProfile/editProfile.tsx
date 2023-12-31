import React, { useRef } from 'react'
import { Cropper } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { useState } from 'react'
import { CropperDimensions, ErrorObject, ProfileEditorProps, TextInputCompType } from '../../types'
import { AiOutlineClose } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import TextInput from '../textInput/textInput';
import { BiLoaderCircle } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { getUserInfo } from '../../service/userService'
import axiosInstance from '../../aixos/axios'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoggedOut } from '../../store/auth'
import Image from "image-js";
import { BASEURL } from '../../const/baseUrl'
const EditProfile = (props: ProfileEditorProps) => {
  const user = getUserInfo();
  const [file, setFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<CropperDimensions | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const temp=(user?.avatar==null)?null:`${BASEURL}${user.avatar}`;
  const [userImage, setUserImage] = useState<string | null>(temp);
  const [displayedName, setUserName] = useState<string | null>(user?.displayedName!);
  const [userBio, setUserBio] = useState<string | undefined>(user?.bio);
  const [isUpdating, setIsUpdating] = useState(false);
  const [Error, setError] = useState<ErrorObject | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();


  const showError = (type: string) => {
    if (Error && Object.entries(Error).length > 0 && Error?.type == type) {
      return Error.message
    }
    return ''
  }

  const getUploadedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedImage(URL.createObjectURL(selectedFile));
    }
    else {
      setFile(null);
      setUploadedImage(null);
    }
  }

  const cropAndUpdateImage = async () => {
    if (cropper) {
      const x = cropper.left!;
      const y = cropper.top!;
      const width = cropper.width!;
      const height = cropper.height!;
      try {
        const response = await fetch(URL.createObjectURL(file!));
        const imageBuffer = await response.arrayBuffer();
        const image = await Image.load(imageBuffer)
        const croppedImage = image.crop({ x, y, width, height });
        const resizedImage = croppedImage.resize({ width: 200, height: 200 });
        const blob = await resizedImage.toBlob();
        const arrayBuffer = await blob.arrayBuffer();
        const finalFile = new File([arrayBuffer], file!.name, { type: blob.type });
        setFile(finalFile);
        const newImageUrl = URL.createObjectURL(blob);
        setUserImage(newImageUrl);
        setUploadedImage(null)
      }
      catch (error) {

      }
    }
  }
  const updateUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', file!)
      formData.append('displayedName', displayedName!);
      formData.append('bio', userBio!);
      const response = await axiosInstance.post('/User/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        dispatch(setLoggedOut())
        toast.success("Edit user successfully,", {
          autoClose: 1000,
          theme: 'colored',
          style: {
            fontSize: '16px',
          }
        })
        alert("You have to log in again")
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <div id="EditProfileOverlay"
        className="fixed flex justify-center pt-14 md:pt-[40px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
          relative bg-white w-full max-w-[700px] sm:h-[580px] h-[655px] mx-2 p-4 rounded-lg mb-10
                        ${!uploadedImage ? 'h-[655px]' : 'h-[580px]'}
                    `}
        >
          <div className="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
            <h1 className="text-[22px] font-medium">
              Edit profile
            </h1>
            <button
              disabled={isUpdating}
              onClick={() => props.openedProfileEditorListener(false)}
              className="hover:bg-gray-200 p-1 rounded-full"
            > <AiOutlineClose size="25" /></button>
          </div>
          <div className={`h-[calc(500px-200px)] ${!uploadedImage ? 'mt-16' : 'mt-[58px]'}`}>
            {!uploadedImage ? (
              <div>
                <div
                  id="ProfilePhotoSection"
                  className="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
                >
                  <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                    Profile photo
                  </h3>
                  <div className="flex items-center justify-center sm:-mt-6">
                    <label htmlFor="image" className="relative cursor-pointer"   >
                      <img className="rounded-full" width="95" src={(userImage) ? `${userImage}` : require('../../utils/user.png')} />
                      <button className=" absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px] h-[32px]
                      "
                        onClick={() =>
                          inputFileRef.current?.click()
                        }
                      >
                        <BsPencil size="17" className="ml-0.5" />
                      </button>
                    </label>
                    <input className="hidden"
                      type="file"
                      id="image"
                      ref={inputFileRef}
                      onChange={getUploadedImage}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                </div>
                <div id='UserNameSection'
                  className="flex flex-col border-b sm:h-[118px]  px-1.5 py-2 mt-1.5  w-full"
                >
                  <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                    Name
                  </h3>
                  <div className="flex items-center justify-center sm:-mt-6">
                    <div className="sm:w-[60%] w-full max-w-md">

                      <TextInput
                        string={displayedName!}
                        placeHolder={displayedName!}
                        onUpdate={setUserName}
                        inputType="text"
                        error={showError('displayedName')}
                      />

                      <p className={`relative text-[11px] text-gray-500 ${Error ? 'mt-1' : 'mt-4'}`}>
                        Usernames can only contain letters, numbers, underscores, and periods.
                        Changing your username will also change your profile link.
                      </p>
                    </div>
                  </div>
                </div>
                <div id='UserBioSection' className="flex flex-col sm:h-[120px]  px-1.5 py-2 mt-2 w-full"
                >
                  <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                    Bio
                  </h3>
                  <div className="flex items-center justify-center sm:-mt-6">
                    <div className="sm:w-[60%] w-full max-w-md">
                      <textarea
                        cols={30}
                        rows={3}
                        onChange={e => setUserBio(e.target.value)}
                        value={userBio || ''}
                        maxLength={80}
                        className="
                                                    resize-none
                                                    w-full
                                                    bg-[#F1F1F2]
                                                    text-gray-800
                                                    border
                                                    border-gray-300
                                                    rounded-md
                                                    py-2.5
                                                    px-3
                                                    focus:outline-none
                                                "
                      ></textarea>
                      <p className='text-[11px] text-left text-gray-500'>
                        {userBio ? userBio.length : 0}/80
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil">
                <Cropper
                  stencilProps={{ aspectRatio: 1 }}
                  className="h-[400px]"
                  onChange={(cropper) => setCropper(cropper.getCoordinates())}
                  src={uploadedImage}
                />
              </div>
            )}
          </div>
          <div
            id="ButtonSection"
            className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full"
          >
            {!uploadedImage ? (
              <div id="UpdateInfoButtons" className="flex items-center justify-end">

                <button
                  disabled={isUpdating}
                  onClick={() => props.openedProfileEditorListener(false)}
                  className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                >
                  <span className="px-2 font-medium text-[15px]">Cancel</span>
                </button>

                <button
                  disabled={isUpdating}
                  onClick={() => updateUserInfo()}
                  className="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
                >
                  <span className="mx-4 font-medium text-[15px]">
                    {isUpdating ? <BiLoaderCircle color="#ffffff" className="my-1 mx-2.5 animate-spin" /> : "Save"}
                  </span>
                </button>

              </div>
            ) : (
              <div id="CropperButtons" className="flex items-center justify-end" >

                <button
                  onClick={() => setUploadedImage(null)}
                  className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                >
                  <span className="px-2 font-medium text-[15px]">Cancel</span>
                </button>

                <button
                  onClick={() => cropAndUpdateImage()}
                  className="flex items-center bg-[#F02C56] text-white border rounded-md ml-3 px-3 py-[6px]"
                >
                  <span className="mx-4 font-medium text-[15px]">
                    {isUpdating ? <BiLoaderCircle color="#ffffff" className="my-1 mx-2.5 animate-spin" /> : "Apply"}
                  </span>
                </button>

              </div>
            )}
          </div>
          <div >

          </div>
        </motion.div>
      </div >
    </>
  )
}

export default EditProfile  