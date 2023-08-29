// Import necessary modules and styles
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditTodo.css";
// Define the EditTodo component
export default function EditTodo() {
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();
  // Get the todoId from URL parameters
  const param = useParams();
  const todoId = param.id;
  // Get the tokenId from local storage
  const tokenId = localStorage.getItem("tokenId");
  // Get todo details from local storage
  const todoHeading = localStorage.getItem("heading");
  const todoDescription = localStorage.getItem("description");
  const todoStatus = localStorage.getItem("status");
  // Initialize state for todo
  const [todo, setTodo] = useState({
    name: todoHeading,
    description: todoDescription,
    status: todoStatus === "true",
  });

  // Function to handle editing the todo
  const handleEdit = async () => {
    console.log(todo.status);
    try {
      // Make a PUT request to the API to update the todo
      const response = await fetch(
        `https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${todoId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(todo),
        }
      );
      // Check if the response is not okay, throw an error
      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      // If response is okay, navigate to the "/todos" route
      if (response.ok) {
        navigate("/todos");
        console.log("updated successfully");
      } else {
        throw new Error("Failed");
      }
      // Parse the response data as JSON
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTodo({
      ...todo,
      [name]: newValue,
    });

    console.log(todo);
  };

  // Function to handle navigating back
  const handleBack = () => {
    navigate(`/todo/${todoId}`);
  };
  // Render the component
  return (
    <>
      <div className="main_container">
        <div className="edit_container">
          <h2 className="heading">EDIT TODO</h2>
          <input
            className="input"
            type="text"
            name="name"
            value={todo.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            className="input"
            type="text"
            name="description"
            value={todo.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <label className="checkboxLabel">
            Completed:
            <input
              className="checkbox"
              type="checkbox"
              name="status"
              checked={todo.status}
              onChange={handleInputChange}
            />
          </label>
          <div className="buttons">
            <button className="button" onClick={handleEdit}>
              UPDATE
            </button>
            <button className="button" onClick={handleBack}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
