import React, { useState } from "react";
import axiosInstance from "../API/AxiosInstance"; // Your axios instance
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [caption, setCaption] = useState(""); // State for caption
  const [content, setContent] = useState(""); // State for content
  const [file, setFile] = useState(null); // State for the file
  const [fileName, setFileName] = useState(""); // State for file name
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const navigate = useNavigate(); // For navigation

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFile(null);
    setFileName(""); // Reset file name when removed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Caption is required
    if (!caption.trim()) {
      setErrorMessage("Caption is required.");
      setSuccessMessage("");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption); // Append caption
    formData.append("content", content); // Append content (optional)
    if (file) {
      formData.append("file", file); // Append file if present
    }

    try {
      // Send the post request with FormData
      const response = await axiosInstance.post("/post/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart for file upload
        },
      });

      // On success, clear inputs and show success message
      setSuccessMessage("Post created successfully!");
      setErrorMessage("");
      setCaption("");
      setContent("");
      setFile(null); // Reset file after success
      setFileName(""); // Reset file name after success
      navigate("/home"); // Redirect to home
    } catch (error) {
      // On failure, show error message
      setErrorMessage("Failed to create post. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800">Create a New Post</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 text-green-700 bg-green-100 rounded-md border border-green-300">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-300">
          {errorMessage}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Caption Input */}
        <div>
          <label htmlFor="caption" className="block text-lg font-medium text-gray-700">
            Caption
          </label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter caption"
          />
        </div>

        {/* Content Input */}
        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter post content"
            rows="4"
          />
        </div>

        {/* File Upload Box */}
        <div className="border-2 border-dashed p-4 rounded-lg text-center">
          {/* Show a file upload prompt if no file is selected */}
          {!file ? (
            <>
              <label htmlFor="file-upload" className="cursor-pointer text-blue-600">
                <span>Click to upload an image or video</span>
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          ) : (
            // Show the file preview and file name if selected
            <div className="relative">
              {/* File preview */}
              {file.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <video
                  controls
                  className="w-full h-48 object-cover rounded-lg"
                  src={URL.createObjectURL(file)}
                />
              )}

              {/* Display file name */}
              <div className="mt-2 text-gray-800 font-semibold">{fileName}</div>

              {/* Cross button to remove file */}
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                X
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
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
