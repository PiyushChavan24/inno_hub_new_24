/** @format */

// /** @format */
// import React, { useEffect, useState } from "react";

// const MentorDashboard = () => {
//  const [projects, setProjects] = useState([]);

//  useEffect(() => {
//   fetch("/api/mentor/projects", {
//    headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//    },
//   })
//    .then((res) => res.json())
//    .then((data) => setProjects(data.projects || []));
//  }, []);

//  return (
//   <div className="p-6">
//    <h2 className="text-3xl font-bold mb-6">Mentor Dashboard</h2>

//    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {projects.map((p) => (
//      <div key={p._id} className="border p-4 rounded shadow">
//       <h3 className="font-bold text-lg">{p.title}</h3>
//       <p className="text-gray-600">{p.description}</p>
//      </div>
//     ))}
//    </div>
//   </div>
//  );
// };

// export default MentorDashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import { Button } from "../../components/ui/button";
// import {
//  Card,
//  CardContent,
//  CardHeader,
//  CardTitle,
// } from "../../components/ui/card";
// import { Badge } from "../../components/ui/badge";
// import {
//  Table,
//  TableBody,
//  TableCell,
//  TableHead,
//  TableHeader,
//  TableRow,
// } from "../../components/ui/table";

// import {
//  FolderOpen,
//  Eye,
//  Download,
//  TrendingUp,
//  Edit,
//  Trash2,
//  Plus,
// } from "lucide-react";

// import Footer from "../../components/Footer";
// import EditProjectPopup from "../EditProjectPopup";

// const Dashboard = () => {
//  const navigate = useNavigate();
//  const [myProjects, setMyProjects] = useState([]);
//  const [loading, setLoading] = useState(true);

//  const [editOpen, setEditOpen] = useState(false);
//  const [selectedProject, setSelectedProject] = useState(null);

//  useEffect(() => {
//   fetchMyProjects();
//  }, []);

//  // ✅ FIXED fetch logic
//  async function fetchMyProjects() {
//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch("/api/projects/my", {
//     headers: {
//      Authorization: `Bearer ${token}`,
//     },
//    });

//    const data = await res.json();

//    // ✅ Backend now returns an ARRAY directly, not { projects: [] }
//    if (Array.isArray(data)) {
//     setMyProjects(data);
//    } else if (Array.isArray(data.projects)) {
//     // fallback
//     setMyProjects(data.projects);
//    } else {
//     setMyProjects([]);
//    }
//   } catch (err) {
//    console.error("Error fetching user projects:", err);
//    setMyProjects([]);
//   }

//   setLoading(false);
//  }

//  function openEditPopup(project) {
//   setSelectedProject(project);
//   setEditOpen(true);
//  }

//  async function handleEditSave(formData, id) {
//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch(`/api/projects/${id}`, {
//     method: "PUT",
//     headers: {
//      Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//    });

//    const data = await res.json();

//    if (res.ok) {
//     alert("Project updated successfully!");
//     setEditOpen(false);
//     fetchMyProjects();
//    } else {
//     alert(data.msg || "Failed to update project");
//    }
//   } catch (err) {
//    console.error(err);
//    alert("Error updating project");
//   }
//  }

//  async function deleteProject(id) {
//   if (!window.confirm("Are you sure you want to delete this project?")) return;

//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch(`/api/projects/${id}`, {
//     method: "DELETE",
//     headers: {
//      Authorization: `Bearer ${token}`,
//     },
//    });

//    const data = await res.json();

//    if (res.ok) {
//     alert("Project deleted successfully!");
//     fetchMyProjects();
//    } else {
//     alert(data.msg || "Failed to delete project");
//    }
//   } catch (err) {
//    console.error(err);
//    alert("Error while deleting project");
//   }
//  }

