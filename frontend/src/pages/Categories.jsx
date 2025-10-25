/** @format */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

import categoryAI from "../assets/category-ai.jpg";
import categoryBlockchain from "../assets/category-blockchain.jpg";
import categoryCloud from "../assets/category-cloud.jpg";

const Categories = () => {
 const categories = [
  {
   name: "Artificial Intelligence",
   slug: "AI",
   description:
    "Machine learning, deep learning, neural networks, computer vision, NLP, and AI-driven applications.",
   projectCount: 450,
   color: "from-blue-500 to-cyan-500",
   image: categoryAI,
  },
  {
   name: "Blockchain",
   slug: "Blockchain",
   description:
    "Cryptocurrency, smart contracts, DeFi, NFTs, distributed ledger technology, and decentralized applications.",
   projectCount: 280,
   color: "from-purple-500 to-pink-500",
   image: categoryBlockchain,
  },
  {
   name: "Cloud Computing",
   slug: "Cloud",
   description:
    "Cloud infrastructure, serverless, containerization, microservices, DevOps, and distributed systems.",
   projectCount: 320,
   color: "from-indigo-500 to-blue-500",
   image: categoryCloud,
  },
  {
   name: "Web Development",
   slug: "Web",
   description:
    "Frontend frameworks, backend systems, full-stack applications, APIs, and web technologies.",
   projectCount: 520,
   color: "from-green-500 to-teal-500",
   image: categoryAI,
  },
  {
   name: "Mobile Development",
   slug: "Mobile",
   description:
    "iOS, Android, React Native, Flutter, cross-platform development, and mobile app design.",
   projectCount: 380,
   color: "from-orange-500 to-red-500",
   image: categoryBlockchain,
  },
  {
   name: "Data Science",
   slug: "Data",
   description:
    "Data analysis, visualization, big data, data mining, predictive modeling, and statistical analysis.",
   projectCount: 410,
   color: "from-yellow-500 to-orange-500",
   image: categoryCloud,
  },
  {
   name: "Cybersecurity",
   slug: "Security",
   description:
    "Network security, cryptography, ethical hacking, penetration testing, and security auditing.",
   projectCount: 245,
   color: "from-red-500 to-pink-500",
   image: categoryAI,
  },
  {
   name: "IoT & Embedded",
   slug: "IoT",
   description:
    "Internet of Things, sensors, microcontrollers, embedded systems, and hardware integration.",
   projectCount: 290,
   color: "from-teal-500 to-green-500",
   image: categoryBlockchain,
  },
  {
   name: "Game Development",
   slug: "Gaming",
   description:
    "Video games, game engines, graphics programming, VR/AR, and interactive experiences.",
   projectCount: 195,
   color: "from-purple-500 to-indigo-500",
   image: categoryCloud,
  },
 ];

 return (
  <div className="min-h-screen flex flex-col">
   <main className="flex-1">
    {/* Header */}
    <section className="gradient-hero border-b py-16">
     <div className="container">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
       Project{" "}
       <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Categories
       </span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
       Explore projects organized by technology domain and academic discipline.
       Find inspiration and collaborate with students in your field.
      </p>
     </div>
    </section>

    {/* Categories Grid */}
    <section className="py-12">
     <div className="container">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
       {categories.map((category) => (
        <Card
         key={category.slug}
         className="group overflow-hidden gradient-card shadow-soft hover:shadow-hover transition-smooth">
         <div className="aspect-video relative overflow-hidden">
          <img
           src={category.image}
           alt={category.name}
           className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
           <h3 className="font-bold text-xl text-foreground mb-1">
            {category.name}
           </h3>
           <Badge className="bg-primary/90 hover:bg-primary">
            {category.projectCount} projects
           </Badge>
          </div>
         </div>

         <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
           {category.description}
          </p>

          <Button asChild className="w-full" variant="outline">
           <Link to={`/projects?category=${category.slug}`}>
            Browse Projects
           </Link>
          </Button>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </section>

    {/* CTA Section */}
    <section className="py-12 bg-muted/30">
     <div className="container text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
       Don't see your category?
      </h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
       We're constantly expanding our categories based on student submissions.
       Submit your project and help us grow the platform.
      </p>
      <Button variant="hero" size="lg" asChild>
       <Link to="/dashboard">Submit Project</Link>
      </Button>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default Categories;
