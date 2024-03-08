import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import { useGetMyTasksListQuery } from '../redux/features/tasks/tasksApiSlice';
import TaskListContainer from '../components/TasksListContainer';

const Tasks: React.FC = () => {

    const { data: tasks, isLoading } = useGetMyTasksListQuery();

  return (
    <>
    <Header/>
    <main className="flex-grow flex flex-col items-center">
    <h1 className="text-3xl font-bold my-4">My Tasks</h1>
    
    <TaskListContainer />

</main>
</>
  )
}

export default Tasks