// Import necessary modules and styles
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDo from "../Todo/ToDo";
import "./ToDos.css";
import loader from "../../assets/loader.gif";
// Define the ToDos component
export default function ToDos() {
  // State to hold todos and loading status
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for search text and filter
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("Select");
  // Get the tokenId from local storage
  const tokenId = localStorage.getItem("tokenId");

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();
  // State for storing the username
  const [username, setUsername] = useState("");

  // Effect to retrieve and set the username from local storage
  useEffect(() => {
    console.log("Before username retrieval");
    const username = localStorage.getItem("username");
    console.log("Retrieved username:", username);
    setUsername(username);
  }, []);

  // Effect to redirect to login if no tokenId is available
  useEffect(() => {
    if (!tokenId) {
      navigate("/login");
    }
  }, [navigate, tokenId]);

  const handleLogout = () => {
    localStorage.removeItem("tokenId");

    localStorage.removeItem("username");
    navigate("/login");
  };
  // Effect to fetch all todos
  useEffect(() => {
    async function getAllTodos(tokenId) {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/getAll",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        }
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    }

    getAllTodos(tokenId);
  }, [tokenId]);
  // Function to search todos based on searchText
  const searchTodos = async () => {
    const response = await fetch(
      `https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=${searchText}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenId,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setTodos(data);
  };
  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  // Function to handle filter selection change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // Function to filter todos based on selected filter
  const filterTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.status);
      case "completed":
        return todos.filter((todo) => todo.status);
      default:
        return todos;
    }
  };

  if (loading) {
    return (
      <div className="loading_container">
        <img src={loader} className="loader" alt="Loading" />
      </div>
    );
  }
  // Render the component
  return (
    <>
      <div className="todos_container">
        <div className="todos_top">
          <Link to="/todos/create" className="add_todo_button">
            <i className="fa fa-plus"> </i>
          </Link>
          <div className="welcome">
            Welcome <strong>{username}</strong> &#128522;
          </div>
          <button onClick={handleLogout}  className="logout_button">
            <i className="fa fa-sign-out"></i>
          </button>

          <div className="search_container">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search here"
              className="search_input"
            />
            <button onClick={searchTodos} className="search_button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="filter_container">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter_select"
            >
              <option value="select">Select</option>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="todos_grid">
          {filterTodos().map((todo) => (
            <div key={todo._id}>
              <ToDo
                id={todo._id}
                name={todo.name}
                description={todo.description}
                status={todo.status}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
