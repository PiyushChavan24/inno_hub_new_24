/** @format */

// /** @format */

// // /** @format */
// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import { Button } from "../components/ui/button";
// // import {
// //  Card,
// //  CardContent,
// //  CardHeader,
// //  CardTitle,
// // } from "../components/ui/card";
// // import {
// //  Tabs,
// //  TabsContent,
// //  TabsList,
// //  TabsTrigger,
// // } from "../components/ui/tabs";
// // import { Input } from "../components/ui/input";
// // import { Label } from "../components/ui/label";
// // import { Textarea } from "../components/ui/textarea";
// // import {
// //  Select,
// //  SelectContent,
// //  SelectItem,
// //  SelectTrigger,
// //  SelectValue,
// // } from "../components/ui/select";
// // import { Badge } from "../components/ui/badge";
// // import {
// //  Table,
// //  TableBody,
// //  TableCell,
// //  TableHead,
// //  TableHeader,
// //  TableRow,
// // } from "../components/ui/table";
// // import {
// //  Plus,
// //  FolderOpen,
// //  TrendingUp,
// //  Eye,
// //  Download,
// //  Edit,
// //  Trash2,
// // } from "lucide-react";
// // import { toast } from "sonner";

// // const Dashboard = () => {
// //  const [projectTitle, setProjectTitle] = useState("");
// //  const [projectDescription, setProjectDescription] = useState("");
// //  const [projectCategory, setProjectCategory] = useState("");

// //  const myProjects = [
// //   {
// //    id: "1",
// //    title: "Explainable AI for Healthcare",
// //    category: "AI",
// //    status: "Published",
// //    views: 1250,
// //    downloads: 45,
// //    publishDate: "Nov 21, 2024",
// //   },
// //   {
// //    id: "2",
// //    title: "Smart Contract Auditor",
// //    category: "Blockchain",
// //    status: "Draft",
// //    views: 0,
// //    downloads: 0,
// //    publishDate: "-",
// //   },
// //  ];

// //  const stats = [
// //   {
// //    icon: FolderOpen,
// //    label: "Total Projects",
// //    value: "2",
// //    color: "text-blue-500",
// //   },
// //   { icon: Eye, label: "Total Views", value: "1.3K", color: "text-green-500" },
// //   { icon: Download, label: "Downloads", value: "45", color: "text-purple-500" },
// //   {
// //    icon: TrendingUp,
// //    label: "Engagement",
// //    value: "+28%",
// //    color: "text-orange-500",
// //   },
// //  ];

// //  const handleSubmit = (e) => {
// //   e.preventDefault();
// //   toast.success("Project submitted successfully!");
// //   setProjectTitle("");
// //   setProjectDescription("");
// //   setProjectCategory("");
// //  };

// //  return (
// //   <div className="min-h-screen flex flex-col">
// //    <main className="flex-1 bg-muted/30">
// //     {/* Header */}
// //     <section className="gradient-hero border-b py-12">
// //      <div className="container">
// //       <h1 className="text-4xl font-bold mb-2">
// //        Welcome back,{" "}
// //        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
// //         Student
// //        </span>
// //       </h1>
// //       <p className="text-muted-foreground">
// //        Manage your projects, track performance, and showcase your work.
// //       </p>
// //      </div>
// //     </section>

// //     {/* Stats */}
// //     <section className="py-8">
// //      <div className="container">
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //        {stats.map((stat, index) => (
// //         <Card key={index} className="gradient-card shadow-soft">
// //          <CardContent className="pt-6">
// //           <div className="flex items-center gap-4">
// //            <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
// //             <stat.icon className="h-6 w-6" />
// //            </div>
// //            <div>
// //             <p className="text-2xl font-bold">{stat.value}</p>
// //             <p className="text-xs text-muted-foreground">{stat.label}</p>
// //            </div>
// //           </div>
// //          </CardContent>
// //         </Card>
// //        ))}
// //       </div>
// //      </div>
// //     </section>

// //     {/* Main Content */}
// //     <section className="py-8">
// //      <div className="container">
// //       <Tabs defaultValue="projects" className="space-y-6">
// //        <TabsList className="grid w-full max-w-md grid-cols-2">
// //         <TabsTrigger value="projects">My Projects</TabsTrigger>
// //         <TabsTrigger value="upload">Upload New</TabsTrigger>
// //        </TabsList>

