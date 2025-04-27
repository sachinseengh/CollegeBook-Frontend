import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";

const Moderators= () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [moderators] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Brown", email: "alice@example.com" },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleDelete = (id) => {
    alert(`Moderator with id ${id} has been removed`);
  };

  // Filter moderators based on search query
  const filteredModerators = moderators.filter((moderator) =>
    moderator.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by name
    moderator.email.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by email
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
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
              key={moderator.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium">{moderator.name}</h3>
                <p className="text-sm text-gray-600">{moderator.email}</p>
              </div>
              <button
                onClick={() => handleDelete(moderator.id)}
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
