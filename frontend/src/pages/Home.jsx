/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
 ArrowRight,
 Target,
 Users,
 Shield,
 Globe,
 Sparkles,
 TrendingUp,
 GraduationCap,
 Rocket,
 Award,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import heroBackground from "../assets/hero-background.jpg";

export default function Home() {
 const [featuredProjects, setFeaturedProjects] = useState([]);
 const [loading, setLoading] = useState(true);

 // Fetch approved projects
 useEffect(() => {
  fetchFeaturedProjects();
 }, []);

 const fetchFeaturedProjects = async () => {
  try {
   const token = localStorage.getItem("token");
   const API = "http://127.0.0.1:5000/api/projects/approved";

   const res = await fetch(API, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
   });

   if (!res.ok) {
    throw new Error("Failed to fetch projects");
   }

   const data = await res.json();
   const projects = data.projects || [];

   // Map API response to ProjectCard format and limit to 6 featured projects
   const mappedProjects = projects
    .slice(0, 6)
    .map((project) => ({
     id: project._id,
     title: project.title || "Untitled Project",
     description: project.description || "No description available.",
     category: project.category || "General",
     university: project.university || project.uploadedBy || "Unknown University",
     members: project.teammates?.length || 0,
     publishDate: project.uploadDate
      ? new Date(project.uploadDate).toLocaleDateString("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
        })
      : "Unknown Date",
     views: project.download_count || 0,
    }));

   setFeaturedProjects(mappedProjects);
  } catch (error) {
   console.error("Failed to fetch featured projects:", error);
   // Keep empty array on error
   setFeaturedProjects([]);
  } finally {
   setLoading(false);
  }
 };

 const stats = [
  { icon: Sparkles, label: "Active Projects", value: "2,500+" },
  { icon: Users, label: "Student Members", value: "10,000+" },
  { icon: Globe, label: "Universities", value: "150+" },
  { icon: TrendingUp, label: "Monthly Views", value: "100K+" },
 ];

 const features = [
  {
   icon: Target,
   title: "Enhance Visibility",
   description:
    "Showcase your projects to a global audience including peers, professionals, and investors.",
  },
  {
   icon: Users,
   title: "Foster Collaboration",
   description:
    "Connect with students across institutions and disciplines for interdisciplinary projects.",
  },
  {
   icon: Shield,
   title: "Ensure Originality",
   description:
    "Integrated plagiarism detection maintains credibility and promotes academic integrity.",
  },
  {
   icon: Globe,
   title: "Bridge Academia & Industry",
   description:
    "Gain recognition from recruiters, investors, and mentors with your innovative solutions.",
  },
 ];

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div
       className="absolute inset-0"
       style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(2px)",
       }}
      />
     </div>
     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-blue-700/90"></div>
     <div className="container relative py-20 md:py-32 z-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
       <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
         <GraduationCap className="h-12 w-12 text-white" />
        </div>
       </div>
       <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
        Showcase Your{" "}
        <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
         Unique Projects
        </span>{" "}
        to the World
       </h1>
       <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
        A unified platform connecting students across universities to share,
        discover, and collaborate on innovative academic projects.
       </p>
       <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button size="lg" variant="hero" className="bg-white text-blue-600 hover:bg-white/90 shadow-xl" asChild>
         <Link to="/explore-projects">
          Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
         </Link>
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600" asChild>
         <Link to="/upload-project">Submit Your Project</Link>
        </Button>
       </div>
      </div>
     </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 border-y bg-white/80 backdrop-blur-sm">
     <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
       {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50">
         <CardContent className="pt-6 text-center space-y-3">
          <div className="flex justify-center">
           <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <stat.icon className="h-6 w-6 text-white" />
           </div>
          </div>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
           {stat.value}
          </p>
          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </section>

    {/* Features Section */}
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-16">
       <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
         <Rocket className="h-6 w-6 text-white" />
        </div>
       </div>
       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Why Choose InnoHub?
       </h2>
       <p className="text-lg text-gray-600 leading-relaxed">
        Our platform offers comprehensive features designed to amplify your
        academic achievements and connect you with opportunities worldwide.
       </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
       {features.map((feature, index) => (
        <Card
         key={index}
         className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         <CardContent className="pt-6 space-y-4 relative z-10">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
           <feature.icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
           {feature.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </section>

    {/* Featured Projects */}
    <section className="py-20 bg-white">
     <div className="container">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
       <div>
        <div className="flex items-center gap-3 mb-3">
         <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
          <Award className="h-5 w-5 text-white" />
         </div>
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Featured Projects
         </h2>
        </div>
        <p className="text-lg text-gray-600">
         Discover innovative work from students worldwide
        </p>
       </div>
       <Button variant="hero" className="shadow-lg" asChild>
        <Link to="/explore-projects">
         View All <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
       </Button>
      </div>

      {loading ? (
       <div className="text-center py-16">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
         <Award className="h-8 w-8 text-white animate-pulse" />
        </div>
        <p className="text-gray-600 font-medium text-lg">Loading featured projects...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we fetch approved projects</p>
       </div>
      ) : featuredProjects.length > 0 ? (
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
         <ProjectCard key={project.id} {...project} />
        ))}
       </div>
      ) : (
       <div className="text-center py-16 px-4">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
         <Award className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
         No featured projects available
        </p>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
         There are no approved projects available at the moment. Check back later!
        </p>
       </div>
      )}
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="container">
      <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-blue-600/95 via-purple-600/95 to-blue-700/95 backdrop-blur-sm">
       <CardContent className="py-16 md:py-20 text-center space-y-8 relative">
        <div className="absolute inset-0 opacity-10">
         <div
          className="absolute inset-0"
          style={{
           backgroundImage: `url(${heroBackground})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
          }}
         />
        </div>
        <div className="relative z-10">
         <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
            <Rocket className="h-8 w-8 text-white" />
          </div>
         </div>
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Share Your Innovation?
         </h2>
         <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Join thousands of students already showcasing their projects. Get
          discovered by recruiters, collaborators, and industry leaders.
         </p>
         <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" variant="hero" className="bg-white text-blue-600 hover:bg-white/90 shadow-xl font-semibold" asChild>
           <Link to="/register">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
           </Link>
          </Button>
          <Button
           size="lg"
           variant="outline"
           className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
           asChild>
           <Link to="/about">Learn More</Link>
          </Button>
         </div>
        </div>
       </CardContent>
      </Card>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
}
