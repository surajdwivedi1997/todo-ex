// Importing required modules from React and React Router
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  // State variables to hold form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // eslint-disable-next-line 
  const [error, setError] = useState("");
  // Hook for navigation, used to redirect after successful signup
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with user data from form inputs
    const userData = {
      name: username,
      email: email,
      password: password,
    };

    try {
      // Send a POST request to the server for user registration
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Additional headers that might be required by the server
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
        console.log(response, "response");

        const data = await response.json();
        if ("token" in data.data) {
          // If the "token" key exists in the response, it means successful login
          localStorage.setItem("tokenId", data.data.token); // Set the user's token
          localStorage.setItem("username", data.data.name); // Set the user's name
          console.log("User's Email => ", data.data.email);
          console.log("User's token => ", data.data.token);

          setError(""); // Clear any previous error messages
        } else {
          console.log("Error!");
          setError("Invalid credentials. Please try again.");
        }
        console.log(data);
        // Store user's name in local storage
        localStorage.setItem("username", username);
        console.log(username);

        // Redirect the user to the login page
        navigate("/todos");
      } else {
        // If the response is not successful, parse the JSON error data
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  // JSX code for the signup form UI
  return (
    <>
      <div className="main_container">
        <form onSubmit={handleSubmit} className="signup_form">
          <h2>SIGN UP</h2>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Please enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="linkStyle">
            SIGN UP
          </button>
          <div>
            Already have an account?&nbsp;&nbsp;
            <Link
              to="/login"
              style={{
                marginBottom: "20px",
                textDecoration: "none",
                color: "blueviolet",
              }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
// Export the SignUp component as the default export
export default SignUp;
