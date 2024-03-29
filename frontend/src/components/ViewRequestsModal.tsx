import React, { useEffect, useState } from 'react'
import { TaskRequest } from '../types/types'
import RequestCard from './RequestCard'
import { useGetRequestListQuery } from '../redux/features/projects/projectsApiSlice'

type ViewRequestsModalProps = {
    setShowViewRequests: Function
    projectId: string
}
const ViewRequestsModal = ({ setShowViewRequests, projectId }: ViewRequestsModalProps) => {

    const {data: taskRequests} = useGetRequestListQuery(projectId)
    console.log(taskRequests)
    const closeViewRequestsModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setShowViewRequests(false)
    }

    return (
        <>
            <div id="view_requests_modal"
                className="rounded-lg shadow-lg absolute bg-white w-[80%] max-w-[450px] px-4 py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="modal_close_btn cursor-pointer absolute top-2 right-2" onClick={closeViewRequestsModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                <div>
                    <h4 className="text-lg font-semibold">Requests</h4>
                    {/* <div className="overflow-y-scroll max-h-[500px]">
                        {taskRequests &&
                        taskRequests.map((request, index) => <RequestCard key={index} taskRequest={request}/> ) }
            
                    </div> */}
                </div>

            </div>
        </>
    )
}

export default ViewRequestsModal