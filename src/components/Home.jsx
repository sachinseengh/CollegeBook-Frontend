import React, { useState, useRef, useEffect } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Feed from "./Menus/Feed";
import AddPost from "./Menus/AddPost";
// import ChangePassword from "./Menus/ChangePassword";
import {
  FiHome,
  FiPlus,
  FiUser,
  FiMessageSquare,
  FiShield,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import Profile from "./Menus/Profile";
import EditPost from "./Posts/EditPost";
import DeletePost from "./Posts/DeletePost";
import Moderators from "./Users/Moderators";
import Users from "./Users/Users";
import ChangePassword from "./Users/ChangePassword";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);
  const userName = "John Doe"; // Replace with real user name
  const location = useLocation();
  const dropdownRef = useRef();

  const firstLetter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const tab = location.pathname.split("/")[2] || "";
    setActiveTab(tab);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setDropdownProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    
    setDropdownProfile(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="w-full h-16 bg-white shadow flex justify-between items-center px-6 fixed top-0 z-30">
        <h1 className="text-2xl font-bold text-blue-600">CollegeBook</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownProfile(!dropdownProfile)}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold"
          >
            {firstLetter}
          </button>
          {dropdownProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-md z-50">
              <Link
                to="/home/change-password"
                onClick={() => setDropdownProfile(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 pt-16 bg-gray-50">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-lg z-20 relative">
          <div className="p-6 space-y-6">
            <nav>
              <ul className="space-y-4">
                {[
                  { label: "Home", icon: <FiHome />, path: "" },
                  { label: "Add Post", icon: <FiPlus />, path: "add-post" },
                  { label: "Profile", icon: <FiUser />, path: "profile" },
                  { label: "Moderator", icon: <FiShield />, path: "moderators" },
                  { label: "User", icon: <FiUsers />, path: "users" },
                  // { label: "Messages", icon: <FiMessageSquare />, path: "messages" }
                  ,
                ].map((item) => (
                  <li key={item.path}>
                    <Link to={`/home/${item.path}`}>
                      <button
                        onClick={() => setActiveTab(item.path)}
                        className={`w-full flex items-center p-3 rounded-md transition duration-200 group ${
                          activeTab === item.path
                            ? "bg-gray-100 text-gray-900"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.icon}
                        <span className="ml-4 text-lg font-medium">
                          {item.label}
                        </span>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut className="mr-4" />
              <span className="text-lg font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="add-post" element={<AddPost />} />
            {/* <Route path="change-password" element={<ChangePassword />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="moderators" element={<Moderators/>} />
            <Route path="users" element={<Users/>} />
            {/* <Route path="messages" element={<div>Messages Component</div>} /> */}
            <Route path="edit-post/:id" element={<EditPost />} />
            <Route path="delete-post/:id" element={<DeletePost />} />
            <Route path="change-password" element={<ChangePassword/>} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg z-30 flex items-center justify-around">
        <Link to="/home">
          <button
            onClick={() => setActiveTab("")}
            className={`p-3 rounded-full transition duration-200 ${
              activeTab === "" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <FiHome />
          </button>
        </Link>
        <Link to="/home/add-post">
          <button
            onClick={() => setActiveTab("add-post")}
            className={`p-3 rounded-full transition duration-200 ${
              activeTab === "add-post" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <FiPlus />
          </button>
        </Link>
        <Link to="/home/profile">
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-3 rounded-full transition duration-200 ${
              activeTab === "profile" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <FiUser />
          </button>
        </Link>
        <Link to="/home/moderators">
          <button
            onClick={() => setActiveTab("moderator")}
            className={`p-3 rounded-full transition duration-200 ${
              activeTab === "moderator" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <FiShield />
          </button>
        </Link>
        <Link to="/home/users">
          <button
            onClick={() => setActiveTab("user")}
            className={`p-3 rounded-full transition duration-200 ${
              activeTab === "user" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <FiUsers />
          </button>
        </Link>
      </nav>

      {/* Mobile Profile Dropdown */}
      {dropdownProfile && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white shadow-lg z-40">
          <div className="flex flex-col items-center">
            <Link
              to="/home/change-password"
              onClick={() => setDropdownProfile(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
