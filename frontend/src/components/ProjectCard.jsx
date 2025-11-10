/** @format */

// /** @format */
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//  Card,
//  CardContent,
//  CardFooter,
//  CardHeader,
// } from "../components/ui/card"; // adjust path if needed
// import { Badge } from "../components/ui/badge";
// import { Button } from "../components/ui/button";
// import { Calendar, Users, Eye } from "lucide-react";

// const ProjectCard = ({
//  id,
//  title,
//  description,
//  category,
//  university,
//  members,
//  publishDate,
//  views,
//  imageUrl,
// }) => {
//  return (
//   <Card className="group overflow-hidden gradient-card shadow-soft hover:shadow-hover transition-smooth">
//    {/* Project Thumbnail */}
//    <div className="aspect-video bg-muted relative overflow-hidden">
//     {imageUrl ? (
//      <img
//       src={imageUrl}
//       alt={title}
//       className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
//      />
//     ) : (
//      <div className="w-full h-full flex items-center justify-center gradient-primary text-primary-foreground font-semibold text-lg">
//       {title.substring(0, 2).toUpperCase()}
//      </div>
//     )}
//     <Badge className="absolute top-3 right-3 bg-background/90 text-foreground hover:bg-background">
//      {category}
//     </Badge>
//    </div>

//    {/* Card Header */}
//    <CardHeader>
//     <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
//      {title}
//     </h3>
//     <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
//    </CardHeader>

//    {/* Card Content */}
//    <CardContent>
//     <div className="flex items-center gap-4 text-xs text-muted-foreground">
//      <div className="flex items-center gap-1">
//       <Calendar className="h-3 w-3" />
//       <span>{publishDate}</span>
//      </div>
//      <div className="flex items-center gap-1">
//       <Users className="h-3 w-3" />
//       <span>{members} members</span>
//      </div>
//      <div className="flex items-center gap-1">
//       <Eye className="h-3 w-3" />
//       <span>{views}</span>
//      </div>
//     </div>
//     <p className="text-xs text-muted-foreground mt-2">{university}</p>
//    </CardContent>

//    {/* Card Footer */}
//    <CardFooter>
//     <Button asChild className="w-full" variant="outline">
//      <Link to={`/project/${id}`}>View Details</Link>
//     </Button>
//    </CardFooter>
//   </Card>
//  );
// };

// export default ProjectCard;

/** @format */
import React from "react";
import { useNavigate } from "react-router-dom";
import {
 Card,
 CardContent,
 CardHeader,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Users, Eye, GraduationCap, ArrowRight } from "lucide-react";

const ProjectCard = ({
 id,
 title,
 description,
 category,
 university,
 members,
 publishDate,
 views,
 imageUrl,
}) => {
 const navigate = useNavigate();

 return (
  <Card
   className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden relative cursor-pointer"
   onClick={() => navigate(`/project/${id}`)}>
   {/* Gradient Background Overlay */}
   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

   {/* Project Thumbnail */}
   <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
    {imageUrl ? (
     <img
      src={imageUrl}
      alt={title}
      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
     />
    ) : (
     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-2xl shadow-inner">
      {title.substring(0, 2).toUpperCase()}
     </div>
    )}
    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg font-semibold">
     {category}
    </Badge>
   </div>

   {/* Card Header */}
   <CardHeader className="relative z-10 pb-3">
    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors text-gray-800 mb-2">
     {title}
    </h3>
    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
     {description}
    </p>
   </CardHeader>

   {/* Card Content */}
   <CardContent className="relative z-10 space-y-3">
    <div className="flex items-center flex-wrap gap-3 text-xs text-gray-600">
     <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-50">
      <Calendar className="h-3.5 w-3.5 text-blue-600" />
      <span className="font-medium">{publishDate}</span>
     </div>
     <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-purple-50">
      <Users className="h-3.5 w-3.5 text-purple-600" />
      <span className="font-medium">{members + 1} members</span>
     </div>
     <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50">
      <Eye className="h-3.5 w-3.5 text-green-600" />
      <span className="font-medium">{views} views</span>
     </div>
    </div>

    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
     <GraduationCap className="h-4 w-4 text-gray-400 flex-shrink-0" />
     <p className="text-xs text-gray-600 line-clamp-1 font-medium">
      {university}
     </p>
    </div>

    <div className="flex items-center gap-2 pt-1 text-blue-600 group-hover:text-purple-600 transition-colors">
     <span className="text-sm font-semibold">View Details</span>
     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </div>
   </CardContent>
  </Card>
 );
};

export default ProjectCard;

