import React from 'react'
import { TaskRequest } from '../../types/types'
import { capitalize } from '../../utils/utils'

type RequestCardProps = {
    taskRequest: TaskRequest
}

const RequestCard: React.FC<RequestCardProps> = ({ taskRequest }) => {

    return (
        <div className=" hover:bg-gray-300 hover:bg-opacity-70 p-3 rounded-xl">
            <p className="font-semibold">{taskRequest.task.title}</p>
            <div className="flex justify-between items-center">
                <div className="flex space-x-3 text-sm items-center">

                    {/* TODO: Change to avatar component */}
                    {taskRequest.member.profile_picture && <img className="rounded-full w-8" src={taskRequest.member.profile_picture} alt="Profile picture" />}
                    {!taskRequest.member.profile_picture &&
                        <div className="rounded-full w-9 h-9 font-bold bg-slate-900 text-white flex justify-center items-center">{taskRequest.member.first_name[0].toUpperCase()}</div>
                    }


                    <div className='mx-3'>
                        <p>{capitalize(taskRequest.member.first_name)} {capitalize(taskRequest.member.last_name)}</p>
                        <p>{taskRequest.member.email}</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <a href="">
                        <p
                            className="border border-green-600 text-green-600 rounded-full text-xs px-2 py-1 hover:bg-green-600 hover:text-white">
                            Approve
                        </p>
                    </a>
                    <a href="">
                        <p
                            className="border border-red-600 text-red-600 rounded-full text-xs px-2 py-1 hover:bg-red-600 hover:text-white">
                            Reject</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RequestCard