import React from "react";
import "../css/ProjectTile.css";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const ProjectTile = ({ title, embed_url, code_url, blog_url }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        {/* Render iframe instead of image */}
        {embed_url && (
          <div className="mb-3">
            <iframe
              title={title}
              width="100%"
              height="300"
              src={embed_url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="d-flex justify-content-between">
          {code_url && (
            <a
              href={code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Code
            </a>
          )}
          {blog_url && (
            <a
              href={blog_url}
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
  );
};

export default ProjectTile;
