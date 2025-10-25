/** @format */

// /** @format */

// import React, { useState } from "react";
// export default function UploadProject() {
//  const [title, setTitle] = useState("");
//  const [description, setDescription] = useState("");
//  const [file, setFile] = useState(null);
//  const submit = async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("token");
//   if (!token) return alert("Login first");
//   const fd = new FormData();
//   fd.append("title", title);
//   fd.append("description", description);
//   fd.append("file", file);
//   const res = await fetch("http://127.0.0.1:5000/api/projects/upload", {
//    method: "POST",
//    headers: { Authorization: "Bearer " + token },
//    body: fd,
//   });
//   const data = await res.json();
//   if (res.ok) alert("Uploaded");
//   else alert(data.msg || "Error");
//  };
//  return (
//   <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
//    <h2 className="text-xl mb-4">Upload Project</h2>
//    <form onSubmit={submit}>
//     <input
//      value={title}
//      onChange={(e) => setTitle(e.target.value)}
//      placeholder="Title"
//      className="w-full mb-2 p-2 border"
//     />
//     <textarea
//      value={description}
//      onChange={(e) => setDescription(e.target.value)}
//      placeholder="Description"
//      className="w-full mb-2 p-2 border"
//     />
//     <input
//      type="file"
//      onChange={(e) => setFile(e.target.files[0])}
//      className="mb-2"
//     />
//     <button className="bg-blue-600 text-white px-3 py-1 rounded">Upload</button>
//    </form>
//   </div>
//  );
// }
/** @format */
/** @format */
/** @format */
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const UploadProject = () => {
 const [projectTitle, setProjectTitle] = useState("");
 const [projectDescription, setProjectDescription] = useState("");
 const [projectFile, setProjectFile] = useState(null);
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!projectFile) {
   toast.error("Please select a file!");
   return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("title", projectTitle);
  formData.append("description", projectDescription);
  formData.append("file", projectFile);
  formData.append("uploadedBy", JSON.parse(localStorage.getItem("user"))._id);

  try {
   const res = await fetch("http://127.0.0.1:5000/api/projects/upload", {
    method: "POST",
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
   });

   const data = await res.json();

   if (res.ok && data.project && data.project._id) {
    toast.success(
     `Project uploaded successfully! Project ID: ${data.project._id}`
    );
    setProjectTitle("");
    setProjectDescription("");
    setProjectFile(null);
   } else {
    // If project not stored in DB
    toast.error(data.msg || "Failed to upload project to database. Try again.");
   }
  } catch (err) {
   console.error(err);
   toast.error("Something went wrong while uploading the project!");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
   <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
   <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
     <Label htmlFor="title">Project Title *</Label>
     <Input
      id="title"
      placeholder="Enter project title"
      value={projectTitle}
      onChange={(e) => setProjectTitle(e.target.value)}
      required
     />
    </div>

    <div className="space-y-2">
     <Label htmlFor="description">Description *</Label>
     <Textarea
      id="description"
      placeholder="Enter project description"
      value={projectDescription}
      onChange={(e) => setProjectDescription(e.target.value)}
      required
     />
    </div>

    <div className="space-y-2">
     <Label htmlFor="file">Upload File (pdf, pptx, docx, txt) *</Label>
     <Input
      id="file"
      type="file"
      accept=".pdf,.pptx,.docx,.txt"
      onChange={(e) => setProjectFile(e.target.files[0])}
      required
     />
    </div>

    <Button type="submit" variant="hero" className="w-full" disabled={loading}>
     {loading ? "Uploading..." : "Submit Project"}
    </Button>
   </form>
  </div>
 );
};

export default UploadProject;
