import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../../types/types";
// import { PURGE } from "redux-persist";

interface TasksState {
    tasks: Task[];
}

const initialState = {
    tasks: [],
} as TasksState;

const tasksSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // TODO: Add Reducers

        // setTasks: (state, action) => {
        //     state.tasks = action.payload;
        // },
        // archiveProject: (state, action) => {
        //     const task = state.tasks.find(
        //         (task) => task.id === action.payload
        //     );
        //     if (task) {
        //         task.is_active = false;
        //     }
        // },

    },
    extraReducers: (builder) => {
        // builder.addCase(PURGE, (state) => {
        //   return initialState;
        // });
    },
});

export const { /* TODO: Add Reducers */ } =
    tasksSlice.actions;
export default tasksSlice.reducer;