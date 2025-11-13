/** @format */

// /** @format */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProjectCard from "../components/ProjectCard";

// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
// } from "../components/ui/select";

// import { Search, Filter } from "lucide-react";

// const Explore = () => {
//  const [projects, setProjects] = useState([]);
//  const [searchQuery, setSearchQuery] = useState("");
//  const [selectedCategory, setSelectedCategory] = useState("all");
//  const [loading, setLoading] = useState(true);

//  const token = localStorage.getItem("token");
//  const navigate = useNavigate();
//  const API = "/api/projects/approved"; // ✅ Fetch only approved projects

//  // Fetch approved projects
//  const fetchApprovedProjects = async () => {
//   try {
//    const res = await fetch(API, {
//     headers: { Authorization: `Bearer ${token}` },
//    });
//    const data = await res.json();
//    console.log("Approved Projects Response:", data);
//    setProjects(data.projects || []);
//   } catch (error) {
//    console.error("Failed to fetch approved projects:", error);
//   } finally {
//    setLoading(false);
//   }
//  };

//  // Delete project
//  const deleteProject = async (projectId) => {
//   if (!window.confirm("Are you sure you want to delete this project?")) return;

//   try {
//    const res = await fetch(`/api/projects/${projectId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//    });

//    if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || "Failed to delete project");
//    }

//    setProjects((prev) => prev.filter((p) => p._id !== projectId));
//   } catch (error) {
//    console.error("Error deleting project:", error);
//    alert(`Failed to delete project: ${error.message}`);
//   }
//  };

//  useEffect(() => {
//   fetchApprovedProjects();
//  }, []);

//  // Filters
//  const filteredProjects = projects.filter((project) => {
//   const matchesSearch =
//    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//    project.description?.toLowerCase().includes(searchQuery.toLowerCase());

//   const matchesCategory =
//    selectedCategory === "all" ||
//    project.category?.toLowerCase().includes(selectedCategory.toLowerCase());

//   return matchesSearch && matchesCategory;
//  });

//  return (
//   <div className="min-h-screen flex flex-col">
//    {/* <Navbar /> */}

//    <main className="flex-1">
//     {/* Header */}
//     <section className="gradient-hero border-b py-16">
//      <div className="container">
//       <h1 className="text-4xl md:text-5xl font-bold mb-4">
//        Approved Projects –{" "}
//        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//         Explore
//        </span>
//       </h1>
//       <p className="text-lg text-muted-foreground max-w-2xl">
//        Browse all approved student projects across the system.
//       </p>
//      </div>
//     </section>

//     {/* Filters */}
//     <section className="py-8 border-b bg-muted/30">
//      <div className="container">
//       <div className="flex flex-col md:flex-row gap-4">
//        {/* Search */}
//        <div className="flex-1 relative">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//          placeholder="Search projects..."
//          value={searchQuery}
//          onChange={(e) => setSearchQuery(e.target.value)}
//          className="pl-10"
//         />
//        </div>

//        {/* Category Filter */}
//        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//         <SelectTrigger className="w-full md:w-[230px]">
//          <Filter className="h-4 w-4 mr-2" />
//          <SelectValue placeholder="Category" />
//         </SelectTrigger>

//         <SelectContent>
//          <SelectItem value="all">All Categories</SelectItem>
//          <SelectItem value="Artificial Intelligence">
//           Artificial Intelligence
//          </SelectItem>
//          <SelectItem value="Blockchain">Blockchain</SelectItem>
//          <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
//          <SelectItem value="Web Development">Web Development</SelectItem>
//          <SelectItem value="Mobile Development">Mobile Development</SelectItem>
//          <SelectItem value="Data Science">Data Science</SelectItem>
//          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
//          <SelectItem value="IoT & Embedded">IoT & Embedded</SelectItem>
//         </SelectContent>
//        </Select>
//       </div>

//       <div className="mt-4 text-sm text-muted-foreground">
//        Showing {filteredProjects.length} of {projects.length} projects
//       </div>
//      </div>
//     </section>

//     {/* Projects Grid */}
//     <section className="py-12">
//      <div className="container">
//       {loading ? (
//        <p className="text-center text-muted-foreground">Loading...</p>
//       ) : filteredProjects.length > 0 ? (
//        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProjects.map((project) => (
//          <div key={project._id} className="relative">
//           <ProjectCard
//            id={project._id}
//            title={project.title}
//            description={project.description}
//            category={project.category || "General"}
//            university={project.university || "Unknown University"}
//            members={project.members || 1}
//            publishDate={
//             project.uploadDate
//              ? new Date(project.uploadDate).toDateString()
//              : "Unknown Date"
//            }
//            views={project.download_count || 0}
//           />

//           {/* Admin Controls */}
//           <div className="flex flex-col gap-2 mt-3">
//            <Button
//             size="sm"
//             className="bg-blue-600 text-white"
//             onClick={() => navigate(`/admin/projects/${project._id}`)}>
//             View Details
//            </Button>

//            <Button
//             size="sm"
//             variant="outline"
//             onClick={() =>
//              window.open(
//               `/api/projects/download/${project._id}`
//              )
//             }>
//             Download
//            </Button>

//            <Button
//             size="sm"
//             variant="destructive"
//             onClick={() => deleteProject(project._id)}>
//             Delete
//            </Button>
//           </div>
//          </div>
//         ))}
//        </div>
//       ) : (
//        <div className="text-center py-12">
//         <p className="text-muted-foreground">
//          No projects found matching your criteria.
//         </p>
//         <Button
//          onClick={() => {
//           setSearchQuery("");
//           setSelectedCategory("all");
//          }}
//          className="mt-4">
//          Clear Filters
//         </Button>
//        </div>
//       )}
//      </div>
//     </section>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default Explore;

/** @format */
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../components/ui/select";
import { Card } from "../components/ui/card";

import { Search, Filter, Compass, Sparkles } from "lucide-react";

const Explore = () => {
 const [projects, setProjects] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("all");
 const [loading, setLoading] = useState(true);

 const token = localStorage.getItem("token");
 const API = "/api/projects/approved";

 // Fetch approved projects
 const fetchApprovedProjects = async () => {
  try {
   const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
   });
   const data = await res.json();
   setProjects(data.projects || []);
  } catch (error) {
   console.error("Failed to fetch approved projects:", error);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchApprovedProjects();
 }, []);

 // Filters
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
    {/* Header */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <Compass className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Explore{" "}
         <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
          Projects
         </span>
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        Discover innovative student projects from universities worldwide. Browse,
        search, and explore approved projects across various categories.
       </p>
       <div className="flex items-center gap-2 pt-4">
        <Sparkles className="h-5 w-5 text-yellow-300" />
        <span className="text-white/80 text-sm">All projects are verified and approved</span>
        <Sparkles className="h-5 w-5 text-yellow-300" />
       </div>
      </div>
     </div>
    </section>

    {/* Filters */}
    <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100">
     <div className="container px-4">
      <Card className="border-0 shadow-lg bg-white p-6">
       <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
         <Input
          placeholder="Search projects by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
         />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
         <SelectTrigger className="w-full md:w-[250px] h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
          <div className="flex items-center">
           <Filter className="h-4 w-4 mr-2 text-gray-400" />
           <SelectValue placeholder="Select Category" />
          </div>
         </SelectTrigger>

         <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Artificial Intelligence">
           Artificial Intelligence
          </SelectItem>
          <SelectItem value="Blockchain">Blockchain</SelectItem>
          <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
          <SelectItem value="Web Development">Web Development</SelectItem>
          <SelectItem value="Mobile Development">Mobile Development</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
          <SelectItem value="IoT & Embedded">IoT & Embedded</SelectItem>
         </SelectContent>
        </Select>
       </div>

       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-700">
         Showing <span className="text-blue-600 font-bold">{filteredProjects.length}</span> of{" "}
         <span className="text-purple-600 font-bold">{projects.length}</span> projects
        </div>
        {(searchQuery || selectedCategory !== "all") && (
         <Button
          variant="outline"
          size="sm"
          onClick={() => {
           setSearchQuery("");
           setSelectedCategory("all");
          }}
          className="hover:bg-gray-50">
          Clear Filters
         </Button>
        )}
       </div>
      </Card>
     </div>
    </section>

    {/* Projects Grid */}
    <section className="py-12 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      {loading ? (
       <div className="text-center py-16">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
         <Compass className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-gray-600 font-medium text-lg">Loading projects...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we fetch approved projects</p>
       </div>
      ) : filteredProjects.length > 0 ? (
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
         <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          description={project.description}
          category={project.category || "General"}
          university={project.university || "Unknown University"}
          members={project.members || 1}
          publishDate={
           project.uploadDate
            ? new Date(project.uploadDate).toDateString()
            : "Unknown Date"
          }
          views={project.download_count || 0}
         />
        ))}
       </div>
      ) : (
       <div className="text-center py-16 px-4">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
         <Search className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
         No projects found
        </p>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
         {searchQuery || selectedCategory !== "all"
          ? "No projects match your search criteria. Try adjusting your filters."
          : "There are no approved projects available at the moment."}
        </p>
        {(searchQuery || selectedCategory !== "all") && (
         <Button
          variant="hero"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg"
          onClick={() => {
           setSearchQuery("");
           setSelectedCategory("all");
          }}>
          <Filter className="h-4 w-4 mr-2" /> Clear All Filters
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

export default Explore;
