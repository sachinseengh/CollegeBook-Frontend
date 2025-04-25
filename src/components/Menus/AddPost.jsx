import React from "react";

export default function AddPost() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800">Create a New Post</h2>
      <form className="space-y-5">
        <div>
          <label
            htmlFor="caption"
            className="block text-lg font-medium text-gray-700"
          >
            Caption
          </label>
          <input
            id="caption"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter caption"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter post content"
            rows="4"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
