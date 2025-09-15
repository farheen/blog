import React from "react";
import ProjectTile from "./ProjectTile";

const projects = [
  {
    title: "📊 Sales Forecasting Dashboard",
    embed_url: "https://app.powerbi.com/view?r=XXXXX",
    code_url: "https://github.com/your-repo/sales-forecasting",
    blog_url: "/blog/sales-forecasting"
  },
  {
    title: "📉 Customer Churn Analysis",
    embed_url: "https://app.powerbi.com/view?r=XXXXX",
    code_url: "https://github.com/your-repo/customer-churn",
    blog_url: "/blog/customer-churn"
  },
  {
    title: "🏥 Hospital Readmission Analytics",
    embed_url: "https://app.powerbi.com/view?r=XXXXX",
    code_url: "https://github.com/your-repo/hospital-readmission",
    blog_url: "/blog/hospital-readmission"
  },
  {
    title: "📦 Supply Chain Monitoring",
    embed_url: "https://app.powerbi.com/view?r=XXXXX",
    code_url: "https://github.com/your-repo/supply-chain",
    blog_url: "/blog/supply-chain"
  },
  {
    title: "🌍 ESG Impact Tracker",
    embed_url: "https://app.powerbi.com/view?r=XXXXX",
    code_url: "https://github.com/your-repo/esg-impact",
    blog_url: "/blog/esg-impact"
  }
];

export default function ProjectsPage() {
  return (
    <div className="row p-4">
      {projects.map((proj, idx) => (
        <div key={idx} className="col-md-6 mb-4">
          <ProjectTile {...proj} />
        </div>
      ))}
    </div>
  );
}
