// Importing required modules from React and React Router
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// Importing styles from the Login.css file
import "./Login.css";

const Login = () => {
  // State variables to hold form input values and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // This is used to track the user's name after successful login
  const [name, setName] = useState("");
  // This is used to display error messages
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
// Create an object with user data from form inputs
    const userData = {
      email,
      password,
    };

    try {
      // Send a POST request to the server for user login
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          // Convert user data to JSON and send in the request body
          body: JSON.stringify(userData),
        }
      );

 
      if (response.ok) {
         
       // If the response is successful, parse the JSON response dat
        const data = await response.json();
        if ("token" in data.data) {
           // If the "token" key exists in the response, it means successful login
          localStorage.setItem("tokenId", data.data.token);// Set the user's token
          localStorage.setItem("username", data.data.name);// Set the user's name
          console.log("User's Email => ", data.data.email);
          console.log("User's token => ", data.data.token);
          setName(data.data.name);// Set the user's name
          setError("");// Clear any previous error messages
        } else {
          console.log("Error!");
          setError("Invalid credentials. Please try again.");
        }
        console.log(data);
      } else {
        // If the response is not successful, parse the JSON error data
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
    }
  };
// JSX code for the login form UI
  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit} className="login_form">
          <h2>LOGIN</h2>
          <input
            type="email"
            placeholder=" Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error_message">{error}</p>}
          <button type="submit">LOGIN</button>
          <div className="signup_message">
            Don&apos;t have an account?&nbsp;&nbsp;
            <Link
              to="/signup"
              style={{
                marginBottom: "20px",
                textDecoration: "none",
                color: "blueviolet",
              }}
            >
              SignUp
            </Link>
          </div>

          {name && <Navigate to="/todos" replace={true} />}
          {!name && <Navigate to="/login" replace={true} />}
        </form>
      </div>
    </>
  );
};

export default Login;
