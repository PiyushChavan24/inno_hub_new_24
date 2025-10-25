/** @format */

import React from "react";
import { Shield, Presentation, FileSearch, MessageSquare } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export const Features = () => {
 const features = [
  {
   icon: Shield,
   title: "User Authentication & Profiles",
   description:
    "Empowering students and faculty with secure and personalized access.",
   aim: "User Roles",
   color: "from-primary to-primary/80",
  },
  {
   icon: Presentation,
   title: "Project Showcase",
   description: "Making student projects visible, accessible, and impactful.",
   aim: "Document Sharing",
   color: "from-secondary to-secondary/80",
  },
  {
   icon: FileSearch,
   title: "Plagiarism Checker",
   description: "Ensuring originality and maintaining academic integrity.",
   aim: "Task and Milestone Tracking",
   color: "from-accent to-accent/80",
  },
  {
   icon: MessageSquare,
   title: "Collaboration and Communication",
   description: "Forums and chats to enhance teamwork and engagement.",
   aim: "Monitoring",
   color: "from-success to-success/80",
  },
 ];

 return (
  <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
   <div className="container mx-auto px-6">
    <div className="text-center mb-12">
     <h2 className="text-3xl md:text-4xl font-bold mb-3">
      Platform Capabilities
     </h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      Comprehensive tools designed to enhance project visibility, collaboration,
      and academic integrity
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
     {features.map((feature, index) => {
      const Icon = feature.icon; // Assign the icon component
      return (
       <Card
        key={index}
        className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2 relative overflow-hidden">
        {/* Gradient Background */}
        <div
         className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
         <div className="flex items-start gap-4 mb-4">
          <div
           className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
           <Icon className="w-full h-full text-white" />
          </div>
          <div className="flex-1">
           <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
           <Badge variant="secondary" className="text-xs">
            {feature.aim}
           </Badge>
          </div>
         </div>
         <p className="text-muted-foreground leading-relaxed">
          {feature.description}
         </p>
        </div>
       </Card>
      );
     })}
    </div>
   </div>
  </section>
 );
};
