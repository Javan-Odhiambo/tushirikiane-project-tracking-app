import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSignupMutation } from '../redux/features/auth/authApiSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// TODO: Change styling


const Signup: React.FC = () => {
    const [signup, {isLoading}] = useSignupMutation()
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profilePic, setProfilePic] = useState('') //TODO: Move this to a different step
    const [errorMessages, setErrorMessages] = useState<String[]>([]);
    const [submit, setSubmit] = useState(false)

    function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            if (!errorMessages.includes('Passwords do not match')) {
              setErrorMessages([...errorMessages, 'Passwords do not match']);
            }
            return;
        } else {
            setErrorMessages(errorMessages.filter((message) => message !== 'Passwords do not match'));
        }

        // TODO: Implement sigup logic
        signup({email, password, re_password: confirmPassword, first_name: firstName, last_name: lastName})
        .unwrap()
        .then((data) => {
            toast.success('Account created successfully')
            navigate('/login')
            console.log(data)
        })
        .catch((error) => {
            toast.error('Error creating account')
        })
        console.log('signup')
    }

    return (
        <div className='w-[100vw] h-[100vh]'>
            <form className='min-h-screen sm:flex sm:flex-row mx-0 justify-center' onSubmit={handleSignup}>
                <div className="flex justify-center self-center  z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
                            <p className="text-gray-500">Please fill the form to create an account.</p>
                        </div>
                        {errorMessages.length > 0 && (
                            <div className='bg-red-200 p-3 rounded-lg border-1 border-red-500'>
                                {errorMessages.map((message, index) => <p key={index}>{message}</p>)}
                            </div>
                        )}
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide" htmlFor='first_name'>
                                    First Name
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide" htmlFor='last_name'>
                                    Last Name
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                <input className=" w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide" htmlFor='password'>
                                    Password
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide" htmlFor='confirm_password'>
                                    Confirm Password
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <Link to="/login" className="text-primary-400 hover:text-primary-500">
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center bg-primary-400  hover:bg-primary-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
