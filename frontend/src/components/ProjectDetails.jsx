/** @format */

// /** @format */

// // /** @format */

// // import { useParams } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";
// // import { Button } from "../components/ui/button";
// // import { Card, CardContent, CardHeader } from "../components/ui/card";
// // import { Badge } from "../components/ui/badge";
// // import { Separator } from "../components/ui/separator";
// // import { Avatar, AvatarFallback } from "../components/ui/avatar";
// // import {
// //  Calendar,
// //  Users,
// //  Eye,
// //  Download,
// //  Share2,
// //  ExternalLink,
// //  ArrowLeft,
// // } from "lucide-react";
// // import { toast } from "sonner";

// // const ProjectDetail = () => {
// //  const { id } = useParams();
// //  const [project, setProject] = useState(null);
// //  const [loading, setLoading] = useState(true);

// //  const token = localStorage.getItem("token"); // if API needs auth

// //  useEffect(() => {
// //   const fetchProject = async () => {
// //    try {
// //     const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
// //      headers: { Authorization: `Bearer ${token}` },
// //     });
// //     if (!res.ok) throw new Error("Project not found");
// //     const data = await res.json();
// //     setProject(data.project);
// //    } catch (err) {
// //     console.error(err);
// //     toast.error("Failed to load project details");
// //    } finally {
// //     setLoading(false);
// //    }
// //   };

// //   fetchProject();
// //  }, [id, token]);

// //  if (loading) return <p className="text-center mt-10">Loading...</p>;
// //  if (!project) return <p className="text-center mt-10">Project not found</p>;

// //  const handleShare = () => {
// //   navigator.clipboard.writeText(window.location.href);
// //   toast.success("Link copied to clipboard!");
// //  };

// //  const handleDownload = () => {
// //   toast.success("Download started!");
// //  };

// //  return (
// //   <div className="min-h-screen flex flex-col">
// //    <main className="flex-1">
// //     {/* Breadcrumb */}
// //     <section className="py-4 border-b bg-muted/30">
// //      <div className="container">
// //       <Button variant="ghost" asChild className="mb-4">
// //        <a href="/projects">
// //         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
// //        </a>
// //       </Button>
// //      </div>
// //     </section>

// //     {/* Project Header */}
// //     <section className="py-12 gradient-hero">
// //      <div className="container">
// //       <div className="max-w-4xl">
// //        <Badge className="mb-4">{project.category}</Badge>
// //        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
// //        <p className="text-xl text-muted-foreground mb-6">
// //         {project.description}
// //        </p>
// //        {/* You can keep the rest as before */}
// //       </div>
// //      </div>
// //     </section>

// //     {/* Project Content */}
// //     <section className="py-12">
// //      <div className="container">
// //       <div className="grid lg:grid-cols-3 gap-8">
// //        {/* Main Content */}
// //        <div className="lg:col-span-2 space-y-8">
// //         <Card className="gradient-card shadow-soft">
// //          <CardHeader>
// //           <h2 className="text-2xl font-bold">About This Project</h2>
// //          </CardHeader>
// //          <CardContent className="prose prose-slate max-w-none">
// //           <p className="whitespace-pre-line text-muted-foreground">
// //            {project.fullDescription || project.description}
// //           </p>
// //          </CardContent>
// //         </Card>
// //        </div>
// //        {/* Sidebar can remain as before */}
// //       </div>
// //      </div>
// //     </section>
// //    </main>

// //    <Footer />
// //   </div>
// //  );
// // };

// // export default ProjectDetail;

// /** @format */

// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Separator } from "../components/ui/separator";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import {
//  Calendar,
//  Users,
//  Eye,
//  Download,
//  Share2,
//  ExternalLink,
//  ArrowLeft,
// } from "lucide-react";
// import { toast } from "sonner";

// const ProjectDetail = () => {
//  const { id } = useParams();
//  const [project, setProject] = useState(null);
//  const [loading, setLoading] = useState(true);

//  const token = localStorage.getItem("token");

//  useEffect(() => {
//   const fetchProject = async () => {
//    try {
//     const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
//      headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Project not found");
//     const data = await res.json();
//     setProject(data.project);
//    } catch (err) {
//     console.error(err);
//     toast.error("Failed to load project details");
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchProject();
//  }, [id, token]);

//  if (loading) return <p className="text-center mt-10">Loading...</p>;
//  if (!project) return <p className="text-center mt-10">Project not found</p>;