// //        {/* My Projects Tab */}
// //        <TabsContent value="projects" className="space-y-4">
// //         <Card className="gradient-card shadow-soft">
// //          <CardHeader>
// //           <CardTitle>Your Projects</CardTitle>
// //          </CardHeader>
// //          <CardContent>
// //           <Table>
// //            <TableHeader>
// //             <TableRow>
// //              <TableHead>Title</TableHead>
// //              <TableHead>Category</TableHead>
// //              <TableHead>Status</TableHead>
// //              <TableHead className="text-right">Views</TableHead>
// //              <TableHead className="text-right">Downloads</TableHead>
// //              <TableHead className="text-right">Actions</TableHead>
// //             </TableRow>
// //            </TableHeader>
// //            <TableBody>
// //             {myProjects.map((project) => (
// //              <TableRow key={project.id}>
// //               <TableCell className="font-medium">
// //                <Link
// //                 to={`/project/${project.id}`}
// //                 className="hover:text-primary transition-colors">
// //                 {project.title}
// //                </Link>
// //               </TableCell>
// //               <TableCell>
// //                <Badge variant="secondary">{project.category}</Badge>
// //               </TableCell>
// //               <TableCell>
// //                <Badge
// //                 variant={
// //                  project.status === "Published" ? "default" : "outline"
// //                 }>
// //                 {project.status}
// //                </Badge>
// //               </TableCell>
// //               <TableCell className="text-right">{project.views}</TableCell>
// //               <TableCell className="text-right">{project.downloads}</TableCell>
// //               <TableCell className="text-right">
// //                <div className="flex justify-end gap-2">
// //                 <Button size="icon" variant="ghost">
// //                  <Edit className="h-4 w-4" />
// //                 </Button>
// //                 <Button size="icon" variant="ghost">
// //                  <Trash2 className="h-4 w-4 text-destructive" />
// //                 </Button>
// //                </div>
// //               </TableCell>
// //              </TableRow>
// //             ))}
// //            </TableBody>
// //           </Table>
// //          </CardContent>
// //         </Card>
// //        </TabsContent>

// //        {/* Upload New Tab */}
// //        <TabsContent value="upload">
// //         <Card className="gradient-card shadow-soft">
// //          <CardHeader>
// //           <CardTitle className="flex items-center gap-2">
// //            <Plus className="h-5 w-5" />
// //            Submit New Project
// //           </CardTitle>
// //          </CardHeader>
// //          <CardContent>
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //            <div className="space-y-2">
// //             <Label htmlFor="title">Project Title *</Label>
// //             <Input
// //              id="title"
// //              placeholder="Enter your project title"
// //              value={projectTitle}
// //              onChange={(e) => setProjectTitle(e.target.value)}
// //              required
// //             />
// //            </div>

// //            <div className="space-y-2">
// //             <Label htmlFor="category">Category *</Label>
// //             <Select
// //              value={projectCategory}
// //              onValueChange={setProjectCategory}
// //              required>
// //              <SelectTrigger>
// //               <SelectValue placeholder="Select category" />
// //              </SelectTrigger>
// //              <SelectContent>
// //               <SelectItem value="AI">Artificial Intelligence</SelectItem>
// //               <SelectItem value="Blockchain">Blockchain</SelectItem>
// //               <SelectItem value="Cloud">Cloud Computing</SelectItem>
// //               <SelectItem value="Web">Web Development</SelectItem>
// //               <SelectItem value="Mobile">Mobile Development</SelectItem>
// //               <SelectItem value="Data">Data Science</SelectItem>
// //              </SelectContent>
// //             </Select>
// //            </div>

// //            <div className="space-y-2">
// //             <Label htmlFor="description">Description *</Label>
// //             <Textarea
// //              id="description"
// //              placeholder="Describe your project in detail..."
// //              rows="6"
// //              value={projectDescription}
// //              onChange={(e) => setProjectDescription(e.target.value)}
// //              required
// //             />
// //            </div>

// //            <div className="space-y-2">
// //             <Label htmlFor="university">University/Institution *</Label>
// //             <Input
// //              id="university"
// //              placeholder="Enter your institution name"
// //              required
// //             />
// //            </div>

// //            <div className="space-y-2">
// //             <Label htmlFor="members">Team Members</Label>
// //             <Input id="members" placeholder="Comma-separated names" />
// //            </div>

// //            <div className="space-y-2">
// //             <Label htmlFor="technologies">Technologies Used</Label>
// //             <Input
// //              id="technologies"
// //              placeholder="e.g., Python, React, TensorFlow"
// //             />
// //            </div>

// //            <div className="flex gap-4">
// //             <Button type="submit" variant="hero" className="flex-1">
// //              Submit Project
// //             </Button>
// //             <Button type="button" variant="outline">
// //              Save as Draft
// //             </Button>
// //            </div>
// //           </form>
// //          </CardContent>
// //         </Card>
// //        </TabsContent>
// //       </Tabs>
// //      </div>
// //     </section>
// //    </main>

// //    <Footer />
// //   </div>
// //  );
// // };

// // export default Dashboard;

// /** @format */

// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import { Button } from "../components/ui/button";
// import {
//  Card,
//  CardContent,
//  CardHeader,
//  CardTitle,
// } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import {
//  Table,
//  TableBody,
//  TableCell,
//  TableHead,
//  TableHeader,
//  TableRow,
// } from "../components/ui/table";

// import {
//  FolderOpen,
//  Eye,
//  Download,
//  TrendingUp,
//  Edit,
//  Trash2,
//  Plus,
// } from "lucide-react";

// import Footer from "../components/Footer";

// const Dashboard = () => {
//  const navigate = useNavigate();
//  const [myProjects, setMyProjects] = useState([]);
//  const [loading, setLoading] = useState(true);

//  // ✅ Fetch projects uploaded by logged-in user
//  useEffect(() => {
//   fetchMyProjects();
//  }, []);

//  async function fetchMyProjects() {
//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch("http://127.0.0.1:5000/api/projects/my", {
//     headers: {
//      Authorization: `Bearer ${token}`,
//     },
//    });

//    const data = await res.json();

//    if (res.ok) setMyProjects(data.projects);
//    else console.error(data);
//   } catch (err) {
//    console.error("Error fetching user projects:", err);
//   }

//   setLoading(false);
//  }

//  // ✅ Edit a project → redirect to edit page
//  function editProject(id) {
//   navigate(`/edit-project/${id}`);
//  }

//  // ✅ Delete a project
//  async function deleteProject(id) {
//   if (!window.confirm("Are you sure you want to delete this project?")) return;

//   try {
//    const token = localStorage.getItem("token");

//    const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
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

//  const stats = [
//   {
//    icon: FolderOpen,
//    label: "Total Projects",
//    value: myProjects.length.toString(),
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
//     {/* ✅ Header */}
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

//     {/* ✅ Stats */}
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

//     {/* ✅ Projects Table */}
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
//                 onClick={() => editProject(project._id)}>
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
//   </div>
//  );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "../components/ui/table";

import {
 FolderOpen,
 Download,
 Edit,
 Trash2,
 Plus,
 LayoutDashboard,
 User,
} from "lucide-react";

import Footer from "../components/Footer";
import EditProjectPopup from "./EditProjectPopup";

const Dashboard = () => {
 const navigate = useNavigate();
 const [myProjects, setMyProjects] = useState([]);
 const [loading, setLoading] = useState(true);

 const [editOpen, setEditOpen] = useState(false);
 const [selectedProject, setSelectedProject] = useState(null);

 // Get user info from localStorage
 const user = JSON.parse(localStorage.getItem("user") || "null");

 useEffect(() => {
  fetchMyProjects();
 }, []);

 // ✅ FIXED fetch logic
 async function fetchMyProjects() {
  try {
   const token = localStorage.getItem("token");

   const res = await fetch("http://127.0.0.1:5000/api/projects/my", {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   // ✅ Backend now returns an ARRAY directly, not { projects: [] }
   if (Array.isArray(data)) {
    setMyProjects(data);
   } else if (Array.isArray(data.projects)) {
    // fallback
    setMyProjects(data.projects);
   } else {
    setMyProjects([]);
   }
  } catch (err) {
   console.error("Error fetching user projects:", err);
   setMyProjects([]);
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

   const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
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
    fetchMyProjects();
   } else {
    alert(data.msg || "Failed to update project");
   }
  } catch (err) {
   console.error(err);
   alert("Error updating project");
  }
 }

 async function deleteProject(id) {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
   const token = localStorage.getItem("token");

   const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   const data = await res.json();

   if (res.ok) {
    alert("Project deleted successfully!");
    fetchMyProjects();
   } else {
    alert(data.msg || "Failed to delete project");
   }
  } catch (err) {
   console.error(err);
   alert("Error while deleting project");
  }
 }

 // ✅ Calculate total downloads for approved projects
 const totalDownloads = myProjects
  ?.filter((project) => project.approved === true)
  ?.reduce((sum, project) => sum + (project.download_count || 0), 0) || 0;

 // ✅ safe stats block
 const stats = [
  {
   icon: FolderOpen,
   label: "Total Projects",
   value: (myProjects?.length || 0).toString(),
   color: "text-blue-500",
  },
  {
   icon: Download,
   label: "Downloads",
   value: totalDownloads.toString(),
   color: "text-purple-500",
  },
 ];

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* HEADER */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Welcome back,{" "}
         <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
          {user?.name?.split(" ")[0] || "Student"}
         </span>
        </h1>
       </div>
       <p className="text-lg text-white/90 mb-8 max-w-2xl leading-relaxed">
        Manage your projects, track performance, and showcase your innovative
        work to the world.
       </p>

       <Button
        className="bg-white text-blue-600 hover:bg-white/90 shadow-xl font-semibold transition-all duration-200 hover:scale-105"
        variant="hero"
        onClick={() => navigate("/upload-project")}>
        <Plus className="h-4 w-4 mr-2" /> Upload New Project
       </Button>
      </div>
     </div>
    </section>

    {/* STATS */}
    <section className="py-8 bg-white/80 backdrop-blur-sm">
     <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
       <Card
        key={index}
        className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50">
        <CardContent className="pt-6">
         <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
           <stat.icon className="h-6 w-6 text-white" />
          </div>
          <div>
           <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {stat.value}
           </p>
           <p className="text-xs font-medium text-gray-600">{stat.label}</p>
          </div>
         </div>
        </CardContent>
       </Card>
      ))}
     </div>
    </section>

    {/* PROJECT TABLE */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container">
      <Card className="border-0 shadow-xl bg-white overflow-hidden">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center gap-3">
         <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
          <FolderOpen className="h-5 w-5 text-white" />
         </div>
         <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Projects
         </CardTitle>
        </div>
       </CardHeader>

       <CardContent className="p-0">
        {loading ? (
         <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
           <FolderOpen className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600 font-medium">Loading your projects...</p>
         </div>
        ) : myProjects.length === 0 ? (
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
           onClick={() => navigate("/upload-project")}>
           <Plus className="h-4 w-4 mr-2" /> Upload Your First Project
          </Button>
         </div>
        ) : (
         <div className="overflow-x-auto">
          <Table>
           <TableHeader>
            <TableRow className="bg-gray-50/50">
             <TableHead className="font-semibold text-gray-700">
              Title
             </TableHead>
             <TableHead className="font-semibold text-gray-700">
              Status
             </TableHead>
             <TableHead className="text-right font-semibold text-gray-700">
              Actions
             </TableHead>
            </TableRow>
           </TableHeader>

           <TableBody>
            {myProjects.map((project, index) => {
             // Check if current user is the uploader or a teammate
             const user = JSON.parse(localStorage.getItem("user") || "null");
             const userId = user?._id;
             
             // Check if user is the uploader (uploadedBy can be string or object)
             const uploadedById = typeof project.uploadedBy === 'object' 
               ? project.uploadedBy?._id || project.uploadedBy 
               : project.uploadedBy;
             const isUploader = String(uploadedById) === String(userId);
             
             // Check if user is a teammate
             const isTeammate = !isUploader && project.teammates?.some((t) => {
              const teammateId = typeof t === 'object' ? (t._id || t) : t;
              return String(teammateId) === String(userId);
             });
             
             return (
              <TableRow
               key={project._id}
               className="hover:bg-blue-50/50 transition-colors border-b">
               <TableCell className="font-medium">
                <Link
                 to={`/project/${project._id}`}
                 className="text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2">
                 <FolderOpen className="h-4 w-4 text-gray-400" />
                 {project.title}
                 {isTeammate && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                   Team Member
                  </span>
                 )}
                </Link>
               </TableCell>

              <TableCell>
               <Badge
                variant="secondary"
                className={
                 project.approved === false
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : "bg-green-100 text-green-800 border-green-200"
                }>
                {project.approved === false ? "Pending" : "Approved"}
               </Badge>
              </TableCell>

              <TableCell className="text-right">
               {isUploader ? (
                <div className="flex justify-end gap-2">
                 <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEditPopup(project)}
                  className="hover:bg-blue-100 hover:text-blue-600 transition-colors">
                  <Edit className="h-4 w-4" />
                 </Button>

                 <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteProject(project._id)}
                  className="hover:bg-red-100 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                 </Button>
                </div>
               ) : (
                <span className="text-xs text-gray-500">View Only</span>
               )}
              </TableCell>
             </TableRow>
             );
            })}
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

   {/* EDIT POPUP */}
   <EditProjectPopup
    open={editOpen}
    onClose={() => setEditOpen(false)}
    project={selectedProject}
    onSave={handleEditSave}
   />
  </div>
 );
};

export default Dashboard;
