/** @format */

import React from "react";
import { Link } from "react-router-dom";
import {
 GraduationCap,
 Github,
 Linkedin,
 Mail,
 FolderOpen,
 HelpCircle,
 LayoutDashboard,
 Upload,
 Compass,
 FileText,
 Shield,
 Users,
} from "lucide-react";

const Footer = () => {
 // Get user role from localStorage
 const user = JSON.parse(localStorage.getItem("user") || "null");
 const role = user?.role || null;
 return (
  <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
   {/* Background Pattern */}
   <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
   </div>

   <div className="container mx-auto px-4 py-12 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
     {/* Logo and Description */}
     <div className="space-y-4">
      <div className="flex items-center gap-3">
       <div className="p-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
        <GraduationCap className="h-6 w-6 text-white" />
       </div>
       <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        InnoHub
       </span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
       Empowering student innovation by showcasing unique projects across
       universities and disciplines. Connect, collaborate, and create.
      </p>
      <div className="flex gap-3 pt-2">
       <a
        href="#"
        className="p-2.5 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
        aria-label="GitHub">
        <Github className="h-5 w-5" />
       </a>
       <a
        href="#"
        className="p-2.5 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
        aria-label="LinkedIn">
        <Linkedin className="h-5 w-5" />
       </a>
       <a
        href="#"
        className="p-2.5 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110"
        aria-label="Email">
        <Mail className="h-5 w-5" />
       </a>
      </div>
     </div>

     {/* Platform Links - Role-based */}
     <div>
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
       <div className="p-1.5 rounded bg-gradient-to-r from-blue-500 to-purple-500">
        <FolderOpen className="h-4 w-4" />
       </div>
       Platform
      </h3>
      <ul className="space-y-3">
       {role === "student" ? (
        <>
         <li>
          <Link
           to="/dashboard"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <LayoutDashboard className="h-4 w-4" />
           <span>Dashboard</span>
          </Link>
         </li>
         <li>
          <Link
           to="/projects"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <FolderOpen className="h-4 w-4" />
           <span>My Projects</span>
          </Link>
         </li>
         <li>
          <Link
           to="/explore-projects"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Compass className="h-4 w-4" />
           <span>Explore Projects</span>
          </Link>
         </li>
         <li>
          <Link
           to="/upload-project"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Upload className="h-4 w-4" />
           <span>Upload Project</span>
          </Link>
         </li>
        </>
       ) : role === "mentor" ? (
        <>
         <li>
          <Link
           to="/mentor"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <LayoutDashboard className="h-4 w-4" />
           <span>Mentor Dashboard</span>
          </Link>
         </li>
         <li>
          <Link
           to="/mentor/projects"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <FileText className="h-4 w-4" />
           <span>Review Projects</span>
          </Link>
         </li>
         <li>
          <Link
           to="/mentor/reports"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Shield className="h-4 w-4" />
           <span>Plagiarism Reports</span>
          </Link>
         </li>
        </>
       ) : role === "admin" ? (
        <>
         <li>
          <Link
           to="/admin"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <LayoutDashboard className="h-4 w-4" />
           <span>Admin Dashboard</span>
          </Link>
         </li>
         <li>
          <Link
           to="/admin/manageusers"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Users className="h-4 w-4" />
           <span>Manage Users</span>
          </Link>
         </li>
         <li>
          <Link
           to="/admin/projects"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <FolderOpen className="h-4 w-4" />
           <span>All Projects</span>
          </Link>
         </li>
        </>
       ) : (
        <>
         {/* Default links for non-logged in users */}
         <li>
          <Link
           to="/explore-projects"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Compass className="h-4 w-4" />
           <span>Browse Projects</span>
          </Link>
         </li>
         <li>
          <Link
           to="/upload-project"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Upload className="h-4 w-4" />
           <span>Upload Project</span>
          </Link>
         </li>
         <li>
          <Link
           to="/dashboard"
           className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <LayoutDashboard className="h-4 w-4" />
           <span>Dashboard</span>
          </Link>
         </li>
        </>
       )}
      </ul>
     </div>

     {/* Resources Links */}
     <div>
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
       <div className="p-1.5 rounded bg-gradient-to-r from-purple-500 to-pink-500">
        <HelpCircle className="h-4 w-4" />
       </div>
       Resources
      </h3>
      <ul className="space-y-3">
       <li>
        <Link
         to="/about"
         className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
         <div className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <span>About Us</span>
        </Link>
       </li>
       <li>
        <a
         href="#"
         className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
         <div className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <span>Support</span>
        </a>
       </li>
       <li>
        <a
         href="#"
         className="flex items-center gap-2 text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 group">
         <div className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <span>Documentation</span>
        </a>
       </li>
      </ul>
     </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-12 pt-8 border-t border-white/10">
     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-400 text-center md:text-left">
       &copy; {new Date().getFullYear()} InnoHub. All rights reserved. Empowering
       student innovation globally.
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-400">
       <span>Made with</span>
       <span className="text-red-500 animate-pulse">❤️</span>
       <span>for students</span>
      </div>
     </div>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
