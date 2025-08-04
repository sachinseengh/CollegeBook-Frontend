import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Read message from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      setError(decodeURIComponent(message));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.userName || !formData.password) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setSuccess("");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/signUp", formData);
      setSuccess(response.data.message || "Registration successful!");
      setError("");

      setTimeout(() => {
        navigate("/login", {
          state: { message: "Registration Success! Verify you email and Please log in." },
        });
      }, 1000);
    } catch (err) {
      console.log(err)
    setError(err.response?.data?.error || "Something went wrong.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        {success && <div className="text-green-600 text-center mb-2">{success}</div>}

        <h2 className="text-2xl font-bold text-black mb-6 text-center">CollegeBook</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {["firstName", "lastName", "userName", "password"].map((field) => (
            <TextField
              key={field}
              label={
                field === "userName"
                  ? "Username"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              variant="outlined"
              fullWidth
              name={field}
              type={field === "password" && !showPassword ? "password" : "text"}
              value={formData[field]}
              onChange={handleChange}
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
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
              />
            }
            label={<span className="text-black">Show password</span>}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "rgba(0,0,0,0.3)",
              color: "black",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            }}
          >
            Register
          </Button>
        </form>

        <p className="text-black mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-black/70">
            Go to Login Page
          </Link>
        </p>
      </div>
    </div>
  );
}
