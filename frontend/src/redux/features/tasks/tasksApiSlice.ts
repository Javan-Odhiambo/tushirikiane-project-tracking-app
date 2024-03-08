import {  Task } from "../../../types/types";
import { apiSlice } from "../../services/apiSlice";



const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasksList: builder.query<Task[], void>({
            query: () => ({
                url: "/tasks/",
            })
        }),
        getMyTasksList: builder.query<Task[], void>({
            query: () => ({
                url: "/tasks/mine/",
            })
        }),
        getTaskById: builder.query<Task, (string | undefined)>({
            query: (id) => `/tasks/${id}/`
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: "/tasks/",
                method: "POST",
                body: task,
            })
        }),
        updateTask: builder.mutation({
            query: ({ id, task }: {id:string, task: Task}) => ({
                url: `/tasks/${id}/`,
                method: "PUT",
                body: task,
            })
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}/`,
                method: "DELETE",
            })
        }),
        approveTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}/approve_request/`,
                method: "POST",
            })
        }),
        rejectTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}/reject_request/`,
                method: "POST",
            })
        }),
        getRequests: builder.query<Task[], (string | undefined)>({
            query: (id) => ({
                url: `/tasks/${id}/requests/`,
            })
        }),


    })
})

export const {
    useGetTasksListQuery,
    useCreateTaskMutation,
    useGetTaskByIdQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useApproveTaskMutation,
    useRejectTaskMutation,
    useGetRequestsQuery,
    useGetMyTasksListQuery
} = taskApiSlice