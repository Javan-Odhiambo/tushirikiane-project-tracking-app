import React, { useState } from 'react'
import { Link, redirect } from 'react-router-dom'

import { login, me } from './../../api/api'
import { useUser } from '../../context/UserContext'

// TODO: Change styling
const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, setUser} = useUser()

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login({ email, password })
            .then(res => {
                me()
                .then( data => {
                    console.log(data)
                    setUser(data)
                })
                .catch(error =>{
                    console.log(error)
                })
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <div className='w-[100vw] h-[100vh]'>
            <form action="/login" method='post' className='min-h-screen sm:flex sm:flex-row mx-0 justify-center' onSubmit={handleLogin}>
                <div className="flex justify-center self-center  z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                            <p className="text-gray-500">Please sign in to your account.</p>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                <input className=" w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="email" id="email" placeholder="mail@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                    Password
                                </label>
                                <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="password" placeholder="Enter your password" id="email" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="text-sm">
                                < Link to="/signup" className="text-primary-400 hover:text-primary-500">
                                    Don't have an account?
                                </Link>
                            </div>
                            <div className="text-sm">
                                < Link to="/password-reset" className="text-primary-400 hover:text-primary-500">
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center bg-primary-400  hover:bg-primary-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login