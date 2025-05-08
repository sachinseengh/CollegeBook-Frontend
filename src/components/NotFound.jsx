import { Link } from "react-router-dom";
import React from "react";
import ErrorImage from "../assets/NotFound.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img src={ErrorImage} alt="404 Not Found" className="h-72 mb-8" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;