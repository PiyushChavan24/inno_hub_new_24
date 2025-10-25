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
     <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-background border-2 shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
       <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white border-0">
        <Users className="w-4 h-4 mr-2" />
        Team Information
       </Badge>
       <h2 className="text-3xl font-bold mb-2">MIT School of Computing</h2>
       <p className="text-muted-foreground">
        University Department of Computer Science & Engineering
       </p>
      </div>

      {/* University Info */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
       <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
        <GraduationCap className="w-5 h-5 text-primary" />
        <span className="font-medium">MIT-ADT University</span>
       </div>
       <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm border">
        <MapPin className="w-5 h-5 text-secondary" />
        <span className="font-medium">Pune, India</span>
       </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
       <h3 className="text-xl font-bold text-center mb-4">
        Project Team - Group 11
       </h3>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
         <div
          key={index}
          className="bg-card p-4 rounded-xl border-2 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg">
           {member
            .split(" ")
            .map((n) => n[0])
            .join("")}
          </div>
          <div className="font-semibold">{member}</div>
          <div className="text-sm text-muted-foreground">TYCORE3</div>
         </div>
        ))}
       </div>
      </div>

      {/* Faculty Guide */}
      <div className="mt-8 pt-8 border-t">
       <div className="text-center">
        <div className="text-sm text-muted-foreground mb-2">Faculty Guide</div>
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text ">
         Prof. Moushmee Kuri
        </div>
       </div>
      </div>

      {/* Tagline */}
      <div className="mt-8 text-center">
       <p className="text-sm text-muted-foreground italic">
        "A leap towards World Class Education"
       </p>
       <p className="text-xs text-muted-foreground mt-1">Estd. 2015</p>
      </div>
     </Card>
    </div>
   </div>
  </section>
 );
};
