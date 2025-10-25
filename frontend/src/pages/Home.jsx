/** @format */
/** @format */

import React from "react";
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
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import heroBackground from "../assets/hero-background.jpg";

export default function Home() {
 const featuredProjects = [
  {
   id: "1",
   title: "Explainable AI for Healthcare Diagnostics",
   description:
    "AI-driven diagnostics and medical image analysis with human-interpretable explanations.",
   category: "AI",
   university: "MIT School of Engineering, Pune",
   members: 3,
   publishDate: "Nov 21, 2024",
   views: 1250,
  },
  {
   id: "2",
   title: "Edge Computing Cloud Integration",
   description:
    "Integrating edge computing with cloud infrastructure for reduced latency.",
   category: "Cloud",
   university: "Stanford University",
   members: 2,
   publishDate: "Nov 22, 2024",
   views: 890,
  },
  {
   id: "3",
   title: "Blockchain Supply Chain System",
   description:
    "Decentralized supply chain management using blockchain technology.",
   category: "Blockchain",
   university: "Oxford University",
   members: 4,
   publishDate: "Nov 20, 2024",
   views: 1540,
  },
 ];

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
  <div className="min-h-screen flex flex-col">
   <main className="flex-1">
    {/* Hero Section */}
    <section className="relative overflow-hidden gradient-hero">
     <div
      className="absolute inset-0 opacity-10"
      style={{
       backgroundImage: `url(${heroBackground})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
      }}
     />
     <div className="container relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center space-y-8">
       <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Showcase Your{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
         Unique Projects
        </span>{" "}
        to the World
       </h1>
       <p className="text-lg md:text-xl text-muted-foreground">
        A unified platform connecting students across universities to share,
        discover, and collaborate on innovative academic projects.
       </p>
       <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" variant="hero" asChild>
         <Link to="/projects">
          Explore Projects <ArrowRight className="ml-2 h-5 w-5" />
         </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
         <Link to="/dashboard">Submit Your Project</Link>
        </Button>
       </div>
      </div>
     </div>
    </section>

    {/* Stats Section */}
    <section className="py-16 border-y bg-muted/30">
     <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
       {stats.map((stat, index) => (
        <div key={index} className="text-center space-y-2">
         <stat.icon className="h-8 w-8 mx-auto text-primary" />
         <p className="text-3xl font-bold">{stat.value}</p>
         <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* Features Section */}
    <section className="py-20">
     <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
       <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Why Choose ProjectHub?
       </h2>
       <p className="text-muted-foreground">
        Our platform offers comprehensive features designed to amplify your
        academic achievements and connect you with opportunities.
       </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
       {features.map((feature, index) => (
        <Card
         key={index}
         className="gradient-card shadow-soft hover:shadow-medium transition-smooth">
         <CardContent className="pt-6 space-y-4">
          <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center">
           <feature.icon className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </section>

    {/* Featured Projects */}
    <section className="py-20 bg-muted/30">
     <div className="container">
      <div className="flex items-center justify-between mb-12">
       <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
         Featured Projects
        </h2>
        <p className="text-muted-foreground">
         Discover innovative work from students worldwide
        </p>
       </div>
       <Button variant="outline" asChild>
        <Link to="/projects">View All</Link>
       </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {featuredProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
       ))}
      </div>
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-20">
     <div className="container">
      <Card className="gradient-primary text-primary-foreground shadow-hover">
       <CardContent className="py-16 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
         Ready to Share Your Innovation?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
         Join thousands of students already showcasing their projects. Get
         discovered by recruiters, collaborators, and industry leaders.
        </p>
        <div className="flex gap-4 justify-center">
         <Button size="lg" variant="secondary" asChild>
          <Link to="/dashboard">Get Started</Link>
         </Button>
         <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          asChild>
          <Link to="/about">Learn More</Link>
         </Button>
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
