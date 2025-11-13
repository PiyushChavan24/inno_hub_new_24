/** @format */

// /** @format */

// // import React, {useEffect, useState} from 'react';
// // import { useNavigate } from 'react-router-dom';

// // function ProjectCard({p, onDownload, onCheck}){
// //   return (
// //     <div className="border p-4 rounded bg-white">
// //       <h3 className="font-semibold">{p.title}</h3>
// //       <p className="text-sm">{p.description}</p>
// //       <div className="text-xs text-gray-500">By: {p.uploadedBy}</div>
// //       <div className="mt-2 space-x-2">
// //         <button onClick={()=> onDownload(p._id)} className="px-2 py-1 border rounded">Download</button>
// //         <button onClick={()=> onCheck(p._id)} className="px-2 py-1 border rounded">Check Plagiarism</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function ProjectList(){
// //   const [projects,setProjects]=useState([]);
// //   const nav = useNavigate();
// //   useEffect(()=>{ fetchList(); },[]);
// //   async function fetchList(){
// //     const res = await fetch('/api/projects');
// //     const data = await res.json();
// //     if(res.ok) setProjects(data.projects);
// //     else alert(data.msg||'Error');
// //   }
// //   async function download(id){
// //     window.location = '/api/projects/download/'+id;
// //   }
// //   function check(id){ nav('/plagiarism/'+id); }
// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //       {projects.map(p=> <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />)}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ProjectCard({ p, onDownload, onCheck }) {
//  return (
//   <div className="border p-4 rounded bg-white">
//    <h3 className="font-semibold">{p.title}</h3>
//    <p className="text-sm">{p.description}</p>
//    <div className="text-xs text-gray-500">By: {p.uploadedBy}</div>
//    <div className="mt-2 space-x-2">
//     <button
//      onClick={() => onDownload(p._id)}
//      className="px-2 py-1 border rounded">
//      Download
//     </button>
//     <button onClick={() => onCheck(p._id)} className="px-2 py-1 border rounded">
//      Check Plagiarism
//     </button>
//    </div>
//   </div>
//  );
// }

// export default function ProjectList() {
//  const [projects, setProjects] = useState([]);
//  const nav = useNavigate();

//  useEffect(() => {
//   fetchList();
//  }, []);

//  async function fetchList() {
//   try {
//    const token = localStorage.getItem("token"); // ⚡ get JWT from localStorage
//    const res = await fetch("/api/projects", {
//     headers: {
//      "Content-Type": "application/json",
//      Authorization: `Bearer ${token}`, // ⚡ pass token in header
//     },
//    });
//    const data = await res.json();
//    if (res.ok) setProjects(data.projects);
//    else alert(data.msg || "Error fetching projects");
//   } catch (err) {
//    console.error(err);
//    alert("Failed to fetch projects. Check backend connection.");
//   }
//  }

//  async function download(id) {
//   const token = localStorage.getItem("token");
//   // optional: add token if backend requires
//   window.location = `/api/projects/download/${id}`;
//  }

//  function check(id) {
//   nav(`/plagiarism/${id}`);
//  }

//  return (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//    {projects.map((p) => (
//     <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />
//    ))}
//   </div>
//  );
// }
/** @format */
/** @format */

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ProjectCard({ p, onDownload, onCheck }) {
//  return (
//   <div className="border p-4 rounded bg-white">
//    <h3 className="font-semibold">{p.title}</h3>
//    <p className="text-sm">{p.description}</p>

//    <div className="text-xs text-gray-500">By: {p.student}</div>

//    <div className="mt-2 space-x-2">
//     <button
//      onClick={() => onDownload(p._id)}
//      className="px-2 py-1 border rounded">
//      Download ({p.download_count || 0})
//     </button>

//     <button onClick={() => onCheck(p._id)} className="px-2 py-1 border rounded">
//      Check Plagiarism
//     </button>
//    </div>
//   </div>
//  );
// }

// export default function ProjectList() {
//  const [projects, setProjects] = useState([]);
//  const nav = useNavigate();

//  useEffect(() => {
//   fetchList();
//  }, []);

//  async function fetchList() {
//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch("/api/projects/my", {
//     headers: {
//      "Content-Type": "application/json",
//      Authorization: `Bearer ${token}`,
//     },
//    });

//    const data = await res.json();

//    // ✅ Backend returns array directly, not {projects: []}
//    if (Array.isArray(data)) {
//     setProjects(data);
//    } else {
//     console.warn("Unexpected response:", data);
//     setProjects([]);
//    }
//   } catch (err) {
//    console.error(err);
//    alert("Failed to fetch your projects.");
//   }
//  }

//  async function download(id) {
//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch(
//     `/api/projects/download/${id}`,
//     {
//      method: "GET",
//      headers: {
//       Authorization: `Bearer ${token}`,
//      },
//     }
//    );

//    if (!res.ok) {
//     alert("Failed to download file");
//     return;
//    }

//    // ✅ convert response to file
//    const blob = await res.blob();
//    const url = window.URL.createObjectURL(blob);

//    const a = document.createElement("a");
//    a.href = url;

//    let filename =
//     res.headers.get("Content-Disposition")?.split("filename=")[1] ||
//     "project_file";

//    filename = filename.replace(/"/g, "").trim();

//    a.download = filename;
//    a.click();

//    window.URL.revokeObjectURL(url);

//    // ✅ Refresh list → updates download count
//    fetchList();
//   } catch (err) {
//    console.error("Download error:", err);
//    alert("Error downloading file");
//   }
//  }

//  function check(id) {
//   nav(`/plagiarism/${id}`);
//  }

//  return (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//    {projects.length === 0 ? (
//     <p className="text-center text-gray-500 col-span-full">
//      You haven't uploaded any projects yet.
//     </p>
//    ) : (
//     projects.map((p) => (
//      <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />
//     ))
//    )}
//   </div>
//  );
// }

//Revised Code After Recent Edits

/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
 FolderOpen,
 Download,
 Shield,
 User,
 Users,
 FileText,
} from "lucide-react";
import Footer from "../components/Footer";

