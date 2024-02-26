import React from 'react'

type EmailDisplayProps = {
    email: string
    emails: string[]
    setEmails: Function
}

const EmailDisplay = ({ email, emails, setEmails }: EmailDisplayProps) => {

    const handleClose = () => {
        setEmails(emails.filter(e => e !== email))
    }
    return (
        <div className="flex items-center justify-between bg-gray-200 rounded-lg px-2 py-1">
            <p>{email}</p>
            <span className="cursor-pointer" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </div>
    )
}

export default EmailDisplay