import { Project, Task } from "../../../types/types";
import { apiSlice } from "../../services/apiSlice";



const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProjectById: builder.query<Project, (string | undefined)>({
            query: (id) => `/projects/${id}/`
        }),
        getProjectsList: builder.query<Project[], void>({
            query: () => ({
                url: "/projects/",
            })
        }),
        getMembersList: builder.query<Project[], (string | undefined)>({
            query: (id) => ({
                url: `/projects/${id}/members/`,
            })
        }),
        //TODO: Test this
        getProjectTaskList: builder.query<Task[], (string | undefined)>({
            query: (id) => ({
                url: `/projects/${id}/tasks/`,
            })
        }),
        //TODO: Test this
        createMember: builder.mutation({
            query: ({ id, emails }) => ({
                url: `/projects/${id}/members/`,
                method: "POST",
                body: { emails },
            })
        }),
        //TODO: Test this
        createTask: builder.mutation({
            query: ({ id, task }: {id:string, task: Task}) => ({
                url: `/projects/${id}/tasks/`,
                method: "POST",
                body: { task },
            })
        }),
        createProject: builder.mutation({
            query: ({ title, description, is_active }) => ({
                url: "/projects/",
                method: "POST",
                body: { title, description, is_active },
            })
        }),
        //TODO: Test this
        removeProjectMember: builder.mutation({
            query: ({ id, memberID }) => ({ // TODO: Confirm this
                url: `/projects/${id}/remove_member/`,
                method: "POST",
                body: { memberID },
            })
        }),
        //TODO: Test this
        removeProjectAdmin: builder.mutation({
            query: ({ id, memberID }) => ({
                url: `/projects/${id}/remove_admin/`,
                method: "POST",
                body: { memberID },
            })
        }),
        //TODO: Test this
        makeProjectAdmin: builder.mutation({
            query: ({ id, memberID }) => ({
                url: `/projects/${id}/make_admin/`,
                method: "POST",
                body: { memberID },
            })
        }),
        archiveProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}/archive_project/`,
                method: "POST",
                body: { id },
            })
        }),
        unarchiveProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}/unarchive_project/`,
                method: "POST",
                body: { id },
            })
        }),
        leaveProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}/leave_project/`,
                method: "POST",
                body: { id },
            })
        }),

    })
})

export const {
    useGetProjectsListQuery,
    useCreateProjectMutation,
    useGetProjectByIdQuery,
    //update Project /projects/{id}/
    useArchiveProjectMutation,
    useLeaveProjectMutation,
    useGetMembersListQuery,
    useCreateMemberMutation,
    useUnarchiveProjectMutation,
    useRemoveProjectMemberMutation,
    useRemoveProjectAdminMutation,
    useMakeProjectAdminMutation,
    useGetProjectTaskListQuery,
    useCreateTaskMutation
} = projectApiSlice