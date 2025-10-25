/** @format */
import React from "react";
import { Link } from "react-router-dom";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from "../components/ui/card"; // adjust path if needed
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar, Users, Eye } from "lucide-react";

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
 return (
  <Card className="group overflow-hidden gradient-card shadow-soft hover:shadow-hover transition-smooth">
   {/* Project Thumbnail */}
   <div className="aspect-video bg-muted relative overflow-hidden">
    {imageUrl ? (
     <img
      src={imageUrl}
      alt={title}
      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
     />
    ) : (
     <div className="w-full h-full flex items-center justify-center gradient-primary text-primary-foreground font-semibold text-lg">
      {title.substring(0, 2).toUpperCase()}
     </div>
    )}
    <Badge className="absolute top-3 right-3 bg-background/90 text-foreground hover:bg-background">
     {category}
    </Badge>
   </div>

   {/* Card Header */}
   <CardHeader>
    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
     {title}
    </h3>
    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
   </CardHeader>

   {/* Card Content */}
   <CardContent>
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
     <div className="flex items-center gap-1">
      <Calendar className="h-3 w-3" />
      <span>{publishDate}</span>
     </div>
     <div className="flex items-center gap-1">
      <Users className="h-3 w-3" />
      <span>{members} members</span>
     </div>
     <div className="flex items-center gap-1">
      <Eye className="h-3 w-3" />
      <span>{views}</span>
     </div>
    </div>
    <p className="text-xs text-muted-foreground mt-2">{university}</p>
   </CardContent>

   {/* Card Footer */}
   <CardFooter>
    <Button asChild className="w-full" variant="outline">
     <Link to={`/project/${id}`}>View Details</Link>
    </Button>
   </CardFooter>
  </Card>
 );
};

export default ProjectCard;
