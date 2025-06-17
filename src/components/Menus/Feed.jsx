import React, { useEffect, useState } from "react";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userRes = await axiosInstance.get("/user/me");
        setUser(userRes.data.data);

        const postRes = await axiosInstance.get("/post/getAllPosts");
        setPosts(postRes.data.data);
      } catch (err) {
        console.log(err);
        navigate("/login", {
          state: { message: "Session Expired ! Please Log in again" },
        });
      }
    };
    fetchUserAndPosts();
  }, []);

  const handleDeleteClick = (postId) => {
    console.log("Delete post with ID:", postId);
    // TODO: Later connect this to your DELETE API
  };

  const isAdminOrModerator = () => {
    const roles = user?.role || [];
    return roles.includes("ADMIN") || roles.includes("MODERATOR");
  };

  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) return "Just now";
    else if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    else if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hour ago`;
    else if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} day ago`;
    else
      return postDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {posts.map((post) => (
        
        <div
          key={post.post_id}
          className="bg-white rounded-lg shadow-md p-6 relative"
        >
          {/* 🗑 Delete Button (Only for Admin/Moderator) */}
          {isAdminOrModerator() && (
            <button
              onClick={() => handleDeleteClick(post.post_id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              title="Delete Post"
            >
              <FiTrash2 size={20} />
            </button>
          )}

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-black font-bold">
              {post.userResponse.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                {post.userResponse.firstName.charAt(0).toUpperCase() +
                  post.userResponse.firstName.slice(1)}{" "}
                {post.userResponse.lastName}
              </h3>
              <div className="flex gap-2">
                {post.userResponse.role.map((role, index) => (
                  <p
                    key={index}
                    className="px-3 py-3/4 bg-gray-500 opacity-70 text-black text-[0.5rem] rounded-sm font-semibold"
                  >
                    {role}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
            </div>
          </div>

          <hr className="pt-2 opacity-30" />
          <h4 className="font-semibold text-xl text-gray-900 mb-2">
            {post.caption}
          </h4>
          <p className="text-gray-700 mb-6">{post.content}</p>

          {/* 🖼 Image preview */}
          {post.fileUrl && post.fileType.startsWith("image/") && (
            <img
              src={post.fileUrl}
              alt="Post"
              className="w-full max-h-[400px] object-cover rounded-lg mt-4"
            />
          )}

          {/* 📹 Video preview */}
          {post.fileUrl && post.fileType.startsWith("video/") && (
            <video
              controls
              className="w-full max-h-[400px] object-contain rounded-lg mt-4"
            >
              <source src={post.fileUrl} type={post.fileType} />
              Your browser does not support the video tag.
            </video>
          )}

          {/* 📄 PDF Preview */}
          {post.fileUrl && post.fileType === "application/pdf" && (
            <div className="mt-4">
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                  />
                  <path
                    d="M14 2v6h6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">
                  {post.fileName || "View PDF"}
                </span>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
