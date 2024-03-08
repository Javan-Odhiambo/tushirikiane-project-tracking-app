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
        // createTask: builder.mutation({
        //     query: ({projectID, task}: {projectID:string, task: Task}) => ({
        //         url: `/projects/${projectID}/tasks/`,
        //         method: "POST",
        //         body: task,
        //     })
        // }),
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
            query: ({taskID, requestID}) => ({
                url: `/tasks/${taskID}/request/${requestID}/approve/`,
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
        createRequest: builder.mutation({
            query: (taskID) => ({
                url: `/tasks/${taskID}/requests/`,
                method: "POST",
            }),
            invalidatesTags: ["Tasks", "Requests"]
        }),

    })
})

export const {
    useGetTasksListQuery,
    // useCreateTaskMutation,
    useGetTaskByIdQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useApproveTaskMutation,
    useRejectTaskMutation,
    useGetRequestsQuery,
    useGetMyTasksListQuery,
    useCreateRequestMutation,
} = taskApiSlice