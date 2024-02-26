import React, { useState, useEffect, MouseEventHandler } from 'react'

import Input from './Input'
import { Member } from '../../types/types'
import { capitalize } from '../../utils/utils'
import { createTask } from '../../api/api'

type AddTaskModalProps = {
    setShowAddTask: Function
    projectId: string
    members?: Member[]
}


const AddTaskModal = ({ setShowAddTask, projectId, members }: AddTaskModalProps) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startAt, setStartAt] = useState('')
    const [dueAt, setDueAt] = useState('')
    const [assignee, setAssignee] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    const closeAddTaskModal: MouseEventHandler = (e) => {
        e.preventDefault()
        setShowAddTask(false)
    }

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask({ title, description, start_at: startAt, due_at: dueAt, assignee, project: projectId })
            .then(res => {
                console.log(res)
                setSuccess('Task created successfully')
                setLoading(false)
                setShowAddTask(false)
            })
            .catch(err => {
                console.log(err)
                setError('An error occurred')
                setLoading(false)
            })
        console.log(e)
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
                    <form className="space-y-5 flex flex-col mx-auto" action="" onSubmit={() => formHandler}>
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
                            <select className="border border-gray-400 rounded-full w-full pl-2 py-1 focus:outline-indigo-400"
                                name="assignee" id="assignee" placeholder='Select'>
                                {members?.map((member: Member, index: number) => (
                                    <option key={index} value={member.email}>{capitalize(member.user.first_name)} {capitalize(member.user.last_name)}</option>
                                ))}
                            </select>
                        </div>
                        <button className="bg-indigo-600 rounded-full text-white py-1" type="submit">Add task</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AddTaskModal