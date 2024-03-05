import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { useGetProjectsListQuery } from '../redux/features/projects/projectsApiSlice'

// import { getProjects } from '../api/api'
import { Project } from '../types/types'

const ProjectList: React.FC = () => {

    const {data : projects, isLoading } = useGetProjectsListQuery()
    // const [projects, setProjects] = useState<Project[]>([]);


    return (
        <>
            <Header />
            <main className="flex-grow flex relative mb-5">
                <div className="mx-auto md:mx-0 md:max-w-[calc(100%-230px)]">
                    <h1 className="text-3xl font-bold my-4 text-center">My Projects</h1>

                    <section className="border border-indigo-200 rounded-md shadow mx-4">
                        {/* <!-----Projects container-------> */}
                        <div className="">
                            {projects && projects.map((project: Project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}

                        </div>
                        {/* <!-----Projects container End-------> */}

                    </section>
                </div>

                <section id="side_menu"
                    className="hidden md:block h-full md:max-h-[400px] md:pb-5 bg-slate-100 absolute md:fixed right-0 md:right-5 z-10 min-w-[50%] md:min-w-[200px] max-w-[400px] md:min-w-xl md:mt-[70px]  pt-3 space-y-3 text-center transition-all duration-300 ease-in">
                    <span id="side_menu_close" className="cursor-pointer md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                    <div className="">
                        <ul>
                            <li id="add_project_button" className="cursor-pointer" data-modal="#add_project_modal">Add Project</li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </section>

            </main>

        </>
    )
}

export default ProjectList