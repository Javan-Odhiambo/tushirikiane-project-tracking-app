import React from "react";
import ReactDOM from "react-dom/client";

import Landing from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectList from "./pages/ProjectList";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import ResetPassword from "./pages/ResetPassword";


import { UserProvider } from '../context/UserContext';

import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthRequired from "./pages/AuthRequired";


//TODO: Add flash messages
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />
  },
  {
    path: "signup",
    element: <Signup />
  },
  {
    path: "password-reset",
    element: <ResetPassword />
  },
  {
    path: "projects",
    element: <ProjectList />
  },
  {
    path: "project/:projectId",
    element: <ProjectDetail />
  },
  {
    path: "tasks",
    element: <Tasks />
  },
  {
    path: "test",
    element: <AuthRequired />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>
);
