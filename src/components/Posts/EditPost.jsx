import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();

  const [post, setPost] = useState({
    caption: "",
    content: "",
  });

  useEffect(() => {
    // TODO: Fetch post details from server
    // Simulating with dummy data for now:
    setPost({
      caption: "Sample Caption",
      content: "Sample Content of the post.",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated post:", { id, ...post });

    // TODO: Make PUT request to update post
    alert("Post updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-lg">
        {/* ID Field */}
        <div>
          <label htmlFor="postId" className="block text-lg font-medium text-gray-700">
            Post ID
          </label>
          <input
            id="postId"
            type="text"
            value={id}
            disabled
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Caption Field */}
        <div>
          <label htmlFor="caption" className="block text-lg font-medium text-gray-700">
            Caption
          </label>
          <input
            id="caption"
            name="caption"
            type="text"
            value={post.caption}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Edit caption"
            required
          />
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="5"
            value={post.content}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Edit post content"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