//  const handleShare = () => {
//   navigator.clipboard.writeText(window.location.href);
//   toast.success("Link copied to clipboard!");
//  };

//  const handleDownload = () => {
//   toast.success("Download started!");
//  };

//  return (
//   <div className="min-h-screen flex flex-col">
//    <main className="flex-1">
//     {/* Breadcrumb */}
//     <section className="py-4 border-b bg-muted/30">
//      <div className="container">
//       <Button variant="ghost" asChild className="mb-4">
//        <Link to="/explore-projects">
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
//        </Link>
//       </Button>
//      </div>
//     </section>

//     {/* Project Header */}
//     <section className="py-12 gradient-hero">
//      <div className="container">
//       <div className="max-w-4xl">
//        <Badge className="text-4xl md:text-5xl font-bold mb-4">
//         {project.category}
//        </Badge>
//        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
//        <p className="text-xl text-muted-foreground mb-6">
//         {project.description}
//        </p>

//        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
//         <div className="flex items-center gap-2">
//          <Calendar className="h-4 w-4" />
//          <span>{project.publishDate}</span>
//         </div>
//         <div className="flex items-center gap-2">
//          <Users className="h-4 w-4" />
//          <span>{project.teammates?.length || 0} members</span>
//         </div>
//        </div>

//        <div className="flex gap-3">
//         <Button variant="hero" onClick={handleDownload}>
//          <Download className="mr-2 h-4 w-4" />
//          Download Project
//         </Button>
//        </div>
//       </div>
//      </div>
//     </section>

//     {/* Project Content */}
//     <section className="py-12">
//      <div className="container">
//       <div className="grid lg:grid-cols-3 gap-8">
//        {/* Main Content */}
//        <div className="lg:col-span-2 space-y-8">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">About This Project</h2>
//          </CardHeader>
//          <CardContent className="prose prose-slate max-w-none">
//           <p className="whitespace-pre-line text-muted-foreground">
//            {project.fullDescription || project.description}
//           </p>
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">Objectives</h2>
//          </CardHeader>
//          <CardContent>
//           <ul className="space-y-2">
//            {project.objectives?.map((obj, idx) => (
//             <li key={idx} className="flex items-start gap-2">
//              <span className="text-primary mt-1">•</span>
//              <span className="text-muted-foreground">{obj}</span>
//             </li>
//            ))}
//           </ul>
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">Results & Impact</h2>
//          </CardHeader>
//          <CardContent>
//           <ul className="space-y-2">
//            {project.results?.map((res, idx) => (
//             <li key={idx} className="flex items-start gap-2">
//              <span className="text-primary mt-1">✓</span>
//              <span className="text-muted-foreground">{res}</span>
//             </li>
//            ))}
//           </ul>
//          </CardContent>
//         </Card>
//        </div>

//        {/* Sidebar */}
//        <div className="space-y-6">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Team</h3>
//          </CardHeader>
//          <CardContent className="space-y-4">
//           {project.members?.map((member, idx) => (
//            <div key={idx} className="flex items-center gap-3">
//             <Avatar>
//              <AvatarFallback className="gradient-primary text-primary-foreground">
//               {member.initials}
//              </AvatarFallback>
//             </Avatar>
//             <div>
//              <p className="font-medium">{member.name}</p>
//              <p className="text-sm text-muted-foreground">{member.role}</p>
//             </div>
//            </div>
//           ))}
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Institution</h3>
//          </CardHeader>
//          <CardContent>
//           <p className="text-sm text-muted-foreground">{project.university}</p>
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Technologies Used</h3>
//          </CardHeader>
//          <CardContent>
//           <div className="flex flex-wrap gap-2">
//            {project.technologies?.map((tech, idx) => (
//             <Badge key={idx} variant="secondary">
//              {tech}
//             </Badge>
//            ))}
//           </div>
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Stats</h3>
//          </CardHeader>
//          <CardContent className="space-y-3">
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Views</span>
//            <span className="font-medium">{project.views}</span>
//           </div>
//           <Separator />
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Downloads</span>
//            <span className="font-medium">{project.downloads}</span>
//           </div>
//           <Separator />
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Published</span>
//            <span className="font-medium">{project.publishDate}</span>
//           </div>
//          </CardContent>
//         </Card>
//        </div>
//       </div>
//      </div>
//     </section>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default ProjectDetail;

/** @format */

// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Separator } from "../components/ui/separator";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import {
//  Calendar,
//  Users,
//  Eye,
//  Download,
//  Share2,
//  ExternalLink,
//  ArrowLeft,
// } from "lucide-react";
// import { toast } from "sonner";

// const ProjectDetail = () => {
//  const { id } = useParams();
//  const [project, setProject] = useState(null);
//  const [loading, setLoading] = useState(true);

//  const token = localStorage.getItem("token");

//  useEffect(() => {
//   const fetchProject = async () => {
//    try {
//     const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
//      headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Project not found");
//     const data = await res.json();
//     setProject(data.project);
//    } catch (err) {
//     console.error(err);
//     toast.error("Failed to load project details");
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchProject();
//  }, [id, token]);

//  if (loading) return <p className="text-center mt-10">Loading...</p>;
//  if (!project) return <p className="text-center mt-10">Project not found</p>;

//  const handleShare = () => {
//   navigator.clipboard.writeText(window.location.href);
//   toast.success("Link copied to clipboard!");
//  };

//  const handleDownload = () => {
//   toast.success("Download started!");
//  };

//  return (
//   <div className="min-h-screen flex flex-col">
//    <main className="flex-1">
//     {/* Breadcrumb */}
//     <section className="py-4 border-b bg-muted/30">
//      <div className="container">
//       <Button variant="ghost" asChild className="mb-4">
//        <Link to="/explore-projects">
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
//        </Link>
//       </Button>
//      </div>
//     </section>

//     {/* Project Header */}
//     <section className="py-12 gradient-hero">
//      <div className="container">
//       <div className="max-w-4xl">
//        <Badge className="text-4xl md:text-5xl font-bold mb-4">
//         {project.category}
//        </Badge>
//        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
//        <p className="text-xl text-muted-foreground mb-6">
//         {project.description}
//        </p>

//        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
//         <div className="flex items-center gap-2">
//          <Calendar className="h-4 w-4" />
//          <span>{project.publishDate}</span>
//         </div>
//         <div className="flex items-center gap-2">
//          <Users className="h-4 w-4" />
//          <span>{project.teammates?.length || 0} members</span>
//         </div>
//        </div>

//        <div className="flex gap-3">
//         <Button variant="hero" onClick={handleDownload}>
//          <Download className="mr-2 h-4 w-4" />
//          Download Project
//         </Button>
//        </div>
//       </div>
//      </div>
//     </section>

//     {/* Project Content */}
//     <section className="py-12">
//      <div className="container">
//       <div className="grid lg:grid-cols-3 gap-8">
//        {/* Main Content */}
//        <div className="lg:col-span-2 space-y-8">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">About This Project</h2>
//          </CardHeader>
//          <CardContent className="prose prose-slate max-w-none">
//           <p className="whitespace-pre-line text-muted-foreground">
//            {project.fullDescription || project.description}
//           </p>
//          </CardContent>
//         </Card>

//         {/* <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">Objectives</h2>
//          </CardHeader>
//          <CardContent>
//           <ul className="space-y-2">
//            {project.objectives?.map((obj, idx) => (
//             <li key={idx} className="flex items-start gap-2">
//              <span className="text-primary mt-1">•</span>
//              <span className="text-muted-foreground">{obj}</span>
//             </li>
//            ))}
//           </ul>
//          </CardContent>
//         </Card> */}

//         {/* <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">Results & Impact</h2>
//          </CardHeader>
//          <CardContent>
//           <ul className="space-y-2">
//            {project.results?.map((res, idx) => (
//             <li key={idx} className="flex items-start gap-2">
//              <span className="text-primary mt-1">✓</span>
//              <span className="text-muted-foreground">{res}</span>
//             </li>
//            ))}
//           </ul>
//          </CardContent>
//         </Card> */}
//        </div>

//        {/* Sidebar */}
//        <div className="space-y-6">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Team</h3>
//          </CardHeader>
//          <CardContent className="space-y-4">
//           {project.teammates?.map((member, idx) => (
//            <div key={idx} className="flex items-center gap-3">
//             <Avatar>
//              <AvatarFallback className="gradient-primary text-primary-foreground">
//               {member.initials}
//              </AvatarFallback>
//             </Avatar>
//             <div>
//              <p className="font-medium">{member.name}</p>
//              <p className="text-sm text-muted-foreground">{member.role}</p>
//             </div>
//            </div>
//           ))}
//          </CardContent>
//         </Card>

