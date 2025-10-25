/** @format */

import React from "react";
import { MessageCircle, Brain, Heart } from "lucide-react";
import { Card } from "../components/ui/card"; // adjust the path if needed

export const PersonaCards = () => {
 const personas = [
  {
   icon: MessageCircle,
   title: "Says",
   content:
    "I need a platform where I can collaborate with students from other universities.",
   color: "from-primary to-primary/80",
   iconColor: "text-primary",
  },
  {
   icon: Brain,
   title: "Thinks",
   content: "Am I managing my time well enough to meet all these deadlines?",
   color: "from-secondary to-secondary/80",
   iconColor: "text-secondary",
  },
  {
   icon: Heart,
   title: "Feels",
   content: "I'm worried that my project idea isn't innovative enough.",
   color: "from-destructive to-destructive/80",
   iconColor: "text-destructive",
  },
 ];

 return (
  <section className="py-16 bg-background">
   <div className="container mx-auto px-6">
    <div className="text-center mb-12">
     <h2 className="text-3xl md:text-4xl font-bold mb-3">Student Personas</h2>
     <p className="text-muted-foreground text-lg">
      Understanding the needs and concerns of our users
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
     {personas.map((persona, index) => {
      const Icon = persona.icon;
      return (
       <Card
        key={index}
        className="group p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-2 relative overflow-hidden">
        {/* Gradient Background */}
        <div
         className={`absolute inset-0 bg-gradient-to-br ${persona.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
         <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${persona.color} p-4 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-full h-full text-white" />
         </div>
         <h3 className={`text-xl font-bold mb-3 ${persona.iconColor}`}>
          {persona.title}
         </h3>
         <p className="text-muted-foreground leading-relaxed">
          "{persona.content}"
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

export default PersonaCards;
