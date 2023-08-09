import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import WelcomePage from "./components/WelcomePage";
import EditTodo from "./components/EditTodo/EditTodo"; 
import ToDoDetails from "./components/ToDoDetails/ToDoDetails"; //
import ToDos from "./components/ToDos/ToDos"; //
import CreateTodo from "./components/CreateTodo/CreateTodo"; //


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/todos",
    element: <ToDos />,
  },
  {
    path: "/todo/:id",
    element: <ToDoDetails />,
  },
  {
    path: "/todos/create",
    element: <CreateTodo />,
  },
  {
    path: "/todo/edit/:id",
    element: <EditTodo />,
  },
 
  {
    path: "*",
    element: <WelcomePage />,
  },
]);


const App = () => {
  return (
    <>
     <RouterProvider router={router} />
    </>
  );
};

export default App;
