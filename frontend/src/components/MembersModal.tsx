import React, { MouseEventHandler, useState, useEffect } from 'react'
import Function from '@react/types'

import { getMembers } from './../../api/api'

import { Member } from './../../types/types'
import MemberCard from './MemberCard'

type MembersModalProps = {
    setShowMembers: Function
    members?: Member[]
}

const MembersModal = ({ setShowMembers, members}: MembersModalProps) => {
    const closeMembersModal: MouseEventHandler = (e) => {
        e.preventDefault()
        setShowMembers(false)
    }

    return (
        <div id="view_members_modal"
            className="rounded-lg shadow-lg absolute bg-white w-[80%] max-w-[450px] px-4 py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <span className="modal_close_btn cursor-pointer absolute top-2 right-2" onClick={closeMembersModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>

            <div>
                <h4 className="text-lg font-semibold mb-2">Members</h4>
                <div className="overflow-y-scroll max-h-[500px] min-h-[200px]">

                    {members && members.map((member: Member, index: number) => (
                        <MemberCard key={index} member={member}/>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default MembersModal

