/** @format */
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Info, Sparkles } from "lucide-react";
import PersonaCards from "../components/PersonaCards";
import Footer from "../components/Footer";
import { Features } from "../components/Features";
import { TeamInfo } from "../components/TeamInfo";
import { ScopeFeasibility } from "../components/ScopeFeasibility";

export default function About() {
 const user = JSON.parse(localStorage.getItem("user") || "null");

 return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-grow">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-16 md:py-24 z-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
       <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
         <Info className="h-10 w-10 text-white" />
        </div>
       </div>
       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        About{" "}
        <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
         InnoHub
        </span>
       </h1>
       <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
        Empowering students worldwide to showcase their innovative projects,
        collaborate across institutions, and build a global community of academic excellence.
       </p>
       <div className="flex items-center justify-center gap-2 pt-4">
        <Sparkles className="h-5 w-5 text-yellow-300" />
        <span className="text-white/80 text-sm">Connecting Innovation Across Universities</span>
        <Sparkles className="h-5 w-5 text-yellow-300" />
       </div>
      </div>
     </div>
    </section>

    {/* Content Sections */}
    <div className="space-y-0">
     <section className="py-16 bg-white">
      <PersonaCards />
     </section>

     <section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <Features />
     </section>

     <section className="py-16 bg-white">
      <ScopeFeasibility />
     </section>

     <section className="py-16 bg-gradient-to-b from-blue-50/30 to-white">
      <TeamInfo />
     </section>
    </div>
   </main>

   {/* Footer always visible */}
   <Footer />
  </div>
 );
}
