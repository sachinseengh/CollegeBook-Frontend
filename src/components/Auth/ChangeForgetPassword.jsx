// src/pages/ChangeForgetPassword.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function ChangeForgetPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    const changePassword = async () => {
      try {
        const response = await axiosInstance.get(`/auth/change-password?token=${token}`);
        setMessage(response.data);

        // Redirect to login after 4 seconds with success message
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Password has been reset to BCACONNECT. Please login and change it." },
          });
        }, 4000);
      } catch (err) {
        const serverMsg =
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data?.message || "Something went wrong";
        setError(serverMsg);
      }
    };

    changePassword();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-black mb-6">Password Reset</h2>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!message && !error && <div className="text-black">Processing your request...</div>}
      </div>
    </div>
  );
}
