import React from "react";
import "../css/ProjectTile.css";

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

export default function Projects() {
  return (
    <div className="row p-4">
      {projects.map((proj, idx) => (
        <div key={idx} className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{proj.title}</h5>

              {/* Embedded Power BI */}
              {proj.embed_url && (
                <div className="mb-3">
                  <iframe
                    title={proj.title}
                    width="100%"
                    height="300"
                    src={proj.embed_url}
                    frameBorder="0"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              )}

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                {proj.code_url && (
                  <a
                    href={proj.code_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Code
                  </a>
                )}
                {proj.blog_url && (
                  <a
                    href={proj.blog_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Blog
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
