// src/component/Menus/DeletePost.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../API/AxiosInstance";

export default function DeletePost() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const[error,setError]= useState("");
  const [success,setSuccess]= useState("");



   const [caption, setCaption] = useState("");
  
    useEffect(() => {
      if (location.state) {
        setCaption(location.state.caption);
      }
    }, [location.state]);
  

  const handleDelete = async() => {
    console.log("Deleting post:", id);


    try{
      const response =await axiosInstance.delete(`/post/delete/${id}`);
      
      setSuccess(response.data.data);
      setError("");

      navigate("/home/profile",{
        state:{message:"Post Deleted Successfully !"}
      });

    }catch(err){

      if(err.response.status === 404){
        setError("something Went Wrong");
      }
     console.log("Error Deleting post",err);
     setError("Error Deleting Post");
     setSuccess("");
    }
    
    
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <span className="text-red-500">{error}</span>
      <span className="text-green-500">{success}</span>

      <h2 className="text-xl font-bold mb-2 text-red-600">Delete Post</h2>
      <p className="mb-4">
        Are you sure you want to delete the post:{" "}
        <span className="font-semibold">"{caption}"</span>?
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Confirm Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
