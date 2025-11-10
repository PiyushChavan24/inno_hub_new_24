/** @format */

import React from "react";
import { Users, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "../components/ui/badge"; // relative path
import { Card } from "../components/ui/card"; // relative path

export const TeamInfo = () => {
 const teamMembers = ["Piyush Chavan", "Pushkar Thombare", "Tanvi Bokade"];

 return (
  <section className="py-16 bg-background">
   <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto">
     <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
       <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
         <Users className="h-6 w-6 text-white" />
        </div>
       </div>
       <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
        <Users className="w-4 h-4 mr-2" />
        Team Information
       </Badge>
       <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        MIT School of Computing
       </h2>
       <p className="text-gray-600">
        University Department of Computer Science & Engineering
       </p>
      </div>

      {/* University Info */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 relative z-10">
       <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border-0">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-700">MIT-ADT University</span>
       </div>
       <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border-0">
        <MapPin className="w-5 h-5 text-purple-600" />
        <span className="font-medium text-gray-700">Pune, India</span>
       </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4 relative z-10">
       <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        Project Team - Group 11
       </h3>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
         <div
          key={index}
          className="bg-white p-4 rounded-xl border-0 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg">
           {member
            .split(" ")
            .map((n) => n[0])
            .join("")}
          </div>
          <div className="font-semibold text-gray-800">{member}</div>
          <div className="text-sm text-gray-600">TYCORE3</div>
         </div>
        ))}
       </div>
      </div>

      {/* Faculty Guide */}
      <div className="mt-8 pt-8 border-t border-gray-200 relative z-10">
       <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">Faculty Guide</div>
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
         Prof. Moushmee Kuri
        </div>
       </div>
      </div>

      {/* Tagline */}
      <div className="mt-8 text-center relative z-10">
       <p className="text-sm text-gray-600 italic">
        "A leap towards World Class Education"
       </p>
       <p className="text-xs text-gray-500 mt-1">Estd. 2015</p>
      </div>
     </Card>
    </div>
   </div>
  </section>
 );
};
