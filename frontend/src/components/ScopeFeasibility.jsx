/** @format */
import { CheckCircle2, Code, DollarSign, Shield } from "lucide-react";
import { Card } from "./ui/card"; // use relative path
import { Badge } from "./ui/badge"; // use relative path

export const ScopeFeasibility = () => {
 const feasibilityPoints = [
  {
   icon: Code,
   title: "Technical Feasibility",
   description: "Achievable with existing development tools and APIs",
   color: "from-primary to-primary/80",
  },
  {
   icon: DollarSign,
   title: "Financial Viability",
   description: "Viable with potential funding options and revenue models",
   color: "from-secondary to-secondary/80",
  },
  {
   icon: Shield,
   title: "Originality Check",
   description: "Plagiarism checker ensures content uniqueness",
   color: "from-accent to-accent/80",
  },
 ];

 return (
  <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
   <div className="container mx-auto px-6">
    <div className="text-center mb-12">
     <Badge
      variant="default"
      className="mb-4 bg-gradient-to-r from-success to-success/80 text-white border-0">
      <CheckCircle2 className="w-4 h-4 mr-2" />
      Validated
     </Badge>
     <h2 className="text-3xl md:text-4xl font-bold mb-3">
      Scope & Feasibility
     </h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      Comprehensive assessment of technical, financial, and practical viability
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
     {feasibilityPoints.map((point, index) => {
      const Icon = point.icon;
      return (
       <Card
        key={index}
        className="group p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2 relative overflow-hidden">
        {/* Gradient Background */}
        <div
         className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
         <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.color} p-4 mb-4 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-full h-full text-white" />
         </div>
         <h3 className="text-xl font-bold mb-3">{point.title}</h3>
         <p className="text-muted-foreground leading-relaxed">
          {point.description}
         </p>
        </div>
       </Card>
      );
     })}
    </div>

    {/* Confidence Score */}
    <div className="mt-12 text-center">
     <Card className="inline-block p-6 bg-gradient-to-r from-success/10 to-success/20 border-2 border-success/30">
      <div className="flex items-center gap-4">
       <div className="text-6xl font-bold text-success">88</div>
       <div className="text-left">
        <div className="text-lg font-semibold text-success">
         Feasibility Score
        </div>
        <div className="text-sm text-muted-foreground">
         High confidence rating
        </div>
       </div>
      </div>
     </Card>
    </div>
   </div>
  </section>
 );
};
