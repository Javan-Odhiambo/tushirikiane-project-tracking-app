import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../../types/types";
// import { PURGE } from "redux-persist";

interface ProjectsState {
    projects: Project[];
}

const initialState = {
    projects: [],
} as ProjectsState;

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        addProject: (state, action) => {
            state.projects.push(action.payload);
        },
        archiveProject: (state, action) => {
            const project = state.projects.find(
                (project) => project.id === action.payload
            );
            if (project) {
                project.is_active = false;
            }
        },
        unarchiveProject: (state, action) => {
            const project = state.projects.find(
                (project) => project.id === action.payload
            );
            if (project) {
                project.is_active = true;
            }
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(PURGE, (state) => {
        //   return initialState;
        // });
    },
});

export const { setProjects, archiveProject, unarchiveProject, addProject } =
    projectsSlice.actions;
export default projectsSlice.reducer;