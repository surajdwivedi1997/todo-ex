import React, { useEffect, useState } from "react";
import {  useNavigate ,Routes,Route } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import WelcomePage from "./components/WelcomePage";
import EditTodo from "./components/EditTodo/EditTodo"; 
import ToDoDetails from "./components/ToDoDetails/ToDoDetails"; //
import ToDos from "./components/ToDos/ToDos"; //
import CreateTodo from "./components/CreateTodo/CreateTodo"; //


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <WelcomePage />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/todos",
//     element: <ToDos />,
//   },
//   {
//     path: "/todo/:id",
//     element: <ToDoDetails />,
//   },
//   {
//     path: "/todos/create",
//     element: <CreateTodo />,
//   },
//   {
//     path: "/todo/edit/:id",
//     element: <EditTodo />,
//   },
 
//   {
//     path: "*",
//     element: <WelcomePage />,
//   },
// ]);


const App = () => {
  const navigate = useNavigate();
  const tokenData = localStorage.getItem("tokenId");
  const location = window.location.pathname
  
  console.log(location )
  const [isToken] = useState(tokenData)
  

  useEffect(()=>{

    if(isToken){
      console.log(isToken)
      navigate("/todos")
    }
    else
    {
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/todos" element={<ToDos/>}/>
      <Route path="/todo/:id" element={<ToDoDetails/>}/>
      <Route path="/todos/create" element={<CreateTodo/>}/>
      <Route path="/todo/edit/:id" element={<EditTodo />}/>
     
      <Route path="*" element={<WelcomePage />}/>
    </Routes>
     {/* <RouterProvider router={router} />    */}
    </>
  );
};

export default App;
