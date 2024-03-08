import ProjectCard from "../../../components/ProjectCard";
import { Member, Project, Task, TaskInput } from "../../../types/types";
import { apiSlice } from "../../services/apiSlice";



const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProjectById: builder.query<Project, (string | undefined)>({
            query: (id) => `/projects/${id}/`,
            providesTags: ["Project"],
        }),
        getProjectsList: builder.query<Project[], void>({
            query: () => ({
                url: "/projects/",
            }),
            providesTags: ["Projects"],
        }),
        getMembersList: builder.query<Member[], (string | undefined)>({
            query: (id) => ({
                url: `/projects/${id}/members/`,
            }),
            providesTags: ["Members"],
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
            query: ({ projectID, ...task }: {projectID: string, task: TaskInput}) => ({
                url: `/projects/${projectID}/tasks/`,
                method: "POST",
                body: { task },
            })
        }),
        createProject: builder.mutation({
            query: ({ title, description, is_active }) => ({
                url: "/projects/",
                method: "POST",
                body: { title, description, is_active },
            }),
            invalidatesTags: ["Projects"]
        }),
        //TODO: Test this
        removeProjectMember: builder.mutation({
            query: ({ id, memberID }) => ({ // TODO: Confirm this
                url: `/projects/${id}/remove_member/`,
                method: "POST",
                body: { memberID },
            }),
            invalidatesTags: ["Members"]
        }),
        //TODO: Test this
        removeProjectAdmin: builder.mutation({
            query: ({ id, memberID }) => ({
                url: `/projects/${id}/remove_admin/`,
                method: "POST",
                body: { memberID },
            }),
            invalidatesTags: ["Members"]
        }),
        //TODO: Test this
        makeProjectAdmin: builder.mutation({
            query: ({ id, memberID }) => ({
                url: `/projects/${id}/make_admin/`,
                method: "POST",
                body: { memberID },
            }),
            invalidatesTags: ["Members"]
        }),
        archiveProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}/archive_project/`,
                method: "POST",
                body: { id },
            }),
            invalidatesTags: ["Project"]
        }),
        unarchiveProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}/unarchive_project/`,
                method: "POST",
                body: { id },
            }),
            invalidatesTags: ["Project"]
        }),
        leaveProject: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}/leave_project/`,
                method: "POST",
                body: { id },
            }),
            invalidatesTags: ["Project", "Projects"]
        }),
        getRequestList: builder.query<Request[], (string | undefined)>({
            query: (id) => ({
                url: `/projects/${id}/requests/`,
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
    useCreateTaskMutation,
    useGetRequestListQuery
} = projectApiSlice