import "./WelcomePage.css";

import { Link } from "react-router-dom";


export default function WelcomePage() {
  return (
    <>
      <div className="main_container">
        <div className="welcome_container">
          <div className="welcome_heading"> TODO LIST</div>
          <div className="welcome_buttons">
            <Link to="/login" >
             <button  className="button-64">LOGIN</button> 
        
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signup" >
            <button  className="button-64">SIGN UP</button> 
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
}