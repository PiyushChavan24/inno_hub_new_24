/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
 Shield,
 FileText,
 Download,
 AlertTriangle,
 CheckCircle,
 TrendingUp,
 Loader2,
 ExternalLink,
 Calendar,
 User,
} from "lucide-react";
import { toast } from "sonner";

const MentorReports = () => {
 const [reports, setReports] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
  fetchReports();
 }, []);

 const fetchReports = async () => {
  try {
   const token = localStorage.getItem("token");
   const res = await fetch("/api/mentor/reports", {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   if (!res.ok) {
    throw new Error("Failed to fetch reports");
   }

   const data = await res.json();
   setReports(data.reports || []);
  } catch (err) {
   console.error("Error fetching reports:", err);
   toast.error("Failed to load reports");
  } finally {
   setLoading(false);
  }
 };

 const getSimilarityColor = (percent) => {
  if (percent >= 70) return "bg-red-100 text-red-700 border-red-300";
  if (percent >= 40) return "bg-yellow-100 text-yellow-700 border-yellow-300";
  return "bg-green-100 text-green-700 border-green-300";
 };

 const getSimilarityStatus = (percent) => {
  if (percent >= 70) return "High Risk";
  if (percent >= 40) return "Medium Risk";
  return "Low Risk";
 };

 const handleDownloadPDF = async (projectId) => {
  try {
   const token = localStorage.getItem("token");
   const response = await fetch(
    `/api/projects/${projectId}/plag-report`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (!response.ok) {
    throw new Error("Failed to download PDF");
   }

   const blob = await response.blob();
   const url = window.URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.download = `plagiarism_report_${projectId}.pdf`;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(url);

   toast.success("PDF report downloaded!");
  } catch (err) {
   console.error("Download error:", err);
   toast.error("Failed to download PDF report");
  }
 };

 const handleViewProject = (projectId) => {
  navigate(`/project/${projectId}`);
 };

 if (loading) {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="flex flex-col items-center gap-4">
     <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
     <p className="text-lg font-medium text-gray-600">
      Loading plagiarism reports...
     </p>
    </div>
   </div>
  );
 }

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
         Plagiarism Reports
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
        View plagiarism analysis reports for all projects assigned to you.
        Monitor similarity percentages and download detailed PDF reports.
       </p>
      </div>
     </div>
    </section>

    {/* ✅ Reports List Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      {reports.length > 0 ? (
       <div className="space-y-6">
        {reports.map((report) => (
         <Card
          key={report._id}
          className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
           <div className="flex items-start justify-between">
            <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
               <FileText className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               {report.projectTitle || "Untitled Project"}
              </CardTitle>
             </div>
             <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {report.projectDescription || "No description available"}
             </p>
            </div>
            <Badge
             className={`${getSimilarityColor(
              report.similarityPercentage || 0
             )} border font-semibold px-3 py-1`}>
             {getSimilarityStatus(report.similarityPercentage || 0)}
            </Badge>
           </div>
          </CardHeader>
          <CardContent className="pt-6">
           <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Overall Similarity */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
             <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
               Overall Similarity
              </span>
             </div>
             <div className="flex items-baseline gap-2">
              <span
               className={`text-3xl font-bold ${
                (report.similarityPercentage || 0) >= 70
                 ? "text-red-600"
                 : (report.similarityPercentage || 0) >= 40
                 ? "text-yellow-600"
                 : "text-green-600"
               }`}>
               {report.similarityPercentage?.toFixed(1) || 0}%
              </span>
             </div>
            </div>

            {/* Project Info */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-100">
             <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
               <User className="h-4 w-4 text-gray-500" />
               <span className="text-gray-600">
                <span className="font-semibold">Student:</span>{" "}
                {report.uploadedBy || "Unknown"}
               </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
               <Calendar className="h-4 w-4 text-gray-500" />
               <span className="text-gray-600">
                <span className="font-semibold">Report Date:</span>{" "}
                {report.reportDate
                 ? new Date(report.reportDate).toLocaleDateString()
                 : "N/A"}
               </span>
              </div>
              {report.projectCategory && (
               <Badge variant="secondary" className="mt-2">
                {report.projectCategory}
               </Badge>
              )}
             </div>
            </div>
           </div>

           {/* Matches Count */}
           {report.comparedWith && report.comparedWith.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
             <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-800">
               {report.comparedWith.length} potential match
               {report.comparedWith.length !== 1 ? "es" : ""} found
              </span>
             </div>
            </div>
           )}

           {/* Action Buttons */}
           <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <Button
             onClick={() => handleViewProject(report.projectId)}
             variant="outline"
             className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
             <ExternalLink className="h-4 w-4" />
             View Project
            </Button>
            <Button
             onClick={() => handleDownloadPDF(report.projectId)}
             className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
             <Download className="h-4 w-4" />
             Download PDF Report
            </Button>
           </div>
          </CardContent>
         </Card>
        ))}
       </div>
      ) : (
       <div className="text-center py-12 px-4">
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
         <Shield className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
         No Reports Available
        </p>
        <p className="text-gray-600 mb-6">
         You don't have any plagiarism reports yet. Reports are generated when
         students upload projects assigned to you.
        </p>
       </div>
      )}
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
};

export default MentorReports;
