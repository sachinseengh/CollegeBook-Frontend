import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import axiosInstance from "../API/AxiosInstance";

const Moderators= () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error,setError]= useState("");
  const [success,setSuccess] = useState("");
  const [moderators,setModerators] = useState([]);




const fetchModerators = async()=>{

    try{
      const response =await axiosInstance.get("/admin/moderators");
      setModerators(response.data.data);
      console.log(response.data.data);

    }catch(err){
      console.log("Error",err);

    }
  }
 
useEffect(()=>{
 fetchModerators();
},[])


  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleDelete = async (username) => {

    try{

      const response = await axiosInstance.delete("/admin/remove-moderator/"+username);

      setSuccess("Moderator Role Removed");
      setError("");

      fetchModerators();

    }catch(err){
      console.log(err);
      setError("Error Deleting Moderator");
      setSuccess("");
    }

  };

  // Filter moderators based on search query
  const filteredModerators = moderators.filter((moderator) =>
    moderator.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by name
    moderator.email.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by email
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md">

    {success && <div className="text-green-500">{success}</div>}
    {error && <div className="text-green-500">{error}</div>}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Moderators List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search moderators..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border rounded-md"
      />

      <div className="space-y-4">
        {/* Render filtered moderators */}
        {filteredModerators.length > 0 ? (
          filteredModerators.map((moderator) => (
            <div
              key={moderator.user_id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{moderator.firstName.charAt(0).toUpperCase()+moderator.firstName.slice(1)}{" "}{moderator.lastName}</h3>
                <p className="text-sm text-gray-600">@{moderator.userName}</p>
              </div>
              <button
                onClick={() => handleDelete(moderator.userName)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <FiDelete />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No moderators found</p>
        )}
      </div>
    </div>
  );
};

export default Moderators;
