import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../API/AxiosInstance";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // Debug: log location on each render
  useEffect(() => {
    console.log("Login component mounted. Location:", location);
  }, [location]);

  // Handle OAuth redirects with token or message in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const messageFromURL = params.get("message");

    console.log("URL Params token:", token, "message:", messageFromURL);

    if (token) {
      console.log("Token found in URL, storing JWT and navigating to /home");
      localStorage.setItem("jwt", token);
      navigate("/home");
    } else if (messageFromURL) {
      setError(decodeURIComponent(messageFromURL));
    }
  }, [navigate]);

  // Show message passed via location state (e.g. after registration)
  useEffect(() => {
    if (location.state && location.state.message) {
      console.log("Location state message:", location.state.message);
      setMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    setError("");
    setSuccess("");
    setMessage("");

    console.log("Submitting login with:", formData);

    try {
      const response = await axiosInstance.post("/auth/signIn", {
        userName: formData.userName,
        password: formData.password,
      });

      console.log("Login response:", response.data);

      localStorage.setItem("jwt", response.data.data); // Adjust if token is elsewhere
      setSuccess("Login Successful");

      console.log("Stored JWT:", localStorage.getItem("jwt"));
      navigate("/home", {
        state: { username: formData.userName },
      });
    } catch (err) {
      const status = err.response?.status;
      const serverMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.error ||
            err.response?.data?.message ||
            "Unknown error";

      console.error("Login error:", status, serverMsg);

      if (serverMsg === "Email not verified") {
        navigate(
          `/resend-email?email=${encodeURIComponent(formData.userName)}`
        );
      
      } else if (status === 400 || status === 401) {
        setError(serverMsg || "Invalid username or password.");
      } else if (status === 404 && serverMsg === "User not found") {
        setError("User not found.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    const clientId =
      "721082640319-0ldnn9hvqmm57j1am401cq0pnn1idkq0.apps.googleusercontent.com"; // Your Google client ID
    const redirectUri = "http://localhost:8080/auth/google/callback";
    const scope = "openid email profile";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    console.log("Redirecting to Google OAuth:", authUrl);
    window.location.href = authUrl;
  };

  const handleGitHubLogin = () => {
    const clientId = "Ov23likCWv1m4x4PSDLb"; // Your GitHub client ID
    const redirectUri = "http://localhost:8080/auth/github/callback";
    const scope = "user:email";

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    console.log("Redirecting to GitHub OAuth:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {message && (
          <div className="text-green-500 text-center mb-2">{message}</div>
        )}
        {success && (
          <div className="text-green-500 text-center mb-2">{success}</div>
        )}
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}

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
                "& fieldset": { borderColor: "rgba(0,0,0,0.5)" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
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
                "& fieldset": { borderColor: "rgba(0,0,0,0.5)" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
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
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
          >
            Login
          </Button>
        </form>

        <Button
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            mt: 2,
            backgroundColor: "#4285F4",
            color: "white",
            "&:hover": { backgroundColor: "#357ae8" },
          }}
        >
          Login with Google
        </Button>

        <Button
          fullWidth
          onClick={handleGitHubLogin}
          sx={{
            mt: 2,
            backgroundColor: "#24292e",
            color: "white",
            "&:hover": { backgroundColor: "#1b1f23" },
          }}
        >
          Login with GitHub
        </Button>

        <p className="text-black mt-6 text-sm text-center">
          No account?{" "}
          <a href="/register" className="underline hover:text-black/70">
            Go to Registration Page
          </a>
        </p>

        <p className="text-black mt-2 text-sm text-center">
          Forget password?{" "}
          <a href="/forget-password" className="underline hover:text-black/70">
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}
