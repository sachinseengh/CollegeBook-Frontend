import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState(""); // To capture errors
  const [success, setSuccess] = useState(""); // To capture success message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("hi");

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // API call to register user
    try {
      const response = await axiosInstance.post("/auth/signUp", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        password: formData.password,
      });

      setSuccess(response.data.message); // Assuming success message comes from backend
      setError(""); // Clear error if registration is successful

      // Redirect to login page with success message
      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });

    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong");
      setSuccess(""); // Clear success message if there's an error
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <div className="text-red-500 text-center">{error}</div>
        <h2 className="text-2xl font-bold text-black mb-6 text-center">CollegeBook</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
          <TextField
            label="UserName"
            variant="outlined"
            fullWidth
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
              />
            }
            label={<span className="text-black">Show password</span>}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
            }}
          >
            Register
          </Button>
        </form>
        <p className="text-black mt-6 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="underline hover:text-black/70">
            Go to Login Page
          </a>
        </p>
      </div>
    </div>
  );
}
