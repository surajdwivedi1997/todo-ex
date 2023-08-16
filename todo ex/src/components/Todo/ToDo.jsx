
// Import necessary modules and styles
import { Link,} from "react-router-dom";
import "./ToDo.css";
// Define the ToDo component
export default function ToDo({ id, name, description, status }) {




 

  // Render the component
  return (
    <>
      <Link to={`/todo/${id}`} className="title_link">
        <div className="todo_card">
          <h3 className="todo_card_title">
            <h1>{name}</h1>
          </h3>
          <p className="todo_card_description">{description}</p>
          <p className="todo_card_status">
            Status - {!status ? "NOT completed" : "Completed"}
          </p>
        </div>
        
      </Link>
    </>
  );
}


