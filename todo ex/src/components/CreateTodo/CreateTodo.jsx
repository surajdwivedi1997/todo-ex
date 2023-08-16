// Import necessary modules and styles
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTodo.css";

// Define the CreateTodo component

export default function CreateTodo() {
  // State to hold the new todo's information
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    status: false,
  });
  
  // Get the tokenId from local storage
  const tokenId = localStorage.getItem("tokenId");
  // Get the navigation function from react-router-dom
  const navigate = useNavigate();
  // Function to add a new todo
  const addTodo = async () => {
    try {
      // Make a POST request to the API to create a new todo
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/create",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(newTodo),
        }
      );
      // Check if the response is not okay, throw an error
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      // If response is okay, navigate to the "/todos" route

      if (response.ok) {
        navigate("/todos");
      } else {
        throw new Error("Failed to delete todo");
      }
      // Parse the response data as JSON
      const data = await response.json();
      console.log(data);
      // Reset the newTodo state to clear the input fields
      setNewTodo({
        name: "",
        description: "",
        status: false,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewTodo({
      ...newTodo,
      [name]: newValue,
    });
  };
  // Function to handle navigating back
  const handleBack = () => {
    navigate(`/todos`);
  };
  // Render the component
  return (
    <>
      <div className="main">
        <div className="create_container">
          <h2 className="heading">Add Todo</h2>
          <input
            className="input"
            type="text"
            name="name"
            value={newTodo.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            className="input"
            type="text"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <label className="checkboxLabel">
            <bold>Completed:&nbsp;</bold>
            <input
              className="checkbox"
              type="checkbox"
              name="status"
              checked={newTodo.status}
              onChange={handleInputChange}
            />
          </label>

          <div className="buttons">
            <button className="button" onClick={addTodo}>
              ADD TODO
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