//  // ✅ safe stats block
//  const stats = [
//   {
//    icon: FolderOpen,
//    label: "Total Projects",
//    value: (myProjects?.length || 0).toString(),
//    color: "text-blue-500",
//   },
//   {
//    icon: Eye,
//    label: "Total Views",
//    value: "—",
//    color: "text-green-500",
//   },
//   {
//    icon: Download,
//    label: "Downloads",
//    value: "—",
//    color: "text-purple-500",
//   },
//   {
//    icon: TrendingUp,
//    label: "Engagement",
//    value: "—",
//    color: "text-orange-500",
//   },
//  ];

//  return (
//   <div className="min-h-screen flex flex-col">
//    <main className="flex-1 bg-muted/30">
//     {/* HEADER */}
//     <section className="gradient-hero border-b py-12">
//      <div className="container">
//       <h1 className="text-4xl font-bold mb-2">
//        Welcome back,{" "}
//        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//         Student
//        </span>
//       </h1>
//       <p className="text-muted-foreground">
//        Manage your projects, track performance, and showcase your work.
//       </p>

//       <Button
//        className="mt-4"
//        variant="hero"
//        onClick={() => navigate("/upload-project")}>
//        <Plus className="h-4 w-4 mr-2" /> Upload New Project
//       </Button>
//      </div>
//     </section>

//     {/* STATS */}
//     <section className="py-8">
//      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
//       {stats.map((stat, index) => (
//        <Card key={index} className="gradient-card shadow-soft">
//         <CardContent className="pt-6 flex items-center gap-4">
//          <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
//           <stat.icon className="h-6 w-6" />
//          </div>
//          <div>
//           <p className="text-2xl font-bold">{stat.value}</p>
//           <p className="text-xs text-muted-foreground">{stat.label}</p>
//          </div>
//         </CardContent>
//        </Card>
//       ))}
//      </div>
//     </section>

//     {/* PROJECT TABLE */}
//     <section className="py-8">
//      <div className="container">
//       <Card className="gradient-card shadow-soft">
//        <CardHeader>
//         <CardTitle>Your Projects</CardTitle>
//        </CardHeader>

//        <CardContent>
//         {loading ? (
//          <p className="text-center py-6 text-muted-foreground">
//           Loading your projects...
//          </p>
//         ) : myProjects.length === 0 ? (
//          <p className="text-center py-6 text-muted-foreground">
//           You haven't uploaded any projects yet.
//          </p>
//         ) : (
//          <Table>
//           <TableHeader>
//            <TableRow>
//             <TableHead>Title</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//            </TableRow>
//           </TableHeader>

//           <TableBody>
//            {myProjects.map((project) => (
//             <TableRow key={project._id}>
//              <TableCell className="font-medium">
//               <Link
//                to={`/project/${project._id}`}
//                className="hover:text-primary">
//                {project.title}
//               </Link>
//              </TableCell>

//              <TableCell>
//               <Badge variant="secondary">
//                {project.approved ? "Approved" : "Pending"}
//               </Badge>
//              </TableCell>

//              <TableCell className="text-right">
//               <div className="flex justify-end gap-2">
//                <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => openEditPopup(project)}>
//                 <Edit className="h-4 w-4" />
//                </Button>

//                <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => deleteProject(project._id)}>
//                 <Trash2 className="h-4 w-4 text-destructive" />
//                </Button>
//               </div>
//              </TableCell>
//             </TableRow>
//            ))}
//           </TableBody>
//          </Table>
//         )}
//        </CardContent>
//       </Card>
//      </div>
//     </section>
//    </main>

//    <Footer />

//    {/* EDIT POPUP */}
//    <EditProjectPopup
//     open={editOpen}
//     onClose={() => setEditOpen(false)}
//     project={selectedProject}
//     onSave={handleEditSave}
//    />
//   </div>
//  );
// };

// export default Dashboard;

/** @format */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "../../components/ui/table";

