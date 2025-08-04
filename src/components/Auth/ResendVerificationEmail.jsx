import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../API/AxiosInstance";
import Button from "@mui/material/Button";

const ResendVerificationEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");

    if (!emailParam) {
      // No email param, redirect to login page
      navigate("/login");
    } else {
      setEmail(emailParam);
    }
  }, [location, navigate]);

  const handleResend = async () => {
  setMessage("");
  setError("");
  try {
    const res = await axiosInstance.post("/auth/resend-verification", { email });
    
    // Redirect to login page with success message
    navigate("/login", {
       state: { message: "Check your gmail and Verify " },
    });
  } catch (err) {
    setError(err.response?.data || "Something went wrong.");
  }
};


  return (
    <div className="max-w-md mx-auto p-4 mt-8 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Email Not Verified</h2>

      <p className="mb-4">
        Your email <strong>{email}</strong> is not verified.
      </p>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <Button variant="contained" onClick={handleResend}>
        Resend Verification Email
      </Button>
    </div>
  );
};

export default ResendVerificationEmail;
