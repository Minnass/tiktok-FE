import React, { useState } from 'react'
import { ErrorObject } from '../../types';
import TextInput from '../textInput/textInput';
import { BiLoaderCircle } from 'react-icons/bi';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | ''>('');
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

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let isError = false
    if (!email) {
      setError({ type: 'email', message: 'An Email is required' })
      isError = true
    }
    else if (!reg.test(email)) {
      setError({ type: 'email', message: 'The Email is not valid' })
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
    validate();
    //send request 
    console.log('login')
    setLoading(false)
  }
  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Log in</h1>

        <div className="px-4 py-1 text-[14px]" >
          <TextInput
            string={email}
            placeHolder="Email address"
            onUpdate={setEmail}
            inputType="email"
            error={showError('email')}
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
                            ${(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'}
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