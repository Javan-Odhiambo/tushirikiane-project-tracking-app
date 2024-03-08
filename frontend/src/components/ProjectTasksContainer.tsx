import React, { useState, useEffect } from 'react'

import { useGetProjectTaskListQuery } from '../redux/features/projects/projectsApiSlice';

import { Task } from '../types/types';
import { capitalize, formatFullDateTime } from '../utils/utils';
import { useCreateRequestMutation } from '../redux/features/tasks/tasksApiSlice';
import { toast } from 'react-toastify';

type TaskContainerProps = {
    projectId: string
}

const ProjectTaskContainer = ({ projectId }: TaskContainerProps) => {
    const [showPending, setShowPending] = useState(true);
    const [showAssigned, setShowAssigned] = useState(false);
    const [showInProgress, setShowInProgress] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    
    const { data: tasks } = useGetProjectTaskListQuery(projectId);
    const [createRequest, { isLoading: isRequesting }] = useCreateRequestMutation();
    
    const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
    const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    const handleRequestTask = (task: Task) => {
        createRequest(task.id)
        .unwrap()
        .then((data) => {
            toast.success("Task requested successfully");
        })
        .catch((error) => {
            toast.error("Failed to request task");
        })
    }

    const makeActive = (e: React.MouseEvent) => {
        switch ((e.target as HTMLSpanElement).id) {
            case 'pending_btn':
                setShowPending(true);
                setShowAssigned(false);
                setShowInProgress(false);
                setShowCompleted(false);
                break;
            case 'assigned_btn':
                setShowPending(false);
                setShowAssigned(true);
                setShowInProgress(false);
                setShowCompleted(false);
                break;
            case 'in_progress_btn':
                setShowPending(false);
                setShowAssigned(false);
                setShowInProgress(true);
                setShowCompleted(false);
                break;
            case 'completed_btn':
                setShowPending(false);
                setShowAssigned(false);
                setShowInProgress(false);
                setShowCompleted(true);
                break;
            default:
                setShowPending(true);
                setShowAssigned(false);
                setShowInProgress(false);
                setShowCompleted(false);
                break;
        }
    };

    useEffect(() => {

        if (tasks && tasks?.length > 0) {

            setPendingTasks(tasks.filter((task: Task) => task.status === 'pending'));
            setAssignedTasks(tasks.filter((task: Task) => task.status === 'assigned'));
            setInProgressTasks(tasks.filter((task: Task) => task.status === 'in_progress'));
            setCompletedTasks(tasks.filter((task: Task) => task.status === 'completed'));
        }

    }, [tasks]);


    return (
        <section className="border border-indigo-200 rounded-md overflow-hidden shadow mx-4 md:w-[calc(100vw-280px)]">
            {/* <!-- Task headings container Start--> */}
            <div className="flex text-lg border-b border-indigo-200 font-semibold text-center">
                <span onClick={makeActive} id="pending_btn"
                    className={`heading_btn hover:cursor-pointer flex-1 py-1  border-r border-indigo-200 ${showPending ? "active_tab" : ""}`}>Pending</span>
                <span onClick={makeActive} id="assigned_btn"
                    className={`heading_btn hover:cursor-pointer flex-1 py-1  border-r border-indigo-200 ${showAssigned ? "active_tab" : ""}`}>Assigned</span>
                <span onClick={makeActive} id="in_progress_btn"
                    className={`heading_btn hover:cursor-pointer flex-1 py-1  border-r border-indigo-200 ${showInProgress ? "active_tab" : ""}`}>In progress</span>
                <span onClick={makeActive} id="completed_btn"
                    className={`heading_btn hover:cursor-pointer flex-1 py-1 ${showCompleted ? "active_tab" : ""}`}>Completed</span>
            </div>
            {/* <!-- Task headings container End--> */}

            {/* <!-----Project's tasks container-------> */}
            <div className="flex">

                {/* <!---------------Pending tasks container-----------------------> */}
                {
                    showPending ?
                        <div id="pending" className="tab-content w-full">

                            {pendingTasks.length > 0 ?
                                pendingTasks.map((task: Task, index: number) => {
                                    return (
                                        <div key={index} className="border-b border-gray-200 p-2">
                                            <h3 className="text-xl font-bold">{task.title}</h3>
                                            <p className="text-gray-600 mb-2">{task.description}</p>
                                            <div className="flex items-center justify-between">
                                                <button className="py-1 px-3 bg-indigo-600 rounded-md text-white" onClick={() => handleRequestTask(task)}> Request</button>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="border-b border-gray-200 p-6">No Pending tasks</div>
                            }

                        </div>
                        :
                        <></>
                }
                {/* <!---------------Pending tasks container End-----------------------> */}

                {/* <!---------------Assigned tasks container-----------------------> */}
                {
                    showAssigned ?
                        <div id="assigned" className="tab-content w-full">

                            {assignedTasks.length > 0 ?
                                assignedTasks.map((task: Task, index: number) => {
                                    return (
                                        <div key={index} className="border-b border-gray-200 p-2">
                                            <h3 className="text-xl font-bold">{task.title}</h3>
                                            <p className="text-gray-600 mb-2">{task.description}</p>
                                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    {
                                                        task.assignee ?
                                                            <>
                                                                {/* TODO: Change to Avatar */}
                                                                <div className="avatar placeholder">
                                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                                        <span className="text-2xl font-bold">
                                                                            {capitalize(task.assignee?.first_name[0])}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <p className=" font-semibold">{capitalize(task.assignee?.first_name)} {capitalize(task.assignee?.last_name)}</p>
                                                            </>
                                                            :
                                                            <p className=" font-semibold">Unassigned</p>
                                                    }
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <p>Start: {task.start_at ? formatFullDateTime(task.start_at) : "--"}</p>
                                                    <p>Due: {task.due_at ? formatFullDateTime(task.due_at) : "--"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                )
                                :
                                <div className="border-b border-gray-200 p-6">No Assigned tasks</div>
                            }
                        </div>
                        :
                        <></>
                }
                {/* <!---------------Assigned tasks container End-----------------------> */}

                {/* <!---------------In Progress tasks container-----------------------> */}
                {
                    showInProgress ?
                        <div id="in_progress" className="tab-content w-full">

                            {inProgressTasks.length > 0 ?
                                inProgressTasks.map((task: Task, index: number) => {
                                    return (
                                        <div key={index} className="border-b border-gray-200 p-2">
                                            <h3 className="text-xl font-bold">{task.title}</h3>
                                            <p className="text-gray-600 mb-2">{task.description}</p>
                                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    {task.assignee ?
                                                        <>
                                                            {/* TODO: Change to Avatar component */}
                                                            <div className="avatar placeholder">
                                                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                                    <span className="text-2xl font-bold">{capitalize(task.assignee?.first_name[0])}</span>
                                                                </div>
                                                            </div>

                                                            <p className=" font-semibold">{capitalize(task.assignee?.first_name)} {capitalize(task.assignee?.first_name)}</p>
                                                        </>
                                                        :
                                                        <p className=" font-semibold">Unassigned</p>
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        task.due_at ?
                                                            <p>Due: {formatFullDateTime(task.due_at)}</p>
                                                            :
                                                            <p>No due date</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                                :
                                <div className="border-b border-gray-200 p-6">No In Progress tasks</div>
                            }

                        </div>
                        :
                        <></>
                }

                {/* <!---------------In Progress tasks container End-----------------------> */}

                {/* <!----------------Completed tasks container-----------------------> */}
                {
                    showCompleted ?
                        <div id="completed" className="tab-content w-full">

                            {completedTasks.length > 0 ?
                                completedTasks.map((task: Task, index: number) => {
                                    return (
                                        <div key={index} className="border-b border-gray-200 p-2">
                                            <h3 className="text-xl font-bold">{task.title}</h3>
                                            <p className="text-gray-600 mb-2">{task.description}</p>
                                            <div className="flex items-center justify-between text-gray-700 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    {task.assignee ?
                                                        <>
                                                            <div className="w-10 rounded-full overflow-hidden">
                                                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                            </div>
                                                            <p className=" font-semibold">
                                                                {`${capitalize(task.assignee.first_name)} ${capitalize(task.assignee.last_name)}`}
                                                            </p>

                                                        </>
                                                        :
                                                        // TODO: Change to a button to assign task
                                                        <p className=" font-semibold">Unassigned</p>
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        task.completed_at ?
                                                            <p>Completed: {formatFullDateTime(task.completed_at)}</p>
                                                            :
                                                            // TODO: Change to a button to mark as completed
                                                            <p>No completion date</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                                :
                                <div className="border-b border-gray-200 p-6" >No Completed tasks</div>
                            }
                        </div>
                        :
                        <></>
                }
                {/* <!---------------Completed tasks container End-----------------------> */}

            </div>
            {/* <!-----Project's tasks container End-------> */}
        </section>
    )
}

export default ProjectTaskContainer
