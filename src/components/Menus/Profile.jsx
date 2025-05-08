// src/component/Profile.jsx
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../API/AxiosInstance";

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [message,setMessage]= useState("");
  const navigate= useNavigate();
  const location = useLocation();


   useEffect(() => {
      if (location.state && location.state.message) {
        setMessage(location.state.message);
      }
    }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/me");
        setUser(response.data.data);
        setError("");

        const postResponse = await axiosInstance.get(
          "/post/getUserPost/" + response.data.data.userName
        );
        setPosts(postResponse.data.data);
      } catch (err) {
        navigate("/login",{
          state: { message: "Session Expired ! Please Log in again" }
        });
        
      }
    };

    fetchUser();
  }, []);



  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
  
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const mins = Math.floor(diffInSeconds / 60);
      return `${mins} min${mins === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else {
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      return postDate.toLocaleString("en-US", options); // e.g., "Apr 5, 3:45 PM"
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">

      {error && <p className="text-center text-red-600">{error}</p>}
      {message && <p className="text-center text-green-600">{message}</p>}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold mb-4">
          {user.firstName?.charAt(0)?.toUpperCase()}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">@{user.userName}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {user.role?.map((role, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
              <span >{formatDate(post.date)}</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.caption}
              
                </h3>
                <p className="mt-2 text-gray-700">{post.content}</p>
               
              </div>
              <div className="flex space-x-3">
                <Link
                  to={`/home/edit-post/${post.post_id}`}
                  state={{
                    caption: post.caption,
                    content: post.content,
                  }}
                >
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit size={20} />
                  </button>
                </Link>

                <Link to={`/home/delete-post/${post.post_id}`}
                state={{
                  caption:post.caption
                }}>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={20} />
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts to display.</p>
        )}
      </div>
    </div>
  );
}