// -------------------- Project Card --------------------
function ProjectCard({ p, onDownload, onCheck }) {
 return (
  <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden relative">
   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
   <CardHeader className="relative z-10 pb-3">
    <div className="flex items-start justify-between gap-3">
     <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
       <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <FileText className="h-4 w-4 text-white" />
       </div>
       <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
        {p.title}
       </CardTitle>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
       {p.description}
      </p>
     </div>
    </div>
   </CardHeader>

   <CardContent className="relative z-10 space-y-3">
    <div className="flex items-center gap-2 text-xs text-gray-600">
     <User className="h-3 w-3 text-gray-400" />
     <span className="font-medium">By: {p.student || "Unknown"}</span>
    </div>

    {/* Display teammates if any */}
    {p.teammates && p.teammates.length > 0 && (
     <div className="flex items-center gap-2 text-xs text-gray-600">
      <Users className="h-3 w-3 text-gray-400" />
      <span>
       Teammates: {p.teammates.map((t) => t.name || "Unknown").join(", ")}
      </span>
     </div>
    )}

    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
     <Button
      onClick={(e) => {
       e.stopPropagation();
       onDownload(p._id);
      }}
      variant="outline"
      size="sm"
      className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
      <Download className="h-3 w-3 mr-2" />
      Download ({p.download_count || 0})
     </Button>

     <Button
      onClick={(e) => {
       e.stopPropagation();
       onCheck(p._id);
      }}
      variant="outline"
      size="sm"
      className="flex-1 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-colors">
      <Shield className="h-3 w-3 mr-2" />
      Check Plagiarism
     </Button>
    </div>
   </CardContent>
  </Card>
 );
}

// -------------------- Project List --------------------
export default function ProjectList() {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const nav = useNavigate();

 // Get user info
 const user = JSON.parse(localStorage.getItem("user") || "null");

 useEffect(() => {
  fetchList();
 }, []);

 async function fetchList() {
  try {
   const token = localStorage.getItem("token");

   const res = await fetch("/api/projects/my", {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   // ✅ Handle backend response { projects: [...] }
   if (data.projects && Array.isArray(data.projects)) {
    setProjects(data.projects);
   } else {
    console.warn("Unexpected response:", data);
    setProjects([]);
   }
  } catch (err) {
   console.error(err);
   alert("Failed to fetch your projects.");
  } finally {
   setLoading(false);
  }
 }

 async function download(id) {
  try {
   const token = localStorage.getItem("token");

   const res = await fetch(
    `/api/projects/download/${id}`,
    {
     method: "GET",
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    alert(errorData.msg || "Failed to download file");
    return;
   }

   // Convert response to file
   const blob = await res.blob();
   const url = window.URL.createObjectURL(blob);

   const a = document.createElement("a");
   a.href = url;

   // Extract filename from Content-Disposition header
   let filename = "project_file";
   const contentDisposition = res.headers.get("Content-Disposition");
   if (contentDisposition) {
    // Try to extract filename from Content-Disposition header
    // Handles both quoted and unquoted filenames, and URL-encoded filenames
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
     filename = filenameMatch[1].replace(/['"]/g, "");
     // Decode URL-encoded filename if present
     try {
      filename = decodeURIComponent(filename);
     } catch (e) {
      // If decoding fails, use the original filename
     }
    }
   }

   a.download = filename;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);

   window.URL.revokeObjectURL(url);

   // Refresh list → updates download count
   fetchList();
  } catch (err) {
   console.error("Download error:", err);
   alert("Error downloading file. Please try again.");
  }
 }

 function check(id) {
  nav(`/plagiarism/${id}`);
 }

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* Header Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <FolderOpen className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         My Projects
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        View and manage all your uploaded projects. Download files and check
        plagiarism reports.
       </p>
      </div>
     </div>
    </section>

    {/* Projects Grid */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      {loading ? (
       <div className="text-center py-12">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
         <FolderOpen className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-gray-600 font-medium">Loading your projects...</p>
       </div>
      ) : projects.length === 0 ? (
       <div className="text-center py-12 px-4">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
         <FolderOpen className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
         No projects yet
        </p>
        <p className="text-gray-600 mb-6">
         You haven't uploaded any projects yet. Start showcasing your work!
        </p>
        <Button
         variant="hero"
         className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg"
         onClick={() => nav("/upload-project")}>
         <FolderOpen className="h-4 w-4 mr-2" /> Upload Your First Project
        </Button>
       </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
         <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />
        ))}
       </div>
      )}
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
}
