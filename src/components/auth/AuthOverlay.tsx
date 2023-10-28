import { AiOutlineClose } from "react-icons/ai";
import Login from './login'
import Register from './register'
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setLoginRequestStatus } from "../../store/auth";
import { ToastContainer, toast } from "react-toastify";
export default function AuthOverlay() {
    //redux section

    const dispatch = useDispatch();
    let [isRegister, setIsRegister] = useState<boolean>(false)

    const handleSucessfulRegister = () => {
        toast.success("You registered successfully", {
            autoClose: 1000,
            theme: 'colored',
            style: {
                fontSize: '16px',
            }
        })
        setIsRegister(false)
    }
    const closeLogin = () => {
        dispatch(setLoginRequestStatus(false))
    }
    return (
        <>
            <ToastContainer />
            <div
                id="AuthOverlay"
                className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative bg-white w-full max-w-[470px] p-4 rounded-lg">

                    <div className="w-full flex justify-end">
                        <button onClick={() => closeLogin()} className="p-1.5 rounded-full bg-gray-100">
                            <AiOutlineClose size="26" />
                        </button>
                    </div>

                    {isRegister ? <Register successfulRegisterListener={handleSucessfulRegister} /> : <Login successfulLoginListener={closeLogin} />}

                    <div className="flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                        <span className="text-[14px] text-gray-600">Don’t have an account?</span>

                        <button onClick={() => setIsRegister(isRegister = !isRegister)} className="text-[14px] text-[#F02C56] font-semibold pl-1" >
                            <span>{!isRegister ? 'Register' : 'log in'}</span>
                        </button>
                    </div>

                </motion.div>
            </div>
        </>
    )
}