//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Institution</h3>
//          </CardHeader>
//          <CardContent>
//           <p className="text-sm text-muted-foreground">{project.university}</p>
//          </CardContent>
//         </Card>

//         {/* <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Technologies Used</h3>
//          </CardHeader>
//          <CardContent>
//           <div className="flex flex-wrap gap-2">
//            {project.technologies?.map((tech, idx) => (
//             <Badge key={idx} variant="secondary">
//              {tech}
//             </Badge>
//            ))}
//           </div>
//          </CardContent>
//         </Card> */}

//         {/* <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Stats</h3>
//          </CardHeader>
//          <CardContent className="space-y-3">
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Views</span>
//            <span className="font-medium">{project.views}</span>
//           </div>
//           <Separator />
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Downloads</span>
//            <span className="font-medium">{project.downloads}</span>
//           </div>
//           <Separator />
//           <div className="flex justify-between text-sm">
//            <span className="text-muted-foreground">Published</span>
//            <span className="font-medium">{project.publishDate}</span>
//           </div>
//          </CardContent>
//         </Card> */}
//        </div>
//       </div>
//      </div>
//     </section>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default ProjectDetail;

/** @format */

// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Separator } from "../components/ui/separator";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import { Calendar, Users, Download, ArrowLeft } from "lucide-react";
// import { toast } from "sonner";

// const ProjectDetail = () => {
//  const { id } = useParams();
//  const [project, setProject] = useState(null);
//  const [loading, setLoading] = useState(true);

//  const token = localStorage.getItem("token");

//  useEffect(() => {
//   // Reset state immediately when id changes
//   setLoading(true);
//   setProject(null);

//   const fetchProject = async () => {
//    try {
//     const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
//      headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Project not found");
//     const data = await res.json();
//     setProject(data);
//    } catch (err) {
//     console.error(err);
//     toast.error("Failed to load project details");
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchProject();
//  }, [id, token]);

//  if (loading) return <p className="text-center mt-10">Loading...</p>;
//  if (!project) return <p className="text-center mt-10">Project not found</p>;

//  const handleDownload = () => {
//   toast.success("Download started!");
//  };

//  return (
//   <div className="min-h-screen flex flex-col">
//    <main className="flex-1">
//     {/* Breadcrumb */}
//     <section className="py-4 border-b bg-muted/30">
//      <div className="container">
//       <Button variant="ghost" asChild className="mb-4">
//        <Link to="/explore-projects">
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
//        </Link>
//       </Button>
//      </div>
//     </section>

//     {/* Project Header */}
//     <section className="py-12 gradient-hero">
//      <div className="container">
//       <div className="max-w-4xl">
//        <Badge className="text-4xl md:text-5xl font-bold mb-4">
//         {project.category}
//        </Badge>
//        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
//        <p className="text-xl text-muted-foreground mb-6">
//         {project.description}
//        </p>

//        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
//         <div className="flex items-center gap-2">
//          <Calendar className="h-4 w-4" />
//          <span>{project.publishDate}</span>
//         </div>
//         <div className="flex items-center gap-2">
//          <Users className="h-4 w-4" />
//          <span>{project.teammates?.length || 0} members</span>
//         </div>
//        </div>

//        <div className="flex gap-3">
//         <Button variant="hero" onClick={handleDownload}>
//          <Download className="mr-2 h-4 w-4" />
//          Download Project
//         </Button>
//        </div>
//       </div>
//      </div>
//     </section>

//     {/* Project Content */}
//     <section className="py-12">
//      <div className="container">
//       <div className="grid lg:grid-cols-3 gap-8">
//        {/* Main Content */}
//        <div className="lg:col-span-2 space-y-8">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">About This Project</h2>
//          </CardHeader>
//          <CardContent className="prose prose-slate max-w-none">
//           <p className="whitespace-pre-line text-muted-foreground">
//            {project.fullDescription || project.description}
//           </p>
//          </CardContent>
//         </Card>
//        </div>

//        {/* Sidebar */}
//        <div className="space-y-6">
//         {/* Project Team */}
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Team</h3>
//          </CardHeader>
//          <CardContent className="space-y-4">
//           {project.teammates?.map((member, idx) => (
//            <div key={idx} className="flex items-center gap-3">
//             <Avatar>
//              <AvatarFallback className="gradient-primary text-primary-foreground">
//               {member.initials}
//              </AvatarFallback>
//             </Avatar>
//             <div>
//              <p className="font-medium">{member.name}</p>
//              <p className="text-sm text-muted-foreground">{member.role}</p>
//             </div>
//            </div>
//           ))}
//          </CardContent>
//         </Card>

//         {/* Institution */}
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Institution</h3>
//          </CardHeader>
//          <CardContent>
//           <p className="text-sm text-muted-foreground">{project.university}</p>
//          </CardContent>
//         </Card>
//        </div>
//       </div>
//      </div>
//     </section>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default ProjectDetail;

// /** @format */
// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Footer from "../components/Footer";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardHeader } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Separator } from "../components/ui/separator";
// import { Avatar, AvatarFallback } from "../components/ui/avatar";
// import { Calendar, Users, Download, ArrowLeft } from "lucide-react";
// import { toast } from "sonner";

// const ProjectDetail = () => {
//  const { id } = useParams();
//  const [project, setProject] = useState(null);
//  const [loading, setLoading] = useState(true);

//  const token = localStorage.getItem("token");

//  useEffect(() => {
//   setLoading(true);
//   setProject(null);

//   const fetchProject = async () => {
//    try {
//     const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
//      headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Project not found");
//     const data = await res.json();
//     setProject(data);
//    } catch (err) {
//     console.error(err);
//     toast.error("Failed to load project details");
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchProject();
//  }, [id, token]);

//  if (loading) return <p className="text-center mt-10">Loading...</p>;
//  if (!project) return <p className="text-center mt-10">Project not found</p>;

//  // ✅ Extract filename from filePath
//  const getFileName = () => {
//   if (!project.filePath) return null;
//   return project.filePath.split("\\").pop().split("/").pop();
//  };

//  //  const handleDownload = () => {
//  //   if (!project.filePath) {
//  //    toast.error("No file available for download");
//  //    return;
//  //   }

//  //   const downloadUrl = `http://127.0.0.1:5000/api/projects/${id}/download`;

//  //   const link = document.createElement("a");
//  //   link.href = downloadUrl;
//  //   link.setAttribute("download", getFileName());
//  //   document.body.appendChild(link);
//  //   link.click();
//  //   link.remove();

//  //   toast.success("Download started!");
//  //  };
//  const handleDownload = async () => {
//   if (!project.filePath) {
//    toast.error("No file available for download");
//    return;
//   }

//   const downloadUrl = `http://127.0.0.1:5000/api/projects/${id}/download`;

//   try {
//    const response = await fetch(downloadUrl, {
//     method: "GET",
//     headers: {
//      Authorization: `Bearer ${token}`,
//     },
//    });

//    if (!response.ok) {
//     toast.error("Failed to download file");
//     return;
//    }

//    // ✅ Convert response to blob
//    const blob = await response.blob();
//    const filename = project.filePath.split("\\").pop().split("/").pop();

//    // ✅ Create a temporary download link
//    const url = window.URL.createObjectURL(blob);
//    const link = document.createElement("a");
//    link.href = url;
//    link.download = filename;
//    document.body.appendChild(link);
//    link.click();
//    link.remove();

//    window.URL.revokeObjectURL(url);

//    toast.success("Download started!");
//   } catch (err) {
//    toast.error("Download failed");
//    console.error(err);
//   }
//  };

//  return (
//   <div className="min-h-screen flex flex-col">
//    <main className="flex-1">
//     {/* Breadcrumb */}
//     <section className="py-4 border-b bg-muted/30">
//      <div className="container">
//       <Button variant="ghost" asChild className="mb-4">
//        <Link to="/explore-projects">
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
//        </Link>
//       </Button>
//      </div>
//     </section>

//     {/* Project Header */}
//     <section className="py-12 gradient-hero">
//      <div className="container">
//       <div className="max-w-4xl">
//        <Badge className="text-4xl md:text-5xl font-bold mb-4">
//         {project.category}
//        </Badge>

//        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

//        <p className="text-xl text-muted-foreground mb-6">
//         {project.description}
//        </p>

//        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
//         <div className="flex items-center gap-2">
//          <Calendar className="h-4 w-4" />
//          <span>{project.publishDate || "No date available"}</span>
//         </div>

//         <div className="flex items-center gap-2">
//          <Users className="h-4 w-4" />
//          <span>{project.teammates?.length || 0} members</span>
//         </div>
//        </div>

