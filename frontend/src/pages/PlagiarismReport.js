/** @format */

// /** @format */

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function PlagiarismReport() {
//  const { id } = useParams(); // project ID from route
//  const [report, setReport] = useState(null);
//  const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   fetchReport();
//   // eslint-disable-next-line
//  }, []);

//  async function fetchReport() {
//   try {
//    const res = await fetch("/api/reports");
//    if (!res.ok) throw new Error("Failed to fetch reports");
//    const data = await res.json();
//    // Find the report for the specific project
//    const r = data.reports.find((r) => r.projectId === id);
//    if (!r) {
//     alert("Report not found for this project");
//    } else {
//     setReport(r);
//    }
//   } catch (err) {
//    console.error(err);
//    alert(err.message || "Error fetching report");
//   } finally {
//    setLoading(false);
//   }
//  }

//  if (loading) return <div>Loading...</div>;
//  if (!report) return <div>No report available</div>;

//  return (
//   <div className="bg-white p-4 rounded shadow max-w-3xl mx-auto">
//    <h2 className="text-2xl font-semibold mb-4">Plagiarism Report</h2>
//    <div className="mb-2">
//     <strong>Overall similarity:</strong> {report.similarityPercentage}%
//    </div>
//    <div>
//     {report.comparedWith.map((c, idx) => (
//      <div key={idx} className="border p-2 my-2 rounded">
//       <div>
//        <strong>Project ID:</strong> {c.projectId}
//       </div>
//       <div>
//        <strong>Similarity:</strong> {c.similarity}%
//       </div>
//       <div>
//        <strong>Snippets:</strong>
//        <ul className="list-disc pl-5">
//         {(c.snippets || []).map((s, i) => (
//          <li key={i} className="text-sm">
//           {s}
//          </li>
//         ))}
//        </ul>
//       </div>
//      </div>
//     ))}
//    </div>
//   </div>
//  );
// }

/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
 Shield,
 Download,
 FileText,
 AlertTriangle,
 CheckCircle,
 TrendingUp,
 FileSearch,
 Loader2,
} from "lucide-react";
import Footer from "../components/Footer";

