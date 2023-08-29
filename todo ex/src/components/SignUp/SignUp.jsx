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
    e.preventDefault();

    // Check if any required field is empty
    if (!email || !password || !username) {
      setError("Please fill in all the required fields.");
      return;
    }

    // Create an object with user data from form inputs
    const userData = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(
        "https://todos-api-aeaf.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json(); // Read response body once

      if (response.ok) {
        if ("token" in data.data) {
          localStorage.setItem("tokenId", data.data.token);
          localStorage.setItem("username", data.data.name);
          navigate("/todos");
        } else {
          setError("Signup failed: " + data.message); // Set the error message
        }
      } else {
        setError("Signup failed: DUPLICATE ENTRY ");
        console.log("Signup failed: DUPLICATE ENTRY"); // Handle error based on parsed JSON
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
          {/* Error message section */}
          {error && <p className="error_message">{error}</p>}

          <button type="submit" className="linkStyle">
            SIGN UP
          </button>
          <div >
           <p className="already_acc"> Already have an account?&nbsp;</p>
            <Link className="link_Login" to="/login">
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