//        <div className="flex gap-3">
//         <Button variant="hero" onClick={handleDownload}>
//          <Download className="mr-2 h-4 w-4" />
//          Download Project
//         </Button>
//        </div>
//       </div>
//      </div>
//     </section>

//     {/* Project Content */}
//     <section className="py-12">
//      <div className="container">
//       <div className="grid lg:grid-cols-3 gap-8">
//        {/* Main Content */}
//        <div className="lg:col-span-2 space-y-8">
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h2 className="text-2xl font-bold">About This Project</h2>
//          </CardHeader>
//          <CardContent className="prose prose-slate max-w-none">
//           <p className="whitespace-pre-line text-muted-foreground">
//            {project.fullDescription || project.description}
//           </p>
//          </CardContent>
//         </Card>
//        </div>

//        {/* Sidebar */}
//        <div className="space-y-6">
//         {/* Project Team */}
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Project Team</h3>
//          </CardHeader>
//          <CardContent className="space-y-4">
//           {project.teammates?.map((member, idx) => (
//            <div key={idx} className="flex items-center gap-3">
//             <Avatar>
//              <AvatarFallback className="gradient-primary text-primary-foreground">
//               {member.initials}
//              </AvatarFallback>
//             </Avatar>
//             <div>
//              <p className="font-medium">{member.name}</p>
//              <p className="text-sm text-muted-foreground">{member.role}</p>
//             </div>
//            </div>
//           ))}
//          </CardContent>
//         </Card>

//         {/* Institution */}
//         <Card className="gradient-card shadow-soft">
//          <CardHeader>
//           <h3 className="font-semibold">Institution</h3>
//          </CardHeader>
//          <CardContent>
//           <p className="text-sm text-muted-foreground">{project.university}</p>
//          </CardContent>
//         </Card>
//        </div>
//       </div>
//      </div>
//     </section>
//    </main>

//    <Footer />
//   </div>
//  );
// };

