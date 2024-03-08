import React, { useState } from 'react'
import Input from './Input'
import { useCreateProjectMutation } from '../redux/features/projects/projectsApiSlice'
import { toast } from 'react-toastify'

type AddProjectModalProps = {
    setShowAddProject: Function
    }


const AddProjectModal = ({setShowAddProject }: AddProjectModalProps) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [createProject, {isLoading, isError, isSuccess}] = useCreateProjectMutation()
    
    const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const is_active = true

        createProject({title, description, is_active})
        .unwrap()
        .then((data) => {
            toast.success('Project created successfully')
            setShowAddProject(false)
        })
        .catch((error) => {
            toast.error('An error occurred')
        })

    }

  return (
    <div id="add_project_modal"
        className="rounded-lg shadow-lg absolute bg-white w-[80%] max-w-[450px] px-4 py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="cursor-pointer absolute top-2 right-2" onClick={() => setShowAddProject(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
        <div>
            <h4 className="text-lg font-semibold">Add a new Project</h4>
            <form className="space-y-5 flex flex-col mx-auto" onSubmit={handleAddProject}>
                <div className="text-left space-y-1">
                    <label htmlFor="title">Title:</label>
                    <Input type="text" name='title' id="title" state={title} setState={setTitle}></Input>
                </div>
                <div className="text-left space-y-1">
                    <label htmlFor="description">Description:</label>
                    <Input type="text" name='description' id="description" state={description} setState={setDescription}></Input>
                </div>
                <button className="bg-indigo-600 rounded-full text-white py-1" type="submit">Create project</button>
            </form>
        </div>

    </div>
  )
}

export default AddProjectModal
