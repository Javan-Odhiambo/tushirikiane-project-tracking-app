// https://blog.logrocket.com/getting-started-react-select/

import React, { useState, useEffect, MouseEventHandler } from 'react'
import Select from "react-select";


import Input from './Input'
import { Member, TaskInput } from '../types/types'
import { capitalize } from '../utils/utils'

import { useCreateTaskMutation } from '../redux/features/projects/projectsApiSlice'
import { toast } from 'react-toastify'
type AddTaskModalProps = {
    setShowAddTask: Function
    projectId: string
    members?: Member[]
    loggedInMember?: Member
}


const AddTaskModal = ({ setShowAddTask, projectId, members, loggedInMember }: AddTaskModalProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startAt, setStartAt] = useState('')
    const [dueAt, setDueAt] = useState('')
    const [assigneeOption, setAssigneeOption] = useState<{value: string; label:string} | null>(null)
    const selectOptions = members?.map((member: Member) => ({value: member.id, label: capitalize(member.user.first_name) + ' ' + capitalize(member.user.last_name)}))
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const [createTaskMutation, {isLoading, isError, isSuccess}] = useCreateTaskMutation()


    const closeAddTaskModal: MouseEventHandler = (e) => {
        e.preventDefault()
        setShowAddTask(false)
    }

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO: Assignee
        const payload: TaskInput = {
            title,
            description,
            start_at: startAt,
            due_at: dueAt,
            project: '',
            assignee: 0
        } 

        createTaskMutation({ projectID: projectId, task: payload })
            .unwrap()
            .then((data) => {
                toast.success('Task created successfully')
                console.log(data)
            })
            .catch((error) => {
                toast.error('An error occurred')
                console.log(error)
            })
   
    }

    return (
        <>
            <div id="add_task_modal"
                className="rounded-lg shadow-lg absolute bg-white w-[80%] max-w-[450px] px-4 py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="modal_close_btn cursor-pointer absolute top-2 right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6" onClick={() => setShowAddTask(false)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
                <div>
                    <h4 className="text-lg font-semibold">Add a new task</h4>
                    <form className="space-y-5 flex flex-col mx-auto" onSubmit={formHandler}>
                        <div className="text-left space-y-1">
                            <label htmlFor="title">Title:</label>
                            <Input type="text" name='title' id="title" state={title} setState={setTitle}></Input>
                        </div>

                        <div className="text-left space-y-1">
                            <label htmlFor="description">Description:</label>
                            <Input type="text" name='description' id="description" state={description} setState={setDescription}></Input>
                        </div>

                        <div className="text-left space-y-1">
                            <label htmlFor="start_at">Start date:</label>
                            <Input type="datetime-local" name='start_at' id="start_at" state={startAt} setState={setStartAt}></Input>
                        </div>

                        <div className="text-left space-y-1">
                            <label htmlFor="due_at">Due date:</label>
                            <Input type="datetime-local" name='due_at' id="due_at" state={dueAt} setState={setDueAt}></Input>
                        </div>

                        <div className="text-left space-y-1">
                            <label htmlFor="assignee">Assingee: </label>
                            <Select 
                                className={"border border-gray-400 rounded-full w-full pl-2 py-1 focus:outline-indigo-400"}
                                options={selectOptions}
                                onChange={(option) => option ?? setAssigneeOption(option)}
                            />
                        </div>
                        <button className="bg-indigo-600 rounded-full text-white py-1" type="submit">Add task</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddTaskModal
