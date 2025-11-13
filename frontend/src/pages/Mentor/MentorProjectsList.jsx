/** @format */

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
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
 GraduationCap,
 Loader2,
 FolderOpen,
 X,
} from "lucide-react";

const MentorProjectsList = () => {
 const [projects, setProjects] = useState([]);
 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("all");
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchMentorProjects = async () => {
   try {
    const res = await fetch("/api/mentor/projects", {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    });
    const data = await res.json();
    setProjects(data.projects || []); // data.projects should be filtered by mentor in backend
   } catch (err) {
    console.error("Error fetching mentor projects:", err);
   } finally {
    setLoading(false);
   }
  };

  fetchMentorProjects();
 }, []);

 const filteredProjects = projects.filter((project) => {
  const matchesSearch =
   project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   project.description.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesCategory =
   selectedCategory === "all" || project.category === selectedCategory;
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
         <GraduationCap className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Mentor Projects
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        View and manage all projects assigned to you. Filter by category or
        search by keywords to find specific projects.
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
         <ProjectCard
          key={project._id}
          id={project._id || project.id}
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
          ? "You don't have any projects assigned to you yet."
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

export default MentorProjectsList;
