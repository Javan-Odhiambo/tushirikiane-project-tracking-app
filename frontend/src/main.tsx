import React from "react";
import ReactDOM from "react-dom/client";

import Provider from "./redux/provider";

import Landing from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectList from "./pages/ProjectList";
import Signup from "./pages/Signup";
import Tasks from "./pages/Tasks";
import ResetPassword from "./pages/ResetPassword";



import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Setup } from "./components/utils"
import { PersistGate } from "redux-persist/integration/react";
import AuthRequired from "./pages/AuthRequired";
import { persistor } from "./redux/store";


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
    element: <AuthRequired><ProjectList /></ AuthRequired>
  },
  {
    path: "project/:projectId",
    element: <AuthRequired><ProjectDetail /></AuthRequired>
  },
  {
    path: "tasks",
    element: <AuthRequired><Tasks /></AuthRequired>
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <Setup />
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
