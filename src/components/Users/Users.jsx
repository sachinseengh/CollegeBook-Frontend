import React, { useState } from "react";
import { FiEdit, FiDelete, FiUserCheck } from "react-icons/fi";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "moderator" },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleEdit = (id) => {
    alert(`Edit user with id ${id}`);
  };

  const handleDelete = (id) => {
    alert(`User with id ${id} has been deleted`);
  };

  const handleMakeModerator = (id) => {
    alert(`User with id ${id} has been made a moderator`);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by name
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by email
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
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
              key={user.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="text-sm text-gray-400">{user.role}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FiDelete />
                </button>
                <button
                  onClick={() => handleMakeModerator(user.id)}
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
