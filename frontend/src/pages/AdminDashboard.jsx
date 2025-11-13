/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
 Shield,
 Users,
 GraduationCap,
 UserCheck,
 FolderOpen,
 FileText,
 Loader2,
 ArrowRight,
 TrendingUp,
} from "lucide-react";

const AdminDashboard = () => {
 const [stats, setStats] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
  const fetchStats = async () => {
   try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/overview", {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });

    if (!res.ok) {
     throw new Error("Failed to fetch stats");
    }

    const data = await res.json();
    setStats(data);
   } catch (error) {
    console.error("Error fetching admin stats:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchStats();
 }, []);

 if (loading) {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="flex flex-col items-center gap-4">
     <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
     <p className="text-lg font-medium text-gray-600">Loading dashboard...</p>
    </div>
   </div>
  );
 }

 if (!stats) {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <p className="text-lg text-gray-600">Failed to load dashboard data</p>
   </div>
  );
 }

 const statCards = [
  {
   title: "Total Users",
   value: stats.total_users || 0,
   icon: Users,
   color: "from-blue-500 to-blue-600",
   bgColor: "bg-blue-50",
   textColor: "text-blue-600",
   link: "/admin/manageusers",
  },
  {
   title: "Students",
   value: stats.total_students || 0,
   icon: GraduationCap,
   color: "from-purple-500 to-purple-600",
   bgColor: "bg-purple-50",
   textColor: "text-purple-600",
   link: "/admin/manageusers",
  },
  {
   title: "Mentors",
   value: stats.total_mentors || 0,
   icon: UserCheck,
   color: "from-green-500 to-green-600",
   bgColor: "bg-green-50",
   textColor: "text-green-600",
   link: "/admin/manageusers",
  },
  {
   title: "Projects",
   value: stats.total_projects || 0,
   icon: FolderOpen,
   color: "from-orange-500 to-orange-600",
   bgColor: "bg-orange-50",
   textColor: "text-orange-600",
   link: "/admin/projects",
  },
  {
   title: "Reports",
   value: stats.total_reports || 0,
   icon: FileText,
   color: "from-indigo-500 to-indigo-600",
   bgColor: "bg-indigo-50",
   textColor: "text-indigo-600",
   link: null,
  },
 ];

 const quickActions = [
  {
   title: "Manage Users",
   description: "View, edit, and manage all users",
   icon: Users,
   link: "/admin/manageusers",
   color: "from-blue-500 to-purple-500",
  },
  {
   title: "All Projects",
   description: "Review and manage all projects",
   icon: FolderOpen,
   link: "/admin/projects",
   color: "from-green-500 to-emerald-500",
  },
 ];

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* ✅ Beautiful Header Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Admin Dashboard
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        Monitor and manage the entire platform. View statistics, manage users,
        and oversee all projects and reports.
       </p>
      </div>
     </div>
    </section>

    {/* ✅ Stats Cards Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
       {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
         <Card
          key={index}
          className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
           stat.link ? "hover:-translate-y-1" : ""
          }`}
          onClick={() => stat.link && navigate(stat.link)}>
          <CardContent className="p-6">
           <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
             <Icon className="h-6 w-6 text-white" />
            </div>
            {stat.link && <ArrowRight className="h-4 w-4 text-gray-400" />}
           </div>
           <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
             {stat.title}
            </p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>
             {stat.value.toLocaleString()}
            </p>
           </div>
          </CardContent>
         </Card>
        );
       })}
      </div>
     </div>
    </section>

    {/* ✅ Quick Actions Section */}
    <section className="py-8 bg-gradient-to-b from-blue-50/30 to-white">
     <div className="container px-4">
      <div className="mb-6">
       <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
       <p className="text-gray-600">
        Access key administrative functions quickly
       </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {quickActions.map((action, index) => {
        const Icon = action.icon;
        return (
         <Card
          key={index}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
          onClick={() => navigate(action.link)}>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
           <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
             <Icon className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             {action.title}
            </CardTitle>
           </div>
          </CardHeader>
          <CardContent className="pt-6">
           <p className="text-gray-600 mb-4">{action.description}</p>
           <Button
            className={`w-full bg-gradient-to-r ${action.color} text-white hover:opacity-90`}>
            Go to {action.title}
            <ArrowRight className="h-4 w-4 ml-2" />
           </Button>
          </CardContent>
         </Card>
        );
       })}
      </div>
     </div>
    </section>

    {/* ✅ Platform Overview Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <Card className="border-0 shadow-xl">
       <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center gap-3">
         <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
          <TrendingUp className="h-5 w-5 text-white" />
         </div>
         <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Platform Overview
         </CardTitle>
        </div>
       </CardHeader>
       <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
           <span className="text-sm font-semibold text-gray-700">
            User Distribution
           </span>
          </div>
          <div className="space-y-2">
           <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Students</span>
            <span className="font-bold text-blue-600">
             {stats.total_students || 0}
            </span>
           </div>
           <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Mentors</span>
            <span className="font-bold text-green-600">
             {stats.total_mentors || 0}
            </span>
           </div>
           <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Users</span>
            <span className="font-bold text-purple-600">
             {stats.total_users || 0}
            </span>
           </div>
          </div>
         </div>

         <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
          <div className="flex items-center justify-between mb-2">
           <span className="text-sm font-semibold text-gray-700">
            Content Statistics
           </span>
          </div>
          <div className="space-y-2">
           <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Projects</span>
            <span className="font-bold text-orange-600">
             {stats.total_projects || 0}
            </span>
           </div>
           <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Plagiarism Reports</span>
            <span className="font-bold text-indigo-600">
             {stats.total_reports || 0}
            </span>
           </div>
          </div>
         </div>
        </div>
       </CardContent>
      </Card>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default AdminDashboard;
