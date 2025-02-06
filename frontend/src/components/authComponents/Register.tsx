import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as smartItineraryApi from "../../api/smartItineraryApi";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

const Register = () => {
  const [message, setMessage] = useState("");

  // Initialize navigate
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    setMessage("");
    try {
      await smartItineraryApi.register(email, password); // Call API to register
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };
  return (
    <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
      <AuthForm onSubmit={handleRegister} formTitle="Register" />

      {message && (
        <Alert
          severity={message.includes("failed") ? "error" : "success"}
          style={{ marginTop: "16px" }}
        >
          {message}
        </Alert>
      )}

      <p style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#0078d7", textDecoration: "none" }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
