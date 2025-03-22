import React from "react";
import "../css/ProjectTile.css";

const ProjectTile = ({ title, image, code_url, blog_url }) => {
  const backendUrl = "${REACT_APP_API_URL}";
  const imageUrl = image ? `${backendUrl}${image}` : null;

  return (
    <div className="card h-100">
      {imageUrl && (
        <img src={imageUrl} className="card-img-top" alt={title} />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
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
