import React, { useState } from "react";
import axiosInstance from "../API/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNote, setIsNote] = useState(false);
  const [postType, setPostType] = useState("post");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const subjectsBySemester = {
    First: [
      "Computer Fundamentals & Applications",
      "Society and Technology",
      "English I",
      "Mathematics I",
      "Digital Logic",
    ],
    Second: [
      "C Programming",
      "Financial Accounting",
      "English II",
      "Mathematics II",
      "Microprocessor and Computer Architecture",
    ],
    Third: [
      "Data Structures and Algorithms",
      "Probability and Statistics",
      "System Analysis and Design",
      "OOP in Java",
      "Web Technology",
    ],
    Fourth: [
      "Operating System",
      "Numerical Methods",
      "Software Engineering",
      "Scripting Language",
      "Database Management System",
      "Project I",
    ],
    Fifth: [
      "MIS and E-Business",
      "DotNet Technology",
      "Computer Networking",
      "Introduction to Management",
      "Computer Graphics and Animation",
    ],
    Sixth: [
      "Mobile Programming",
      "Distributed System",
      "Applied Economics",
      "Advanced Java Programming",
      "Network Programming",
      "Project II",
    ],
    Seventh: [
      "Cyber Law and Professional Ethics",
      "Cloud Computing",
      "Internship",
      "Elective I",
      "Elective II",
    ],
    Eighth: [
      "Operations Research",
      "Project III",
      "Elective III",
      "Elective IV",
    ],
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      setErrorMessage("Caption is required.");
      setSuccessMessage("");
      return;
    }

    if (isNote && (!semester || !subject)) {
      setErrorMessage("Please select both semester and subject.");
      setSuccessMessage("");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);
    formData.append("isNote", isNote);
    if (file) formData.append("file", file);
    if (isNote) {
      formData.append("semester", semester);
      formData.append("subject", subject);
    }

    try {
      await axiosInstance.post("/post/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Post created successfully!");
      setErrorMessage("");
      setCaption("");
      setContent("");
      setFile(null);
      setFileName("");
      setSemester("");
      setSubject("");
      setPostType("post");
      setIsNote(false);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Failed to create post. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800">Create a New Post</h2>

      {successMessage && (
        <div className="p-4 text-green-700 bg-green-100 rounded-md border border-green-300">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md border border-red-300">
          {errorMessage}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Post Type */}
        <div className="flex items-center space-x-6 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="postType"
              value="post"
              checked={postType === "post"}
              onChange={() => {
                setPostType("post");
                setIsNote(false);
                setSemester("");
                setSubject("");
              }}
              className="form-radio text-blue-600"
            />
            <span>Post</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="postType"
              value="note"
              checked={postType === "note"}
              onChange={() => {
                setPostType("note");
                setIsNote(true);
              }}
              className="form-radio text-blue-600"
            />
            <span>Post with Note</span>
          </label>
        </div>

        {postType === "note" && (
          <>
            <div className="mb-4">
              <p className="font-medium text-lg mb-2">Select Semester</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(subjectsBySemester).map((label, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="semester"
                      value={label}
                      checked={semester === label}
                      onChange={() => {
                        setSemester(label);
                        setSubject("");
                      }}
                      className="form-radio text-blue-600"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {semester && (
              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Select Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {(subjectsBySemester[semester] || []).map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div>
          <label htmlFor="caption" className="block text-lg font-medium text-gray-700">
            Caption
          </label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Enter caption"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Enter post content"
            rows="4"
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed p-4 rounded-lg text-center">
          {!file ? (
            <>
              <label htmlFor="file-upload" className="cursor-pointer text-blue-600">
                Click to upload an image, video, or PDF
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          ) : (
            <div className="relative">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : file.type.startsWith("video/") ? (
                <video
                  controls
                  className="w-full h-48 object-cover rounded-lg"
                  src={URL.createObjectURL(file)}
                />
              ) : file.type === "application/pdf" ? (
                <div className="w-full h-48 flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-gray-50 p-4 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-600 mb-2"
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
                    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2"
                  >
                    View PDF
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Unsupported file format</p>
              )}
              <div className="mt-2 text-gray-800 font-semibold">{fileName}</div>
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
