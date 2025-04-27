// Feed.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../API/AxiosInstance";

export default function Feed() {
  const [posts,setPosts] = useState([]);
  const [error,setError] = useState("");
  const [loading,setLoading]= useState(true);

  useEffect(()=>{

    const fetchPosts = async()=>{
      try{
        const response = await axiosInstance.get("/post/getAllPosts");
      
        setPosts(response.data.data);
        setLoading(false);
      }catch(err){
        setError("Error Fetching Post");
        setLoading(false);
      }
    }
    fetchPosts();
  },[])
  if (loading) {
    return <div className="text-center flex justify-center items-cent">Loading...</div>; // Show loading text while fetching
  }


  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {posts.map((post) => (
        <div key={post.post_id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-white font-bold">
              {post.userResponse.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{post.userResponse.firstName.charAt(0).toUpperCase()+post.userResponse.firstName.slice(1)}{" "}{post.userResponse.lastName}</h3>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>

          <h4 className="font-semibold text-xl text-gray-900 mb-2">
            {post.caption}
          </h4>
          <p className="text-gray-700 mb-6">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
