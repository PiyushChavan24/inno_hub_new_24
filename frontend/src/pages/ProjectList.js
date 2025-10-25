/** @format */

// import React, {useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';

// function ProjectCard({p, onDownload, onCheck}){
//   return (
//     <div className="border p-4 rounded bg-white">
//       <h3 className="font-semibold">{p.title}</h3>
//       <p className="text-sm">{p.description}</p>
//       <div className="text-xs text-gray-500">By: {p.uploadedBy}</div>
//       <div className="mt-2 space-x-2">
//         <button onClick={()=> onDownload(p._id)} className="px-2 py-1 border rounded">Download</button>
//         <button onClick={()=> onCheck(p._id)} className="px-2 py-1 border rounded">Check Plagiarism</button>
//       </div>
//     </div>
//   );
// }

// export default function ProjectList(){
//   const [projects,setProjects]=useState([]);
//   const nav = useNavigate();
//   useEffect(()=>{ fetchList(); },[]);
//   async function fetchList(){
//     const res = await fetch('http://localhost:5000/api/projects');
//     const data = await res.json();
//     if(res.ok) setProjects(data.projects);
//     else alert(data.msg||'Error');
//   }
//   async function download(id){
//     window.location = 'http://localhost:5000/api/projects/download/'+id;
//   }
//   function check(id){ nav('/plagiarism/'+id); }
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {projects.map(p=> <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />)}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ p, onDownload, onCheck }) {
 return (
  <div className="border p-4 rounded bg-white">
   <h3 className="font-semibold">{p.title}</h3>
   <p className="text-sm">{p.description}</p>
   <div className="text-xs text-gray-500">By: {p.uploadedBy}</div>
   <div className="mt-2 space-x-2">
    <button
     onClick={() => onDownload(p._id)}
     className="px-2 py-1 border rounded">
     Download
    </button>
    <button onClick={() => onCheck(p._id)} className="px-2 py-1 border rounded">
     Check Plagiarism
    </button>
   </div>
  </div>
 );
}

export default function ProjectList() {
 const [projects, setProjects] = useState([]);
 const nav = useNavigate();

 useEffect(() => {
  fetchList();
 }, []);

 async function fetchList() {
  try {
   const token = localStorage.getItem("token"); // ⚡ get JWT from localStorage
   const res = await fetch("http://127.0.0.1:5000/api/projects", {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`, // ⚡ pass token in header
    },
   });
   const data = await res.json();
   if (res.ok) setProjects(data.projects);
   else alert(data.msg || "Error fetching projects");
  } catch (err) {
   console.error(err);
   alert("Failed to fetch projects. Check backend connection.");
  }
 }

 async function download(id) {
  const token = localStorage.getItem("token");
  // optional: add token if backend requires
  window.location = `http://localhost:5000/api/projects/download/${id}`;
 }

 function check(id) {
  nav(`/plagiarism/${id}`);
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   {projects.map((p) => (
    <ProjectCard key={p._id} p={p} onDownload={download} onCheck={check} />
   ))}
  </div>
 );
}
