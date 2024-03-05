import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import projectsReducer from "./features/projects/projectsSlice";
import { apiSlice } from "./services/apiSlice";
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   persistReducer,
//   persistStore,
// } from "redux-persist";
// import storage from "./storage";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: rootReducer, // persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export const store = makeStore();
setupListeners(store.dispatch);
// export const persistor = persistStore(store);
// export const purgeData = async () => {
//   await persistor.purge();
// };
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];