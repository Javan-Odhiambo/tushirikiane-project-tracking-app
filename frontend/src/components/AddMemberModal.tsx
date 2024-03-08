import React, { useState } from 'react'
import { Member } from '../types/types'
import Input from './Input'
import EmailDisplay from './EmailDisplay'
import { useCreateMemberMutation } from '../redux/features/projects/projectsApiSlice'
import { toast } from 'react-toastify'

type AddMemberModalProps = {
    setShowAddMember: Function
    projectId: string
    members?: Member[]
}

const AddMemberModal = ({ setShowAddMember, projectId, members }: AddMemberModalProps) => {

    const [emails, setEmails] = useState<string[]>([])
    const [email, setEmail] = useState<string>('')

    const [addMembers, {isError, isSuccess}] = useCreateMemberMutation()

    const closeAddMemberModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowAddMember(false)
    }

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && !emails.find(e => e === email)) {
            setEmails([...emails, email])
            setEmail('')
        }
        console.log(e)
    }

    const handleSubmission = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const payload = {
            id: projectId,
            emails: emails.join(", ")
        }
        addMembers(payload)
        .unwrap()
        .then((data) => {
            console.log(data)
            toast.success('Members added successfully')
            setEmails([])
            setShowAddMember(false)
        })
        .catch((error) => {
            toast.error('An error occured')
            console.log(error)
        })

    }


    return (
        <>
            <div id="add_member_modal"
                className="rounded-lg shadow-lg absolute bg-white w-[80%] max-w-[450px] px-4 py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="modal_close_btn cursor-pointer absolute top-2 right-2" onClick={closeAddMemberModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                <div>
                    <h4 className="text-lg font-semibold">Add a new Member</h4>
                    <p className="text-sm text-red-700 mb-2">NB: Ensure the emails given have registed accounts</p>
                    <form id="add_member_form" className="space-y-5 flex flex-col mx-auto" action="" onSubmit={formHandler}>
                        <div id="new_members_container" className="space-y-1">
                            {emails.map((email, index) => (
                                <EmailDisplay key={index} email={email} emails={emails} setEmails={setEmails} />
                            ))}

                        </div>
                        <div className="text-left space-y-1">
                            <label htmlFor="new_member_input">Email:</label>
                            <p className='text-xs text-gray-600'>To add multiple members, press enter after each email address</p>
                            <Input type="email" name='emails' id="new_member_input" state={email} setState={setEmail} />
                        </div>
                        <button type='button' className="bg-indigo-600 rounded-full text-white py-1" onClick={handleSubmission}>Add Members</button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default AddMemberModal