import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../API/AxiosInstance";

export default function Login() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    localStorage.removeItem('jwt');
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signIn', {
        userName: formData.userName,
        password: formData.password,
      });
     
      localStorage.setItem('jwt', response.data.data);
      setSuccess("Login SuccessFul");
      setError("")

      navigate("/home",{
        state:{username:formData.userName}
      });


    } catch (error) {
      
      if (error.response) {
      
        const backendError = error.response.data.error || error.response.data.message;

        if (error.response.status === 400) {
          setError(backendError || 'Invalid username or password.');
          console.log("400");
        } else if (error.response.status === 404) {
          setError(backendError || 'User not found.');
        
        } else {
          setError('Something went wrong. Please try again.');
        
        }
      } else {
        setError('Server not responding.');
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          {message && (
            <div className="text-green-500 text-center">{message}</div>
          )}
          <div className="text-red-500 text-center">{error}</div>
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            CollegeBook
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
            required
              label="Username"
              variant="outlined"
              fullWidth
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
            />
            <TextField
            required
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0,0,0,0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
            />
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
              Login
            </Button>
          </form>
          <p className="text-black mt-6 text-sm text-center">
            No account?{" "}
            <a href="/register" className="underline hover:text-black/70">
              Go to Registration Page
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
