import React, { useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import WelcomePage from "./components/WelcomePage";
import EditTodo from "./components/EditTodo/EditTodo";
import ToDoDetails from "./components/ToDoDetails/ToDoDetails"; //
import ToDos from "./components/ToDos/ToDos"; //
import CreateTodo from "./components/CreateTodo/CreateTodo"; //
import NotFound from "./components/NotFound";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenData = localStorage.getItem("tokenId");
  const isLoggedIn = !!tokenData; // Convert tokenData to a boolean

  useEffect(() => {
    if (isLoggedIn) {
      // If logged in, navigate to the appropriate location
      console.log(location.pathname)
      const redirectTo = location.pathname.startsWith("/todos")
        ? location.pathname 
        : "/todos";
      navigate(redirectTo);
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    const validRoutes = [
      "/",
      "/login",
      "/signup",
      "/todos",
      "/todo", 
      "/todos/create",
      "/todo/edit/*", 

     
    ];

    // Check if the current location is not a valid route
    if (!validRoutes.includes(location.pathname)) {
      // Redirect to NotFound page
      navigate("*");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todos" element={<ToDos />} />
        <Route path="/todos/create" element={<CreateTodo />} />
        <Route path="/todo/:id" element={<ToDoDetails />} />
        <Route path="/todo/edit/:id" element={<EditTodo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
