// Import necessary modules and styles

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ToDoDetails.css";
import loader from "../../assets/loader.gif";
// Define the ToDoDetails component
export default function ToDoDetails() {
  // Create a ref to track whether the component has been rendered before
  const rendered = useRef(false);
  // Get the todoId from URL parameters
  const params = useParams();
  const todoId = params.id;
  console.log(todoId);
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();
  // Get the tokenId from local storage
  const tokenId = localStorage.getItem("tokenId");
  // Initialize state for loading
  const [loading, setLoading] = useState(true);
  // Initialize state for todo details

  const [todo, setTodo] = useState({
    todoheading: "",
    tododescription: "",
    todostatus: "",
  });
  // useEffect to fetch todo details
  useEffect(() => {
    const getTodoDetails = async (tokenId) => {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${todoId}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Cache-Control": "no-cache",
            Accept: "*/*",
          },
        }
      );
      const body = await response.json();
      console.log(body);
      setTodo({
        todoheading: body.name,
        tododescription: body.description,
        todostatus: body.status,
      });
      setLoading(false);
    };

    if (!rendered.current && tokenId) {
      getTodoDetails(tokenId);
    }

    return () => {
      rendered.current = true;
    };
  }, [todoId, tokenId]);
  // If still loading, display a loader
  if (loading) {
    return (
      <div className="loading_container">
        <img src={loader} className="loader" alt="" />
      </div>
    );
  }
  // Function to handle editing the todo
  const handleEdit = () => {
    localStorage.setItem("heading", todo.todoheading);
    localStorage.setItem("description", todo.tododescription);
    localStorage.setItem("status", todo.todostatus);
    navigate(`/todo/edit/${todoId}`);
  };
  // Function to handle deleting the todo
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/delete?id=${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + tokenId,
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );

      if (response.ok) {
        navigate("/todos");
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  // Function to handle navigating back
  const handleBack = () => {
    navigate("/todos");
  };
  // Render the component
  return (
    <>
      <div className="main">
        <div className="todo_details">
          <h1>TODO DETAILS</h1>
          <h2>{todo.todoheading}</h2>
          <p>{todo.tododescription}</p>
          <p className="status">
            <strong>
              Status - {!todo.todostatus ? "Active" : "Completed"}
            </strong>
          </p>
          <br />

          <div className="button_group">
            <button onClick={handleEdit} className="edit">
              <i className="fa fa-edit"></i>
            </button>
            <button onClick={handleDelete} className="delete">
              <i class="fa fa-trash-o"></i>
            </button>
            <button onClick={handleBack} className="back">
              <i class="fa fa-arrow-circle-o-left"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
