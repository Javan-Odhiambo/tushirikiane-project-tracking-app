import React from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../types/types'


type ProjectCardProps = {
    project: Project
}
const ProjectCard = ({project}: ProjectCardProps) => {
    return (
        <div className="border-b border-gray-200 p-2">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex items-center justify-end">
                <Link to={`/project/${project.id}`}>
                    <button className="btn bg-primary-400 btn-sm border-primary-300 rounded-full hover:bg-primary-500 text-gray-100 transition ease-in duration-300">
                        Go to project
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProjectCard