/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../../components/ui/select";
import {
 Search,
 Filter,
 Shield,
 FolderOpen,
 Loader2,
 X,
 Eye,
 CheckCircle,
 Download,
 Trash2,
} from "lucide-react";
import { toast } from "sonner";

const AdminProjects = () => {
 const [projects, setProjects] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("all");
 const [loading, setLoading] = useState(true);

 const token = localStorage.getItem("token");
 const navigate = useNavigate();

 const API = "/api/admin/projects";

 // ✅ Fetch all projects
 const fetchAllProjects = async () => {
  try {
   const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
   });

   const data = await res.json();
   console.log("Admin Projects Response:", data);

   setProjects(data.projects || []);
  } catch (error) {
   console.error("Failed to fetch admin projects:", error);
  } finally {
   setLoading(false);
  }
 };

 // ✅ Approve project
 const approveProject = async (projectId) => {
  try {
   const res = await fetch(
    `/api/mentor/projects/${projectId}/approve`,
    {
     method: "PATCH",
     headers: { Authorization: `Bearer ${token}` },
    }
   );

   if (!res.ok) {
    throw new Error("Failed to approve project");
   }

   setProjects((prev) =>
    prev.map((p) => (p._id === projectId ? { ...p, approved: true } : p))
   );
   toast.success("Project approved successfully!");
  } catch (error) {
   console.error("Error approving project:", error);
   toast.error("Failed to approve project");
  }
 };

 // ✅ Delete project with confirmation
 const deleteProject = async (projectId) => {
  if (
   !window.confirm(
    "Are you sure you want to delete this project? This action cannot be undone."
   )
  )
   return;

  try {
   const res = await fetch(
    `/api/admin/projects/${projectId}`,
    {
     method: "DELETE",
     headers: { Authorization: `Bearer ${token}` },
    }
   );

   if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.msg || "Failed to delete project");
   }

   setProjects((prev) => prev.filter((p) => p._id !== projectId));
   toast.success("Project deleted successfully!");
  } catch (error) {
   console.error("Error deleting project:", error);
   toast.error(error.message || "Failed to delete project");
  }
 };

 // ✅ Download project file
 const handleDownload = async (projectId) => {
  try {
   const response = await fetch(
    `/api/projects/download/${projectId}`,
    {
     method: "GET",
     headers: { Authorization: `Bearer ${token}` },
    }
   );

   if (!response.ok) {
    throw new Error("Failed to download file");
   }

   const blob = await response.blob();
   const url = window.URL.createObjectURL(blob);
   let filename = "project_file";
   const contentDisposition = response.headers.get("Content-Disposition");
   if (contentDisposition) {
    const filenameMatch = contentDisposition.match(
     /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );
    if (filenameMatch && filenameMatch[1]) {
     filename = filenameMatch[1].replace(/['"]/g, "");
     try {
      filename = decodeURIComponent(filename);
     } catch (e) {}
    }
   }
   const link = document.createElement("a");
   link.href = url;
   link.download = filename;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(url);
   toast.success("Download started!");
  } catch (err) {
   console.error("Download error:", err);
   toast.error("Failed to download file");
  }
 };

 useEffect(() => {
  fetchAllProjects();
 }, []);

 // ✅ FILTERS
 const filteredProjects = projects.filter((project) => {
  const matchesSearch =
   project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
   project.description?.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory =
   selectedCategory === "all" ||
   project.category?.toLowerCase().includes(selectedCategory.toLowerCase());

  return matchesSearch && matchesCategory;
 });

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
         <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Admin Projects
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        Review, approve, and manage all submitted student projects. Monitor
        project submissions and maintain quality standards.
       </p>
      </div>
     </div>
    </section>

    {/* ✅ Enhanced Filters Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <Card className="border-0 shadow-lg bg-white overflow-hidden">
       <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
         {/* Search Input */}
         <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
           placeholder="Search projects by title or description..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
         </div>

         {/* Category Filter */}
         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[220px] h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
           <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Filter by Category" />
           </div>
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="all">All Categories</SelectItem>
           <SelectItem value="AI">Artificial Intelligence</SelectItem>
           <SelectItem value="Blockchain">Blockchain</SelectItem>
           <SelectItem value="Cloud">Cloud Computing</SelectItem>
           <SelectItem value="Web">Web Development</SelectItem>
           <SelectItem value="Mobile">Mobile Development</SelectItem>
           <SelectItem value="Data">Data Science</SelectItem>
           <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
           <SelectItem value="IoT">IoT & Embedded</SelectItem>
          </SelectContent>
         </Select>

         {/* Clear Filters Button */}
         {(searchQuery || selectedCategory !== "all") && (
          <Button
           variant="outline"
           onClick={() => {
            setSearchQuery("");
            setSelectedCategory("all");
           }}
           className="h-11 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors">
           <X className="h-4 w-4 mr-2" />
           Clear
          </Button>
         )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
         <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">
           {filteredProjects.length}
          </span>{" "}
          {filteredProjects.length === 1 ? "project" : "projects"} found
          {projects.length !== filteredProjects.length && (
           <span className="text-gray-500">
            {" "}
            out of {projects.length} total
           </span>
          )}
         </p>
        </div>
       </CardContent>
      </Card>
     </div>
    </section>

    {/* ✅ Enhanced Projects Grid Section */}
    <section className="py-8 bg-gradient-to-b from-blue-50/30 to-white">
     <div className="container px-4">
      {loading ? (
       <div className="text-center py-12">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
         <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
        <p className="text-gray-600 font-medium">Loading projects...</p>
       </div>
      ) : filteredProjects.length > 0 ? (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
         <div key={project._id} className="relative">
          <ProjectCard
           id={project._id}
           title={project.title}
           description={project.description}
           category={project.category || "General"}
           university={project.university || "N/A"}
           members={project.teammates?.length || 0}
           publishDate={
            project.uploadDate
             ? new Date(project.uploadDate).toLocaleDateString()
             : "N/A"
           }
           views={project.download_count || 0}
           imageUrl={null}
          />

          {/* ✅ Enhanced Admin Controls */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
           <div className="flex items-center gap-2 mb-3">
            {project.approved ? (
             <Badge className="bg-green-100 text-green-700 border-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved
             </Badge>
            ) : (
             <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
              Pending
             </Badge>
            )}
           </div>

           <div className="grid grid-cols-2 gap-2">
            <Button
             size="sm"
             variant="outline"
             onClick={() => navigate(`/project/${project._id}`)}
             className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
             <Eye className="h-4 w-4" />
             View
            </Button>

            {!project.approved && (
             <Button
              size="sm"
              onClick={() => approveProject(project._id)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <CheckCircle className="h-4 w-4" />
              Approve
             </Button>
            )}

            <Button
             size="sm"
             variant="outline"
             onClick={() => handleDownload(project._id)}
             className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300">
             <Download className="h-4 w-4" />
             Download
            </Button>

            <Button
             size="sm"
             variant="destructive"
             onClick={() => deleteProject(project._id)}
             className="flex items-center gap-2 hover:bg-red-600">
             <Trash2 className="h-4 w-4" />
             Delete
            </Button>
           </div>
          </div>
         </div>
        ))}
       </div>
      ) : (
       <div className="text-center py-12 px-4">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
         <FolderOpen className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
         No Projects Found
        </p>
        <p className="text-gray-600 mb-6">
         {projects.length === 0
          ? "No projects have been submitted yet."
          : "No projects match your search criteria. Try adjusting your filters."}
        </p>
        {(searchQuery || selectedCategory !== "all") && (
         <Button
          variant="hero"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg"
          onClick={() => {
           setSearchQuery("");
           setSelectedCategory("all");
          }}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
         </Button>
        )}
       </div>
      )}
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default AdminProjects;
