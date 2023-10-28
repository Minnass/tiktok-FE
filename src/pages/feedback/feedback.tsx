import React, { ChangeEvent, useState } from 'react';
import { Navbar } from '../../components';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import FeedbackService from '../../service/feedbackService';
import { FeedbackModel } from '../../model/feedbackMode';
import { getUserInfo } from '../../service/userService';

const FeedbackPage = () => {
    const [title, setTitle] = useState<string>('');
    const [problem, setProblem] = useState<string>('');
    let [fileDisplay, setFileDisplay] = useState<string>('');
    let [file, setFile] = useState<File | null>(null);
    const [titleWarning, setTitleWarning] = useState<string>('');
    const [problemWarning, setProblemWarning] = useState<string>('');
    const validate = () => {
        if (!title.trim()) {
            setTitleWarning('Title cannot be empty');
            return false;
        } else {
            setTitleWarning('');
        }
        if (!problem.trim()) {
            setProblemWarning('Problem description cannot be empty');
            return false;
        } else {
            setProblemWarning('');
        }
        return true;
    }
    const sendFeedBack = () => {
        if (validate()) {
            const model: FeedbackModel = {
                img: file!,
                title: title,
                problem: problem,
                userId:getUserInfo()?.userId    
            }
            FeedbackService.sendFeedBack(model)
                .then((status) => {
                    if (status === true) {
                        console.log('dung')
                        toast.success("Send feedback successfully", {
                            autoClose: 1000,
                            theme: 'colored',
                            style: {
                                fontSize: '16px',
                            }
                        })
                        setTitle('')
                        setProblem('')
                        setFile(null)
                        setFileDisplay('')
                    }
                    else {
                        console.log('sai')
                    }
                })
        }
    };

    const clearImage = () => {
        setFile(null);
        setFileDisplay('');
    };

    const onFileInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            console.log(fileUrl);
            setFileDisplay(fileUrl);
            setFile(file);
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='mt-[60px] m-auto w-full max-w-[1140px] px-3 bg-white shadow-lg rounded-md pb-16 pt-6'>
                <div className='text-[16px] w-full md:w-[50%] m-auto'>
                    <p className='font-bold'>Title</p>
                    <textarea
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setTitle(event.target.value);
                        }}
                        value={title}
                        className="text-gray-800 border w-full focus:outline-none px-3 py-2.5 rounded-md border-gray-300 bg-[#F1F1F2] resize-none"
                    ></textarea>
                    <p className='text-[11px] text-left text-gray-500'>
                        {title.length}/80
                    </p>
                    {titleWarning && <p className='text-red-500 text-[15px]'>{titleWarning}</p>}
                </div>
                <div className='text-[16px] w-full mt-3 md:w-[50%] m-auto'>
                    <p className='font-bold'>Problem</p>
                    <textarea
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                            setProblem(event.target.value);
                        }}
                        value={problem}
                        className="text-gray-800 border w-full focus:outline-none px-3 py-2.5 rounded-md border-gray-300 bg-[#F1F1F2] resize-none"
                    ></textarea>
                    <p className='text-[11px] text-left text-gray-500'>
                        {problem.length}/80
                    </p>
                    {problemWarning && <p className='text-red-500 text-[15px]' >{problemWarning}</p>}
                </div>

                <div className='mx-auto w-[300px] '>
                    {!fileDisplay ? (
                        <label
                            htmlFor="fileInput"
                            className='border-gray-300 rounded-md cursor-pointer p-3 border-dashed border-2 h-[250px] mx-auto flex flex-col items-center justify-center'>
                            <BiSolidCloudUpload size="40" color="#b3b3b1" />
                            <p className="mt-4 text-[17px]">Select file image to report</p>
                            <input
                                accept="image/png, image/jpeg, image/jpg"
                                type="file"
                                id="fileInput"
                                onChange={onFileInputChanged}
                                hidden
                            />
                        </label>
                    ) : (
                        <div className='w-full h-full flex flex-col'>
                            <img className='w-full h-[250px] object-cover' src={fileDisplay} />
                            <div className=" flex items-center justify-between z-50 mt-5 rounded-xl border w-full p-2 border-gray-300">
                                <div className="flex items-center truncate">
                                    <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                                    <p className="text-[11px] pl-1 truncate text-ellipsis">{file?.name}</p>
                                </div>
                                <button onClick={clearImage} className="text-[11px]  font-semibold">
                                    Change
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='w-full pr-7 mt-6 flex justify-end'>
                    <button
                        onClick={sendFeedBack}
                        className='border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md justify-end'>
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default FeedbackPage;
