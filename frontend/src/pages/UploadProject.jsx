/** @format */
import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Simple icon components
const Icon = ({ children, className = "" }) => (
 <span className={`inline-flex items-center justify-center ${className}`}>
  {children}
 </span>
);

const UploadProject = () => {
 const [projectTitle, setProjectTitle] = useState("");
 const [projectDescription, setProjectDescription] = useState("");
 const [projectFile, setProjectFile] = useState(null);
 const [category, setCategory] = useState("");

 const [mentors, setMentors] = useState([]);
 const [selectedMentor, setSelectedMentor] = useState(null);

 const [students, setStudents] = useState([]);
 const [hasTeammates, setHasTeammates] = useState("no");
 const [teamCount, setTeamCount] = useState(0);
 const [selectedTeammates, setSelectedTeammates] = useState([]);

 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 // ✅ Fetch mentors
 useEffect(() => {
  const fetchMentors = async () => {
   try {
    const res = await fetch("/api/mentors/my-university", {
     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    if (res.ok) setMentors(data.mentors || []);
    else toast.error(data.msg || "Failed to load mentors");
   } catch {
    toast.error("Could not fetch mentors");
   }
  };
  fetchMentors();
 }, []);

 // ✅ Fetch students
 useEffect(() => {
  const fetchStudents = async () => {
   try {
    const res = await fetch(
     "/api/students/my-university",
     {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
     }
    );
    const data = await res.json();
    if (res.ok) setStudents(data.students || []);
    else toast.error(data.msg || "Failed to load students");
   } catch {
    toast.error("Could not fetch students");
   }
  };
  fetchStudents();
 }, []);

 // ✅ Reset teammates when count changes
 useEffect(() => {
  if (teamCount > 0) {
   setSelectedTeammates(Array.from({ length: teamCount }, () => null));
  } else {
   setSelectedTeammates([]);
  }
 }, [teamCount]);

 // ✅ Select teammate
 const handleSelectTeammate = (index, studentId) => {
  const student = students.find((s) => s._id === studentId);
  if (!student) return;

  if (selectedTeammates.some((t) => t?._id === studentId)) {
   toast.error("This student is already selected.");
   return;
  }

  const updated = [...selectedTeammates];
  updated[index] = {
   _id: student._id,
   name: student.name,
   email: student.email,
  };
  setSelectedTeammates(updated);
 };

 // ✅ Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!projectFile) return toast.error("Please select a file!");
  if (!category) return toast.error("Please select a category!");
  if (!selectedMentor) return toast.error("Please select a mentor!");

  if (hasTeammates === "yes" && selectedTeammates.includes(null)) {
   return toast.error("Please select all teammates!");
  }

  setLoading(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Build final teammates list including uploader
  const finalTeammates = [
   {
    _id: user._id,
    name: user.name,
    email: user.email,
   },
   ...selectedTeammates.filter(Boolean),
  ];

  const formData = new FormData();
  formData.append("title", projectTitle);
  formData.append("description", projectDescription);
  formData.append("file", projectFile);
  formData.append("category", category);
  formData.append("uploadedBy", user._id);

  // ✅ Mentor object
  formData.append("mentor", JSON.stringify(selectedMentor));

  // ✅ Teammate details (including uploader)
  formData.append("hasTeammates", hasTeammates);
  formData.append("teamCount", teamCount);
  formData.append("teammates", JSON.stringify(finalTeammates));

  try {
   const res = await fetch("/api/projects/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
   });

   const data = await res.json();

   if (res.ok && data.project?._id) {
    toast.success("Project uploaded successfully!");

    // ✅ Reset form
    setProjectTitle("");
    setProjectDescription("");
    setProjectFile(null);
    setCategory("");
    setSelectedMentor(null);
    setHasTeammates("no");
    setTeamCount(0);
    setSelectedTeammates([]);

    setTimeout(() => navigate("/projects", { replace: true }), 1200);
   } else {
    toast.error(data.msg || "Failed to upload project");
   }
  } catch (error) {
   toast.error("Something went wrong!");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
   <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="text-center mb-8">
     <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
      <Icon className="text-4xl">📤</Icon>
      Upload New Project
     </h1>
     <p className="text-gray-600">
      Share your innovative project with the community
     </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
     {/* Project Information Section */}
     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
       <Icon className="text-2xl">📝</Icon>
       <h2 className="text-xl font-semibold text-gray-800">
        Project Information
       </h2>
      </div>

      <div className="space-y-5">
       {/* Title */}
       <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
         <Icon>🏷️</Icon>
         Project Title <span className="text-red-500">*</span>
        </Label>
        <Input
         value={projectTitle}
         onChange={(e) => setProjectTitle(e.target.value)}
         placeholder="Enter your project title..."
         className="h-11"
         required
        />
       </div>

       {/* Description */}
       <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
         <Icon>📄</Icon>
         Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
         value={projectDescription}
         onChange={(e) => setProjectDescription(e.target.value)}
         placeholder="Describe your project, its features, and objectives..."
         rows={4}
         className="resize-none"
         required
        />
       </div>

       {/* Category */}
       <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
         <Icon>🏷️</Icon>
         Category <span className="text-red-500">*</span>
        </Label>
        <select
         className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
         value={category}
         onChange={(e) => setCategory(e.target.value)}
         required>
         <option value="">Choose a category...</option>
         <option value="Artificial Intelligence">
          🤖 Artificial Intelligence
         </option>
         <option value="Blockchain">⛓️ Blockchain</option>
         <option value="Cloud Computing">☁️ Cloud Computing</option>
         <option value="Web Development">🌐 Web Development</option>
         <option value="Mobile Development">📱 Mobile Development</option>
         <option value="Data Science">📊 Data Science</option>
         <option value="Cybersecurity">🔒 Cybersecurity</option>
         <option value="IoT & Embedded">🔌 IoT & Embedded</option>
        </select>
       </div>
      </div>
     </div>

     {/* Team & Mentor Section */}
     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
       <Icon className="text-2xl">👥</Icon>
       <h2 className="text-xl font-semibold text-gray-800">Team & Mentor</h2>
      </div>

      <div className="space-y-5">
       {/* Mentor */}
       <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
         <Icon>🎓</Icon>
         Select Mentor <span className="text-red-500">*</span>
        </Label>
        <select
         className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
         value={selectedMentor?._id || ""}
         onChange={(e) => {
          const mentor = mentors.find((m) => m._id === e.target.value);
          if (mentor) {
           setSelectedMentor({
            _id: mentor._id,
            name: mentor.name,
            email: mentor.email,
           });
          }
         }}
         required>
         <option value="">Choose your mentor...</option>
         {mentors.map((m) => (
          <option key={m._id} value={m._id}>
           {m.name} ({m.email})
          </option>
         ))}
        </select>
        {selectedMentor && (
         <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
           <strong>Selected:</strong> {selectedMentor.name}
          </p>
         </div>
        )}
       </div>

       {/* Teammate Question */}
       <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
         <Icon>🤝</Icon>
         Do you have teammates?
        </Label>
        <div className="flex gap-4">
         <label className="flex items-center gap-2 cursor-pointer p-3 border-2 rounded-lg transition-all hover:bg-gray-50 flex-1">
          <input
           type="radio"
           name="hasTeammates"
           value="no"
           checked={hasTeammates === "no"}
           onChange={(e) => {
            setHasTeammates(e.target.value);
            setTeamCount(0);
            setSelectedTeammates([]);
           }}
           className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-medium">No, working alone</span>
         </label>
         <label className="flex items-center gap-2 cursor-pointer p-3 border-2 rounded-lg transition-all hover:bg-gray-50 flex-1">
          <input
           type="radio"
           name="hasTeammates"
           value="yes"
           checked={hasTeammates === "yes"}
           onChange={(e) => setHasTeammates(e.target.value)}
           className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-medium">Yes, I have teammates</span>
         </label>
        </div>
       </div>

       {/* Team Count */}
       {hasTeammates === "yes" && (
        <div className="space-y-2">
         <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Icon>🔢</Icon>
          How many teammates?
         </Label>
         <select
          className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={teamCount}
          onChange={(e) => setTeamCount(Number(e.target.value))}>
          <option value="0">Select number of teammates...</option>
          {[1, 2, 3, 4, 5].map((num) => (
           <option key={num} value={num}>
            {num} {num === 1 ? "teammate" : "teammates"}
           </option>
          ))}
         </select>
        </div>
       )}

       {/* Dynamic teammate dropdowns */}
       {teamCount > 0 && (
        <div className="space-y-3 pt-2">
         <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Icon>👤</Icon>
          Select Your Teammates
         </Label>
         <div className="grid gap-3">
          {selectedTeammates.map((value, index) => (
           <div
            key={index}
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:border-blue-300 transition-all">
            <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
              {index + 1}
             </div>
             <Label className="text-sm font-medium text-gray-700">
              Teammate {index + 1}
             </Label>
            </div>
            <select
             className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
             value={value?._id || ""}
             onChange={(e) => handleSelectTeammate(index, e.target.value)}
             required>
             <option value="">Choose a student...</option>
             {students
              .filter(
               (s) =>
                !selectedTeammates.some(
                 (t) => t?._id === s._id && t?._id !== value?._id
                )
              )
              .map((s) => (
               <option key={s._id} value={s._id}>
                {s.name} ({s.email})
               </option>
              ))}
            </select>
            {value && (
             <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
              ✓ {value.name} selected
             </div>
            )}
           </div>
          ))}
         </div>
        </div>
       )}
      </div>
     </div>

     {/* File Upload Section */}
     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
       <Icon className="text-2xl">📎</Icon>
       <h2 className="text-xl font-semibold text-gray-800">Project File</h2>
      </div>

      <div className="space-y-2">
       <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Icon>📄</Icon>
        Upload File <span className="text-red-500">*</span>
       </Label>
       <div className="relative">
        <Input
         type="file"
         accept=".pdf,.pptx,.docx,.txt"
         onChange={(e) => setProjectFile(e.target.files[0])}
         className="h-11 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
         required
        />
       </div>
       {projectFile && (
        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
         <div className="flex items-center gap-3">
          <Icon className="text-2xl">✅</Icon>
          <div>
           <p className="text-sm font-medium text-green-800">
            File selected: {projectFile.name}
           </p>
           <p className="text-xs text-green-600 mt-1">
            {(projectFile.size / 1024 / 1024).toFixed(2)} MB
           </p>
          </div>
         </div>
        </div>
       )}
       <p className="text-xs text-gray-500 mt-2">
        Supported formats: PDF, PPTX, DOCX, TXT (Max 50MB)
       </p>
      </div>
     </div>

     {/* Submit Button */}
     <div className="flex gap-4 pt-4">
      <Button
       type="button"
       variant="outline"
       onClick={() => navigate(-1)}
       className="flex-1 h-12 text-base">
       Cancel
      </Button>
      <Button
       type="submit"
       disabled={loading}
       className="flex-1 h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
       {loading ? (
        <span className="flex items-center justify-center gap-2">
         <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
           className="opacity-25"
           cx="12"
           cy="12"
           r="10"
           stroke="currentColor"
           strokeWidth="4"></circle>
          <path
           className="opacity-75"
           fill="currentColor"
           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg>
         Uploading...
        </span>
       ) : (
        <span className="flex items-center justify-center gap-2">
         <Icon>🚀</Icon>
         Submit Project
        </span>
       )}
      </Button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default UploadProject;
