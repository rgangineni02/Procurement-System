import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Ensure to link the CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // To navigate after successful login

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    // Check if email and password are provided
    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }

    // Send API request to backend to validate credentials
    try {
      const response = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store JWT token in localStorage
        localStorage.setItem("authToken", data.token);

        // If 'rememberMe' is checked, store it persistently, else it expires on browser close
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", true);
        }

        // Redirect to dashboard after successful login
        navigate("/orders");
      } else {
        // If login fails, show error message
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error if any */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="auth-options">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
