import React, { useState } from 'react'

import { Member } from './../../types/types'

import { useUser } from './../../context/UserContext'

import { capitalize } from './../../utils/utils'

type MemberCardProps = {
    member: Member,
    // key: number
}

const MemberCard = ({ member }: MemberCardProps) => {

    const [showMenu, setShowMenu] = useState(false);
    const { user, setUser } = useUser();


    return (
        <div className="flex justify-between items-center hover:bg-gray-300 hover:bg-opacity-70 p-3 rounded-xl">
            <div className="flex space-x-4">

                {/* TODO: Change to avatar component */}
                {member.profile_picture && <img className="rounded-full w-8" src={member.user.profile_picture} alt="Profile picture" />}
                {!member.profile_picture &&
                    <div className="rounded-full w-9 h-9 bg-slate-900 text-white flex justify-center items-center">{member.user.first_name[0].toUpperCase()}</div>
                }
                <p>{capitalize(member.user.first_name)} {capitalize(member.user.last_name)}</p>
            </div>

            <div className="flex">
                {member.is_admin && <p className="border border-red-600 text-red-600 rounded-full text-xs px-2 py-1">Admin</p>}
                <span className="relative">

                    <div className="dropdown dropdown-end z-100">
                        <div tabIndex={0} role="button" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </div>
                        <div
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <a href="">
                                <p
                                    className="whitespace-nowrap text-sm hover:bg-red-500 hover:text-white px-3 py-2 rounded-full">
                                    Remove member</p>
                            </a>

                            {/* TODO: Change the logic to check if the logged in user is owner */}
                            {true &&
                            //  && member.user.email === user.email && member.is_owner &&
                                <>
                                    <a href="">
                                        <p
                                            className="whitespace-nowrap text-sm rounded-full px-3 py-2 hover:bg-indigo-500 hover:text-white">
                                            Make admin</p>
                                    </a>
                                    <a href="">
                                        <p
                                            className="whitespace-nowrap text-sm rounded-full px-3 py-2 hover:bg-red-500 hover:text-white">
                                            Remove admin</p>
                                    </a>
                                </>
                            }
                        </div>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default MemberCard