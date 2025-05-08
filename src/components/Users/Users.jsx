import React, { useEffect, useState } from "react";
import { FiEdit, FiDelete, FiUserCheck } from "react-icons/fi";
import axiosInstance from "../API/AxiosInstance";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error,setError]= useState("");
  const [success,setSuccess] = useState("");

  
  const [users,setUsers]= useState([]);


  const fetchUsers = async()=>{
    try{
    const response = await axiosInstance.get("/moderator/getUsers");
    setUsers(response.data.data);
    console.log(response.data.data);
    }catch(error){
      console.log(error);
      setError("Error Fetching Users");
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // const handleEdit = (id) => {
  //   alert(`Edit user with id ${id}`);
  // };

  const handleDelete =async (username) => {

    try{

      const response = await axiosInstance.delete("/moderator/delete-user/"+username);
      setSuccess(response.data.data);
      setError("");
      fetchUsers();

    }catch(err){
      console.log(err);
      setError("Error deleting User !!!");
      setSuccess("");
      if(err.response.status === 400){
        setError("Admin or Moderator cannot be Deleted !");
      }
    }
    
  };

  const handleMakeModerator = async (username) => {
    try{
      const response = await axiosInstance.post("/admin/make-moderator/"+username);
      setSuccess(response.data.data);
      setError("");
      fetchUsers();

    }catch(err){
      console.log("Error",err);
      setError("Error Making Moderator !");
      setSuccess("")
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name
    // ||  user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by email
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
    {success && <div className="text-green-500 text-2xl">{success}</div>}
    {error && <div className="text-red-500 text-2xl">{error}</div>}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Users List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border rounded-md"
      />

      <div className="space-y-4">
        {/* Render filtered users */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.user_id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{user.firstName}</h3>
                <p className="text-sm text-gray-600">@{user.userName}</p>

                {user.role.map((role)=>(
               <span className="text-sm text-black bg-yellow-500 m-1 px-2  rounded-xl">{role}</span>
             
                ))}
              
              </div>
              <div className="flex space-x-2">
                {/* <button
                  onClick={() => handleEdit(user.user_id)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button> */}
                <button
                  onClick={() => handleDelete(user.userName)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FiDelete />
                </button>
                <button
                  onClick={() => handleMakeModerator(user.userName)}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <FiUserCheck />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Users;
