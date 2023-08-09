import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ToDo.css";

export default function ToDo(props) {
  const { id, name, description, status } = props;

  return (
    <> 
    <Link to={`/todo/${id}`} className="title_link">
      <div className="todo_card">
        <h3 className="todo_card_title">
         
           <h1>{name}</h1> 
          
        </h3>
        <p className="todo_card_description">{description}</p>
        <p className="todo_card_status">
          Status - {!status ? "Active" : "Completed"}
        </p>
     
      </div>
      </Link>
    </>
  );
}

ToDo.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.bool,
};
