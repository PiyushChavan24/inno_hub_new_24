/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
 return (
  <footer className="bg-gray-100 border-t mt-20">
   <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
     {/* Logo and Description */}
     <div className="space-y-4">
      <div className="flex items-center gap-2">
       <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <GraduationCap className="h-5 w-5 text-white" />
       </div>
       <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        InnoHub
       </span>
      </div>
      <p className="text-sm text-gray-600">
       Showcasing unique student projects across universities and disciplines.
      </p>
     </div>

     {/* Platform Links */}
     <div>
      <h3 className="font-semibold mb-4">Platform</h3>
      <ul className="space-y-2 text-sm">
       <li>
        <Link
         to="/projects"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Browse Projects
        </Link>
       </li>
       <li>
        <Link
         to="/upload"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Upload Project
        </Link>
       </li>
       <li>
        <Link
         to="/dashboard"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Dashboard
        </Link>
       </li>
      </ul>
     </div>

     {/* Resources Links */}
     <div>
      <h3 className="font-semibold mb-4">Resources</h3>
      <ul className="space-y-2 text-sm">
       <li>
        <a
         href="#"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Documentation
        </a>
       </li>
       <li>
        <a
         href="#"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Guidelines
        </a>
       </li>
       <li>
        <a
         href="#"
         className="text-gray-600 hover:text-blue-600 transition-colors">
         Support
        </a>
       </li>
      </ul>
     </div>

     {/* Social Links */}
     <div>
      <h3 className="font-semibold mb-4">Connect</h3>
      <div className="flex gap-3">
       <a
        href="#"
        className="p-2 rounded-lg bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors">
        <Github className="h-5 w-5" />
       </a>
       <a
        href="#"
        className="p-2 rounded-lg bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors">
        <Linkedin className="h-5 w-5" />
       </a>
       <a
        href="#"
        className="p-2 rounded-lg bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors">
        <Mail className="h-5 w-5" />
       </a>
      </div>
     </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
     <p>&copy; 2024 ProjectHub. Empowering student innovation globally.</p>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
