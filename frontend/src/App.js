/** @format */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadProject from "./pages/UploadProject";
import ProjectList from "./pages/ProjectList";
import PlagiarismReport from "./pages/PlagiarismReport";
import About from "./pages/About";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Register from "./pages/Signup";

export default function App() {
 return (
  <BrowserRouter>
   <Navbar />
   <div className="container mx-auto p-4">
    <Routes>
     {/* Default Route */}
     <Route path="/" element={<Navigate to="/home" />} />

     {/* Public Routes */}
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/about" element={<About />} />
     <Route path="/home" element={<Home />} />

     {/* Protected Routes */}
     <Route
      path="/dashboard"
      element={
       <ProtectedRoute>
        <Dashboard />
       </ProtectedRoute>
      }
     />
     <Route
      path="/categories"
      element={
       <ProtectedRoute>
        <Categories />
       </ProtectedRoute>
      }
     />
     <Route
      path="/upload-project"
      element={
       <ProtectedRoute>
        <UploadProject />
       </ProtectedRoute>
      }
     />
     <Route
      path="/projects"
      element={
       <ProtectedRoute>
        <ProjectList />
       </ProtectedRoute>
      }
     />
     <Route
      path="/plagiarism/:id"
      element={
       <ProtectedRoute>
        <PlagiarismReport />
       </ProtectedRoute>
      }
     />
    </Routes>
   </div>
  </BrowserRouter>
 );
}

/* ✅ ProtectedRoute Component (Fixed Key) */
function ProtectedRoute({ children }) {
 const user = localStorage.getItem("user"); // ✅ Changed from "auth-user" to "user"

 if (user) {
  return children; // user logged in → allow access
 } else {
  return <Navigate to="/login" />; // not logged in → redirect
 }
}
