import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

const Login = () => {
  const [message, setMessage] = useState("");
  const { login } = useAuth(); // Get the login function from the useAuth hook
  const navigate = useNavigate(); // Navigate to the next page

  const handleLogin = async (email, password) => {
    setMessage(""); // Reset message before attempting login
    const result = await login(email, password);
    if (result.success) {
      navigate("/home"); // Redirect if login is successful
    } else {
      setMessage(result.message); // Set the error message to display
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
      <AuthForm onSubmit={handleLogin} formTitle="Login" />
      {message && (
        <Alert severity="error" style={{ marginTop: "16px" }}>
          {message}
        </Alert>
      )}
      <p style={{ marginTop: "16px" }}>
        <Link to="/">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
