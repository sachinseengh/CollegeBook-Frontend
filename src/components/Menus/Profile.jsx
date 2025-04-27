// src/component/Menus/Profile.jsx
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = {
    name: "John Doe",
    username: "johndoe",
    roles: ["Admin", "Moderator"],
    posts: [
      { id: 1, caption: "First Post", content: "This is my first post!" },
      {
        id: 2,
        caption: "Hello World",
        content: "Excited to join CollegeBook!",
      },
    ],
  };

  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleEdit = (postId) => {
    console.log("Edit post", postId);
    // Later you can redirect to edit page
  };

  const handleDelete = (postId) => {
    console.log("Delete post", postId);
    // Later you can confirm and delete from backend
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Info */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold mb-4">
          {firstLetter}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {user.roles.map((role, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* User's Posts (Feed) */}
      <div className="space-y-6">
        {user.posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {post.caption}
              </h3>
              <p className="mt-2 text-gray-700">{post.content}</p>
            </div>
            <div
              className="flex flex-row justify-center
            space-x-3 "
            >
              <Link to={`/home/edit-post/${post.id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FiEdit size={20} />
                </button>
              </Link>
              <Link to={`/home/delete-post/${post.id}`}>
                <button className="text-red-500 hover:text-red-700">
                  <FiTrash2 size={20} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
