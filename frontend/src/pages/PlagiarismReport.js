/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
   const res = await fetch("http://127.0.0.1:5000/api/reports");
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

 if (loading) return <div>Loading...</div>;
 if (!report) return <div>No report available</div>;

 return (
  <div className="bg-white p-4 rounded shadow max-w-3xl mx-auto">
   <h2 className="text-2xl font-semibold mb-4">Plagiarism Report</h2>
   <div className="mb-2">
    <strong>Overall similarity:</strong> {report.similarityPercentage}%
   </div>
   <div>
    {report.comparedWith.map((c, idx) => (
     <div key={idx} className="border p-2 my-2 rounded">
      <div>
       <strong>Project ID:</strong> {c.projectId}
      </div>
      <div>
       <strong>Similarity:</strong> {c.similarity}%
      </div>
      <div>
       <strong>Snippets:</strong>
       <ul className="list-disc pl-5">
        {(c.snippets || []).map((s, i) => (
         <li key={i} className="text-sm">
          {s}
         </li>
        ))}
       </ul>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}
