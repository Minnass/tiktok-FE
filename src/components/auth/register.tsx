import React, { useState } from 'react'
import { ErrorObject, RegisterProps } from '../../types';
import { BiLoaderCircle } from 'react-icons/bi';
import TextInput from '../textInput/textInput';

const Register = (props: RegisterProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string | ''>('');
  const [email, setEmail] = useState<string | ''>('');
  const [password, setPassword] = useState<string | ''>('');
  const [confirmPassword, setConfirmPassword] = useState<string | ''>('');
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

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!name) {
      setError({ type: 'name', message: 'A Name is required' })
      isError = true
    } else if (!email) {
      setError({ type: 'email', message: 'An Email is required' })
      isError = true
    } else if (!reg.test(email)) {
      setError({ type: 'email', message: 'The Email is not valid' })
      isError = true
    } else if (!password) {
      setError({ type: 'password', message: 'A Password is required' })
      isError = true
    } else if (password.length < 8) {
      setError({ type: 'password', message: 'The Password needs to be longer' })
      isError = true
    } else if (password != confirmPassword) {
      setError({ type: 'password', message: 'The Passwords do not match' })
      isError = true
    }

    return isError
  }
  const register = () => {
    console.log('register')
    validate();
    //Dnag nhap thanh cong
    props.successfulRegisterListener();
  }
  return (
    <>
      <div>
        <h1 className="text-center text-[28px] mb-4 font-bold">Register</h1>

        <div className="px-4 py-1 text-[14px]">

          <TextInput
            string={name}
            placeHolder="Name"
            onUpdate={setName}
            inputType="text"
            error={showError('name')}
          />

        </div>

        <div className="px-4 mt-2 py-1 text-[14px]">

          <TextInput
            string={email}
            placeHolder="Email address"
            onUpdate={setEmail}
            inputType="email"
            error={showError('email')}
          />

        </div>

        <div className="px-4 py-1 mt-3 text-[14px]">
          <TextInput
            string={password}
            placeHolder="Password"
            onUpdate={setPassword}
            inputType="password"
            error={showError('password')}
          />
        </div>

        <div className="px-4 py-1  mt-2 text-[14px]">
          <TextInput
            string={confirmPassword}
            placeHolder="Confirm Password"
            onUpdate={setConfirmPassword}
            inputType="password"
            error={showError('confirmPassword')}
          />
        </div>

        <div className="px-4 py-1 text-[14px] mt-6">
          <button
            disabled={loading}
            onClick={() => register()}
            className={`
                            flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                            ${(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'}
                        `}
          >
            {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Register'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Register