import {
 FolderOpen,
 Edit,
 Trash2,
 Users,
 CheckCircle,
 Clock,
 Loader2,
 GraduationCap,
 FileText,
} from "lucide-react";

import Footer from "../../components/Footer";
import EditProjectPopup from "../EditProjectPopup";

const MentorDashboard = () => {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);

 const [editOpen, setEditOpen] = useState(false);
 const [selectedProject, setSelectedProject] = useState(null);

 useEffect(() => {
  fetchMentorProjects();
 }, []);

 // ✅ Fetch all projects assigned to this mentor
 async function fetchMentorProjects() {
  try {
   const token = localStorage.getItem("token");

   const res = await fetch("/api/mentor/projects", {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   if (Array.isArray(data)) {
    setProjects(data);
   } else if (Array.isArray(data.projects)) {
    setProjects(data.projects);
   } else {
    setProjects([]);
   }
  } catch (err) {
   console.error("Error fetching mentor projects:", err);
   setProjects([]);
  }

  setLoading(false);
 }

 function openEditPopup(project) {
  setSelectedProject(project);
  setEditOpen(true);
 }

 async function handleEditSave(formData, id) {
  try {
   const token = localStorage.getItem("token");

   const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
     Authorization: `Bearer ${token}`,
    },
    body: formData,
   });

   const data = await res.json();

   if (res.ok) {
    alert("Project updated successfully!");
    setEditOpen(false);
    fetchMentorProjects();
   } else {
    alert(data.msg || "Failed to update project");
   }
  } catch (err) {
   console.error(err);
   alert("Error updating project");
  }
 }

 async function deleteProject(id) {
  if (!window.confirm("Delete this project?")) return;

  try {
   const token = localStorage.getItem("token");

   const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   if (res.ok) {
    alert("Project deleted successfully!");
    fetchMentorProjects();
   } else {
    alert(data.msg || "Failed to delete project");
   }
  } catch (err) {
   console.error(err);
   alert("Error while deleting project");
  }
 }

 // ✅ Approve project (mentor only)
 async function approveProject(id) {
  if (!window.confirm("Approve this project?")) return;

  try {
   const token = localStorage.getItem("token");

   const res = await fetch(
    `/api/mentor/projects/${id}/approve`,
    {
     method: "PATCH",
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   const data = await res.json();

   if (res.ok) {
    alert("Project approved successfully!");
    fetchMentorProjects();
   } else {
    alert(data.msg || "Failed to approve project");
   }
  } catch (err) {
   console.error(err);
   alert("Error while approving project");
  }
 }

 // ✅ Calculate stats
 const approvedCount = projects.filter((p) => p.approved === true).length;
 const pendingCount = projects.filter((p) => p.approved === false).length;
 const totalStudents = projects.reduce((acc, p) => {
  return acc + (p.teammates?.length || 0);
 }, 0);

 // ✅ Mentor dashboard stats
 const stats = [
  {
   icon: FolderOpen,
   label: "Assigned Projects",
   value: (projects?.length || 0).toString(),
   color: "from-blue-500 to-cyan-500",
   bgColor: "bg-blue-50",
  },
  {
   icon: CheckCircle,
   label: "Approved",
   value: approvedCount.toString(),
   color: "from-green-500 to-emerald-500",
   bgColor: "bg-green-50",
  },
  {
   icon: Clock,
   label: "Pending Review",
   value: pendingCount.toString(),
   color: "from-yellow-500 to-orange-500",
   bgColor: "bg-yellow-50",
  },
  {
   icon: Users,
   label: "Total Students",
   value: totalStudents.toString(),
   color: "from-purple-500 to-pink-500",
   bgColor: "bg-purple-50",
  },
 ];

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* ✅ Beautiful Header Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Mentor Dashboard
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        Review, manage, and approve student projects assigned to you. Guide
        students through their academic journey.
       </p>
      </div>
     </div>
    </section>

    {/* ✅ Enhanced Stats Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {stats.map((stat, index) => (
        <Card
         key={index}
         className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         <CardContent className="relative z-10 p-6">
          <div className="flex items-center gap-4">
           <div
            className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} shadow-md`}>
            <stat.icon className="h-6 w-6 text-white" />
           </div>
           <div className="flex-1">
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
           </div>
          </div>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </section>

    {/* ✅ Enhanced Projects Table Section */}
    <section className="py-8 bg-gradient-to-b from-blue-50/30 to-white">
     <div className="container px-4">
      <Card className="border-0 shadow-xl bg-white overflow-hidden">
       <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-100">
        <div className="flex items-center gap-3">
         <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
          <FileText className="h-5 w-5 text-white" />
         </div>
         <CardTitle className="text-2xl font-bold text-gray-800">
          Assigned Projects
         </CardTitle>
        </div>
       </CardHeader>

       <CardContent className="p-6">
        {loading ? (
         <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
           <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading projects...</p>
         </div>
        ) : projects.length === 0 ? (
         <div className="text-center py-12 px-4">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
           <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
           No Projects Assigned
          </p>
          <p className="text-gray-600">
           You don't have any projects assigned to you yet. Projects will appear
           here once students assign you as their mentor.
          </p>
         </div>
        ) : (
         <div className="overflow-x-auto">
          <Table>
           <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
             <TableHead className="font-semibold text-gray-700">
              Project Title
             </TableHead>
             <TableHead className="font-semibold text-gray-700">
              Students
             </TableHead>
             <TableHead className="font-semibold text-gray-700">
              Status
             </TableHead>
             <TableHead className="font-semibold text-gray-700 text-right">
              Actions
             </TableHead>
            </TableRow>
           </TableHeader>

           <TableBody>
            {projects.map((project) => (
             <TableRow
              key={project._id}
              className="hover:bg-blue-50/50 transition-colors">
              {/* Project Title */}
              <TableCell className="font-medium">
               <Link
                to={`/project/${project._id}`}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                <FileText className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                <span className="font-semibold text-gray-800">
                 {project.title}
                </span>
               </Link>
               {project.description && (
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                 {project.description}
                </p>
               )}
              </TableCell>

              {/* Student Names */}
              <TableCell>
               <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                 {project.teammates && project.teammates.length > 0
                  ? project.teammates.map((t) => t.name || "Unknown").join(", ")
                  : project.uploadedBy || "Unknown"}
                </span>
               </div>
              </TableCell>

              {/* Approval Status */}
              <TableCell>
               <Badge
                className={
                 project.approved === true
                  ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200"
                }
                variant="outline">
                {project.approved === true ? (
                 <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved
                 </>
                ) : (
                 <>
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                 </>
                )}
               </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
               <div className="flex justify-end gap-2">
                {/* ✅ Approve Button (only for pending projects) */}
                {project.approved === false && (
                 <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-colors"
                  onClick={() => approveProject(project._id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                 </Button>
                )}

                <Button
                 size="sm"
                 variant="outline"
                 className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                 onClick={() => openEditPopup(project)}>
                 <Edit className="h-4 w-4 mr-1" />
                 Edit
                </Button>

                <Button
                 size="sm"
                 variant="outline"
                 className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                 onClick={() => deleteProject(project._id)}>
                 <Trash2 className="h-4 w-4 mr-1" />
                 Delete
                </Button>
               </div>
              </TableCell>
             </TableRow>
            ))}
           </TableBody>
          </Table>
         </div>
        )}
       </CardContent>
      </Card>
     </div>
    </section>
   </main>

   <Footer />

   {/* ✅ Edit Popup */}
   <EditProjectPopup
    open={editOpen}
    onClose={() => setEditOpen(false)}
    project={selectedProject}
    onSave={handleEditSave}
    onApprove={approveProject}
    userRole="mentor"
   />
  </div>
 );
};

export default MentorDashboard;
