/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
 const navigate = useNavigate();
 const token = localStorage.getItem("token");

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
 };

 return (
  <nav className="bg-white shadow p-4">
   <div className="container mx-auto flex justify-between items-center">
    {/* App Logo / Name */}
    <div
     className="font-bold text-xl text-blue-700 cursor-pointer"
     onClick={() => navigate("/home")}>
     InnoHub
    </div>

    {/* Navigation Links */}
    <div className="space-x-4 text-gray-700">
     {/* Common Links visible to everyone */}
     <Link to="/home" className="hover:text-blue-600">
      Home
     </Link>
     <Link to="/about" className="hover:text-blue-600">
      About
     </Link>

     {/* Show only if user is logged in */}
     {token ? (
      <>
       <Link to="/dashboard" className="hover:text-blue-600">
        Dashboard
       </Link>
       <Link to="/projects" className="hover:text-blue-600">
        Projects
       </Link>
       <Link to="/categories" className="hover:text-blue-600">
        Categories
       </Link>
       <Link to="/upload-project" className="hover:text-blue-600">
        Upload Project
       </Link>
       <button
        onClick={logout}
        className="ml-3 text-red-600 hover:text-red-700 font-semibold">
        Logout
       </button>
      </>
     ) : (
      <>
       <Link to="/login" className="hover:text-blue-600">
        Login
       </Link>
       <Link to="/register" className="hover:text-blue-600">
        Register
       </Link>
      </>
     )}
    </div>
   </div>
  </nav>
 );
}
