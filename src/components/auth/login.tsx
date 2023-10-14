import React, { useState } from 'react'
import { ErrorObject, LoginProp } from '../../types';
import TextInput from '../textInput/textInput';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUserInfo } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { selectNextRouter, setNextRouter } from "../../store/nextRouter";
import { RootState } from "../../store/store";
import { LoginRequest } from '../../model';
import axiosInstance from '../../aixos/axios';
const Login = (props: LoginProp) => {
  //redux section
  const dispatch = useDispatch();
  const navigater = useNavigate();
  const nextRouter = useSelector((state: RootState) => selectNextRouter(state));
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');
  const [error, setError] = useState<ErrorObject | null>(null)
  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message
    }
    return ''
  }
  const validate = () => {
    setError(null)
    let isError = false
    if (!userName) {
      setError({ type: 'userName', message: 'An UserName is required' })
      isError = true
    }
    else if (!password) {
      setError({ type: 'password', message: 'A Password is required' })
      isError = true
    }
    return isError
  }
  const login = () => {
    setLoading(true)
    if (!validate()) {
      const loginRequest:LoginRequest={
        password:password,
        userName:userName
      }
      axiosInstance.post('/Account/login',loginRequest)
      .then((response)=>{
        props.successfulLoginListener();
        if (nextRouter !== '') {
          navigater(nextRouter);
        }
        dispatch(setLoggedIn());
        dispatch(setUserInfo(response.data.data))
        setLoading(false)
      })
      .catch(error=>{
        setLoading(false)
      });
    }
   
    
  }
  
  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>

        <div className="px-4 py-1 text-[14px]" >
          <TextInput
            string={userName}
            placeHolder="UserName"
            onUpdate={setUserName}
            inputType="text"
            error={showError('userName')}
          />
        </div>

        <div className="px-4 py-1 mt-2   text-[14px]" >
          <TextInput
            string={password}
            placeHolder="Password"
            onUpdate={setPassword}
            inputType="password"
            error={showError('password')}
          />
        </div>
        <div className="px-4 py-1 text-[14px]  mt-6">
          <button
            disabled={loading}
            onClick={() => login()}
            className={`
                            flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                            ${(!userName || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'}
                        `}
          >
            {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Log in'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Login