/** @format */

// import React from 'react';
// import { Link } from 'react-router-dom';
// export default function Dashboard(){
//   const user = JSON.parse(localStorage.getItem('user')||'null');
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       {!user && <div>Please <Link to='/login' className="text-blue-600">login</Link></div>}
//       {user && <>
//         <div className="mt-4">Hello, {user.name} ({user.role})</div>
//         {user.role==='student' && <div className="mt-4"><Link to="/upload" className="text-white bg-blue-600 px-3 py-1 rounded">Upload Project</Link></div>}
//         <div className="mt-4"><Link to="/projects" className="text-blue-600">View Projects</Link></div>
//       </>}
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import PersonaCards from "../components/PersonaCards"; // adjust path if needed
impo;
export default function Dashboard() {
 const user = JSON.parse(localStorage.getItem("user") || "null");

 return (
  <div className="p-6">
   <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

   {/* If no user is logged in */}
   {!user && (
    <div>
     Please{" "}
     <Link to="/login" className="text-blue-600">
      login
     </Link>
    </div>
   )}

   {/* If user is logged in */}
   {user && (
    <>
     <div className="mt-4 text-lg">
      Hello, <span className="font-semibold">{user.name}</span> ({user.role})
     </div>

     {user.role === "student" && (
      <div className="mt-4">
       <Link
        to="/upload"
        className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
        Upload Project
       </Link>
      </div>
     )}

     <div className="mt-4">
      <Link to="/projects" className="text-blue-600 hover:underline">
       View Projects
      </Link>
     </div>

     {/* 🔹 Add PersonaCards section below dashboard */}
     <div className="mt-10">
      <PersonaCards />
     </div>
    </>
   )}
  </div>
 );
}
