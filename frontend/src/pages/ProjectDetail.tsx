import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import MembersModal from '../components/MembersModal';
import AddTaskModal from '../components/AddTaskModal';
import AddMemberModal from '../components/AddMemberModal';

import { archiveProject, getMembers, getProject, leaveProject } from '../api/api';
import TaskContainer from '../components/TaskContainer';
import { Member, Project } from '../types/types';
import ViewRequestsModal from '../components/ViewRequestsModal';
import { useGetProjectByIdQuery, useArchiveProjectMutation, useLeaveProjectMutation, useGetMembersListQuery, useUnarchiveProjectMutation } from '../redux/features/projects/projectsApiSlice';
import { toast } from 'react-toastify';

// TODO: Change styling

//TODO: Fix modals

interface RouteParams {
    projectId: string;
    [key: string]: string | undefined;
}

const ProjectDetail: React.FC = () => {
    const { projectId } = useParams<RouteParams>();
    // const [project, setProject] = useState<Project | null>(null);
    // const [members, setMembers] = useState<Member[] | undefined>(undefined);

    const [showMembers, setShowMembers] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showViewRequests, setShowViewRequests] = useState(false);

    const { data: project } = useGetProjectByIdQuery(projectId);
    const { data: members } = useGetMembersListQuery(projectId);

    const [leaveProject, { isLoading: LoadLeaving }] = useLeaveProjectMutation(projectId);
    const [archiveProject, { isLoading: LoadingArchiving }] = useArchiveProjectMutation(projectId);
    const [unarchiveProject,{ isLoading: LoadingUnarchiviing }] = useUnarchiveProjectMutation(projectId);


    const handleArchive = (project: Project) => {
        // TODO:Add confirmation modal

        archiveProject(String(project.id))
            .then(() => {
                toast.success('Project archived successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUnarchive = (project: Project) => {
        // TODO:Add confirmation modal

        unarchiveProject(String(project.id))
            .then(() => {
                toast.success('Project unarchived successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLeaveProject = (project: Project) => {
        leaveProject(String(project.id))
            .then(() => {
                console.log('Left project')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Header />
            {
                projectId && project ?
                    <main className="flex-grow flex relative mb-5">
                        {/* <!-- Main content start--> */}
                        <div className="mx-auto md:mx-0 md:max-w-[calc(100%-230px)]">

                            {/* <!-- Project info start --> */}
                            <div className="m-4 space-y-4">
                                <h1 className="text-3xl font-bold text-center">{project?.title}</h1>
                                <p>{project.description}</p>
                                <div className="flex justify-between items-center text-sm font-semibold">
                                    <p>Started on: 17th April 2023</p>

                                    {project.is_active ?
                                        <p className="rounded-full bg-green-600 text-white px-3 py-1">Active</p>
                                        :
                                        <p className="rounded-full bg-yellow-500 text-white px-3 py-1">Archived</p>
                                    }

                                    {members && members.length == 1 ? <p>1 Member</p> : <p>{members?.length} Members</p>}
                                </div>
                            </div>
                            {/* <!-- Project info End --> */}

                            <TaskContainer projectId={String(project.id)} />

                        </div>
                        {/* <!-- Main content start--> */}

                        {/* <!-- Side Menu Start --> */}
                        <section id="side_menu"
                            className="hidden md:block h-full md:max-h-[400px] md:pb-5 bg-slate-100 md:bg-white absolute md:fixed right-0 md:right-5 z-10 min-w-[50%] md:min-w-[200px] max-w-[400px] md:min-w-xl md:mt-[70px]  pt-3 space-y-3 text-center transition-all duration-300 ease-in">
                            <span id="side_menu_close" className="cursor-pointer md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                            <div className="md:border md:rounded-lg">
                                <ul className="text-left">
                                    {/* <!-- All users start --> */}
                                    <li id="view_members_btn"
                                        className="cursor-pointer px-5 py-2 hover:text-white hover:bg-indigo-300 rounded-lg"
                                        data-modal="#view_members_modal"
                                        onClick={() => setShowMembers(true)}
                                    >View Members</li>
                                    <li className="cursor-pointer px-5 py-2 hover:text-white hover:bg-red-500 rounded-lg" onClick={() => handleLeaveProject(project)}>
                                        Leave Project
                                    </li>
                                    {/* <!-- All users end --> */}

                                    {/* TODO: <!-- Admins only start --> */}
                                    <li id="add_task_btn"
                                        className="cursor-pointer px-5 py-2 hover:text-white hover:bg-indigo-300 rounded-lg"
                                        data-modal="#add_task_modal" onClick={() => setShowAddTask(true)}>Add Task</li>
                                    <li id="add_member_btn"
                                        className="cursor-pointer px-5 py-2 hover:text-white hover:bg-indigo-300 rounded-lg"
                                        data-modal="#add_member_modal" onClick={() => setShowAddMember(true)}>Add Member</li>
                                    <li id="view_requests_btn"
                                        className="cursor-pointer px-5 py-2 hover:text-white hover:bg-indigo-300 rounded-lg"
                                        data-modal="#view_requests_modal" onClick={() => setShowViewRequests(true)}>View Requests</li>
                                    {/* <!-- Admins only end --> */}

                                    {/* TODO: <!-- Owner start --> */}
                                    { project.is_active ?
                                        <li className="cursor-pointer px-5 py-2  hover:bg-yellow-300 rounded-lg" onClick={() => handleArchive(project)}>
                                            Archive Project
                                        </li>
                                        :
                                        <li className="cursor-pointer px-5 py-2  hover:bg-green-300 rounded-lg" onClick={() => handleUnarchive(project.id)}>
                                            Unarchive Project
                                        </li>

                                    }
                                    {/* <!-- Owner end --> */}
                                </ul>
                            </div>
                        </section>
                        {/* <!-- Side Menu End --> */}
                    </main>
                    :
                    <>
                        <h1>Project could not be found</h1>
                    </>
            }
            {projectId && showMembers ? <MembersModal setShowMembers={setShowMembers} members={members} /> : <></>}
            {projectId && showAddTask ? <AddTaskModal setShowAddTask={setShowAddTask} members={members} projectId={projectId} /> : <></>}
            {projectId && showAddMember ? <AddMemberModal setShowAddMember={setShowAddMember} members={members} projectId={projectId} /> : <></>}
            {projectId && showViewRequests ? <ViewRequestsModal setShowViewRequests={setShowViewRequests} projectId={projectId} /> : <></>}

        </>
    );
}
export default ProjectDetail;
