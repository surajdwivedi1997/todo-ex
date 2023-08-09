import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToDo from "../Todo/ToDo";
import "./ToDos.css";
import loader from "../../assets/loader.gif";

export default function ToDos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("Select");
  const tokenId = localStorage.getItem("tokenId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenId) {
      navigate("/login");
    }
  }, [navigate, tokenId]);

  useEffect(() => {
    async function getAllTodos(tokenId) {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/todo/getAll",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenId,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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

  return (
    <>
      <div className="todos_container">
        <div className="todos_top">
          <Link to="/todos/create" className="add_todo_button">
            <i className="fa fa-plus"> </i>
          </Link>
          <div className="search_container">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search here"
              className="search_input"
            />
            <button onClick={searchTodos} className="search_button"><i class="fa fa-search" ></i>
             
            </button>
          </div>
          <div className="filter_container">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter_select"
            >  
            <option value="select"><strong>Select</strong></option>
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