// export default ProjectDetail;
/** @format */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
 Calendar,
 Users,
 Download,
 ArrowLeft,
 FileText,
 GraduationCap,
 User,
 Mail,
 Loader2,
 AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const ProjectDetail = () => {
 const { id } = useParams();
 const [project, setProject] = useState(null);
 const [loading, setLoading] = useState(true);

 const token = localStorage.getItem("token");

 // ✅ Fetch the project
 useEffect(() => {
  const fetchProject = async () => {
   setLoading(true);
   setProject(null);

   try {
    const res = await fetch(`http://127.0.0.1:5000/api/projects/${id}`, {
     headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Project not found");

    const data = await res.json();
    setProject(data);
   } catch (err) {
    console.error(err);
    toast.error("Failed to load project details");
   } finally {
    setLoading(false);
   }
  };

  fetchProject();
 }, [id, token]);

 // ✅ Extract filename
 const getFileName = () => {
  if (!project?.filePath) return null;
  return project.filePath.split("\\").pop().split("/").pop();
 };

 // ✅ Download handler
 const handleDownload = async () => {
  if (!project?.filePath) {
   toast.error("No file available for download");
   return;
  }

  const downloadUrl = `http://127.0.0.1:5000/api/projects/${id}/download`;

  try {
   const response = await fetch(downloadUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
   });

   if (!response.ok) {
    toast.error("Failed to download file");
    return;
   }

   const blob = await response.blob();
   const filename = getFileName();

   const url = window.URL.createObjectURL(blob);
   const link = document.createElement("a");

   link.href = url;
   link.download = filename;
   document.body.appendChild(link);
   link.click();
   link.remove();

   window.URL.revokeObjectURL(url);
   toast.success("Download started!");
  } catch (err) {
   toast.error("Download failed");
   console.error(err);
  }
 };

 // Loading state
 if (loading) {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="flex flex-col items-center gap-4">
     <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
     <p className="text-lg font-medium text-gray-600">Loading project details...</p>
    </div>
   </div>
  );
 }

 // Error state
 if (!project) {
  return (
   <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <main className="flex-1 flex items-center justify-center">
     <Card className="max-w-md shadow-xl border-0">
      <CardContent className="pt-6">
       <div className="flex flex-col items-center gap-4 text-center">
        <div className="p-3 rounded-full bg-red-100">
         <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div>
         <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
         <p className="text-muted-foreground mb-6">
          The project you're looking for doesn't exist or has been removed.
         </p>
         <Button asChild variant="hero">
          <Link to="/explore-projects">
           <ArrowLeft className="mr-2 h-4 w-4" />
           Back to Projects
          </Link>
         </Button>
        </div>
       </div>
      </CardContent>
     </Card>
    </main>
   </div>
  );
 }

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* Breadcrumb */}
    <section className="py-4 border-b bg-white/80 backdrop-blur-sm shadow-sm">
     <div className="container mx-auto px-4">
      <Button
       variant="ghost"
       asChild
       className="hover:bg-blue-50 transition-colors">
       <Link to="/explore-projects" className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Projects</span>
       </Link>
      </Button>
     </div>
    </section>

    {/* Header */}
    <section className="relative py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white overflow-hidden">
     <div className="absolute inset-0 bg-black/10"></div>
     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80')] bg-cover bg-center opacity-10"></div>
     <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl">
       <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
         <FileText className="h-5 w-5" />
        </div>
        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1.5 text-base font-semibold">
         {project.category}
        </Badge>
       </div>

       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        {project.title}
       </h1>

       <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
        {project.description}
       </p>

       <div className="flex flex-wrap items-center gap-6 mb-8">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
         <Calendar className="h-5 w-5" />
         <span className="font-medium">
          {project.uploadDate
           ? new Date(project.uploadDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
             })
           : "Not available"}
         </span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
         <Users className="h-5 w-5" />
         <span className="font-medium">
          {project.teammates?.length || 0} team member
          {project.teammates?.length !== 1 ? "s" : ""}
         </span>
        </div>
       </div>

       <div className="flex gap-3">
        <Button
         onClick={handleDownload}
         className="bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 font-semibold px-6 py-6 text-base">
         <Download className="mr-2 h-5 w-5" />
         Download Project
        </Button>
       </div>
      </div>
     </div>
    </section>

    {/* Content */}
    <section className="py-12">
     <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-3 gap-8">
       {/* Main Content */}
       <div className="lg:col-span-2 space-y-8">
        <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
         <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center gap-3">
           <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <FileText className="h-5 w-5 text-white" />
           </div>
           <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About This Project
           </CardTitle>
          </div>
         </CardHeader>
         <CardContent className="pt-6">
          <p className="whitespace-pre-line text-gray-700 leading-relaxed text-base">
           {project.fullDescription || project.description}
          </p>
         </CardContent>
        </Card>
       </div>

       {/* Sidebar */}
       <div className="space-y-6">
        {/* Mentor */}
        {project.mentor && (
         <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
           <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
             <User className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Mentor
            </CardTitle>
           </div>
          </CardHeader>
          <CardContent className="pt-6">
           <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-blue-200">
             <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
              {project.mentor.name
               ?.split(" ")
               .map((w) => w[0])
               .join("")
               .toUpperCase()}
             </AvatarFallback>
            </Avatar>
            <div className="flex-1">
             <p className="font-semibold text-gray-900">{project.mentor.name}</p>
             <div className="flex items-center gap-1.5 mt-1">
              <Mail className="h-3.5 w-3.5 text-gray-500" />
              <p className="text-sm text-gray-600">{project.mentor.email}</p>
             </div>
            </div>
           </div>
          </CardContent>
         </Card>
        )}

        {/* Project Team */}
        <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
         <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center gap-3">
           <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <Users className="h-5 w-5 text-white" />
           </div>
           <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Team
           </CardTitle>
          </div>
         </CardHeader>
         <CardContent className="pt-6">
          {project.teammates?.length > 0 ? (
           <div className="space-y-4">
            {project.teammates.map((member, idx) => {
             const initials = member.name
              ?.split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase();

             return (
              <div
               key={idx}
               className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors">
               <Avatar className="h-10 w-10 border-2 border-blue-200">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm">
                 {initials}
                </AvatarFallback>
               </Avatar>
               <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                 {member.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                 <Mail className="h-3 w-3 text-gray-500 flex-shrink-0" />
                 <p className="text-xs text-gray-600 truncate">{member.email}</p>
                </div>
               </div>
              </div>
             );
            })}
           </div>
          ) : (
           <div className="text-center py-6">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No teammates listed</p>
           </div>
          )}
         </CardContent>
        </Card>

        {/* University/Institution */}
        {project.university && (
         <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
           <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
             <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Institution
            </CardTitle>
           </div>
          </CardHeader>
          <CardContent className="pt-6">
           <p className="text-gray-700 font-medium">{project.university}</p>
          </CardContent>
         </Card>
        )}
       </div>
      </div>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default ProjectDetail;
