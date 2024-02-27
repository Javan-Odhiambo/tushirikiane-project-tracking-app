import React, { FormEvent, useState } from 'react'

// TODO: Change styling
//TODO: Consider small screen
const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('')

    function handlePasswordReset(e: FormEvent<HTMLFormElement>){
        // TODO: Implement password reset logic
        e.preventDefault();
        console.log('request sent');

        setEmail("");
    }

    return (
        <div className='p-5'>
            <h1 className='text-2xl mb-5' >It's unfortunate you forgot your password.</h1>
            <form action="" className='sm:flex sm:flex-row space-x-3 items-center' onSubmit={handlePasswordReset}>
                <label htmlFor="email" className="text-lg font-medium text-gray-700 tracking-wide">Email:</label>
                <input className="text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="bg-primary-400 hover:bg-primary-500 text-gray-100 py-2 px-4 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Send reset code
                </button>
            </form>
        </div>
    )
}

export default ResetPassword