export default function PlagiarismReport() {
 const { id } = useParams(); // project ID from route
 const [report, setReport] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchReport();
  // eslint-disable-next-line
 }, []);

 async function fetchReport() {
  try {
   const res = await fetch("/api/reports");
   if (!res.ok) throw new Error("Failed to fetch reports");
   const data = await res.json();

   // Find the report for the specific project
   const r = data.reports.find((r) => r.projectId === id);
   if (!r) {
    alert("Report not found for this project");
   } else {
    setReport(r);
   }
  } catch (err) {
   console.error(err);
   alert(err.message || "Error fetching report");
  } finally {
   setLoading(false);
  }
 }

 // ✅ Download PDF plagiarism report
 const downloadReport = () => {
  window.open(`/api/projects/${id}/plag-report`, "_blank");
 };

 // ✅ Get similarity badge color based on percentage
 const getSimilarityColor = (percentage) => {
  if (percentage >= 70) return "bg-red-500 text-white";
  if (percentage >= 40) return "bg-yellow-500 text-white";
  return "bg-green-500 text-white";
 };

 // ✅ Get similarity status icon
 const getSimilarityIcon = (percentage) => {
  if (percentage >= 70) return <AlertTriangle className="h-5 w-5" />;
  if (percentage >= 40) return <TrendingUp className="h-5 w-5" />;
  return <CheckCircle className="h-5 w-5" />;
 };

 // ✅ Loading state
 if (loading) {
  return (
   <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <main className="flex-1 flex items-center justify-center py-20">
     <div className="text-center">
      <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
       <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
      <p className="text-gray-600 font-medium">Loading plagiarism report...</p>
     </div>
    </main>
    <Footer />
   </div>
  );
 }

 // ✅ No report state
 if (!report) {
  return (
   <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <main className="flex-1 flex items-center justify-center py-20">
     <Card className="max-w-md w-full mx-4">
      <CardContent className="pt-6 text-center">
       <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4">
        <FileSearch className="h-8 w-8 text-gray-400" />
       </div>
       <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Report Available
       </h3>
       <p className="text-gray-600">
        The plagiarism report for this project could not be found.
       </p>
      </CardContent>
     </Card>
    </main>
    <Footer />
   </div>
  );
 }

 const similarityPercentage = report.similarityPercentage || 0;
 const matches = report.comparedWith || [];

 return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
   <main className="flex-1">
    {/* Header Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
     <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
     </div>
     <div className="container relative py-12 md:py-16 z-10 px-4">
      <div className="max-w-4xl mx-auto">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0">
         <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
         Plagiarism Report
        </h1>
       </div>
       <p className="text-lg text-white/90 max-w-2xl leading-relaxed mb-6">
        Comprehensive analysis of your project's originality and similarity with
        other submissions.
       </p>

       {/* Overall Similarity Card */}
       <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-6">
         <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
           <div
            className={`p-3 rounded-lg ${getSimilarityColor(
             similarityPercentage
            )}`}>
            {getSimilarityIcon(similarityPercentage)}
           </div>
           <div>
            <p className="text-sm text-gray-600 mb-1">Overall Similarity</p>
            <div className="flex items-center gap-2">
             <span className="text-3xl font-bold text-gray-800">
              {similarityPercentage}%
             </span>
             <Badge
              className={`${getSimilarityColor(
               similarityPercentage
              )} border-0`}>
              {similarityPercentage >= 70
               ? "High Risk"
               : similarityPercentage >= 40
               ? "Medium Risk"
               : "Low Risk"}
             </Badge>
            </div>
           </div>
          </div>
          <Button
           onClick={downloadReport}
           variant="hero"
           className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg">
           <Download className="h-4 w-4 mr-2" />
           Download PDF Report
          </Button>
         </div>
        </CardContent>
       </Card>
      </div>
     </div>
    </section>

    {/* Matches Section */}
    <section className="py-8 bg-gradient-to-b from-white to-blue-50/30">
     <div className="container px-4">
      <div className="max-w-4xl mx-auto">
       <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
         <FileText className="h-6 w-6 text-blue-600" />
         Similarity Matches
        </h2>
        <p className="text-gray-600">
         {matches.length === 0
          ? "No similar content found. Your project appears to be original!"
          : `Found ${matches.length} potential match${
             matches.length > 1 ? "es" : ""
            } with other projects.`}
        </p>
       </div>

       {matches.length === 0 ? (
        <Card className="border-0 shadow-lg bg-white">
         <CardContent className="p-8 text-center">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 mb-4">
           <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
           No Matches Found
          </h3>
          <p className="text-gray-600">
           Great news! Your project shows no significant similarity with other
           submissions.
          </p>
         </CardContent>
        </Card>
       ) : (
        <div className="space-y-4">
         {matches.map((c, idx) => (
          <Card
           key={idx}
           className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
           <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4 flex-wrap">
             <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
               <div
                className={`p-2 rounded-lg ${getSimilarityColor(
                 c.similarity || 0
                )}`}>
                <FileText className="h-4 w-4" />
               </div>
               <div>
                <CardTitle className="text-lg font-bold text-gray-800">
                 Project Match #{idx + 1}
                </CardTitle>
                <p className="text-xs text-gray-500 mt-1">
                 ID: {c.projectId || "Unknown"}
                </p>
               </div>
              </div>
             </div>
             <Badge
              className={`${getSimilarityColor(
               c.similarity || 0
              )} border-0 text-sm px-3 py-1`}>
              {c.similarity || 0}% Similar
             </Badge>
            </div>
           </CardHeader>

           {c.snippets && c.snippets.length > 0 && (
            <CardContent className="pt-0">
             <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
               <AlertTriangle className="h-4 w-4 text-yellow-500" />
               Similar Snippets
              </h4>
              <div className="space-y-2">
               {c.snippets.map((snippet, i) => (
                <div
                 key={i}
                 className="bg-gray-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
                 <p className="text-sm text-gray-700 leading-relaxed">
                  {snippet}
                 </p>
                </div>
               ))}
              </div>
             </div>
            </CardContent>
           )}
          </Card>
         ))}
        </div>
       )}
      </div>
     </div>
    </section>
   </main>

   <Footer />
  </div>
 );
}
