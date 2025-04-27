import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDelete = async () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        try {
          // Send your DELETE request here
          // await axios.delete(`/api/posts/${id}`);
          alert(`Post ${id} deleted!`);
          navigate("/home/profile");
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      } else {
        navigate("/home/profile");
      }
    };

    confirmDelete();
  }, [id, navigate]);

  return null; // No UI needed
}
