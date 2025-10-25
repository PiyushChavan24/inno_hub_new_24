/** @format */
import React from "react";
import { Link } from "react-router-dom";
import PersonaCards from "../components/PersonaCards";
import Footer from "../components/Footer";
import { Features } from "../components/Features";
import { TeamInfo } from "../components/TeamInfo";
import { ScopeFeasibility } from "../components/ScopeFeasibility";

export default function About() {
 const user = JSON.parse(localStorage.getItem("user") || "null");

 return (
  <div className="flex flex-col min-h-screen">
   <main className="flex-grow p-6">
    {/* 👋 Optional welcome message if user is logged in */}
    {/* {user && (
     <div className="mt-4 text-lg">
      Hello, <span className="font-semibold">{user.name}</span> ({user.role})
     </div>
    )} */}

    {/* ✅ About page is now public — always visible */}
    <div className="mt-10">
     <PersonaCards />
    </div>

    <div className="mt-10">
     <Features />
    </div>

    <div className="mt-10">
     <ScopeFeasibility />
    </div>

    <div className="mt-10">
     <TeamInfo />
    </div>
   </main>

   {/* Footer always visible */}
   <Footer />
  </div>
 );
}
