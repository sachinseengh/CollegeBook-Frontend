import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post("/auth/forget-password", emailOrUsername, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      console.log("Forget password response:", response.data);

      // Redirect to login with message
      navigate("/login", {
        state: { message: "Password reset link sent to your email!" },
      });
    } catch (err) {
      console.error("Error sending password reset link:", err);
      const serverMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "Something went wrong";
      setError(serverMsg);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">Forgot Password</h2>

        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        {success && <div className="text-green-500 text-center mb-2">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TextField
            required
            label="Username or Email"
            variant="outlined"
            fullWidth
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(0,0,0,0.5)" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "rgba(0,0,0,0.3)",
              color: "black",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
