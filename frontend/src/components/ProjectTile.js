import React from "react";
import "../css/ProjectTile.css";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const ProjectTile = ({ title, image, code_url, blog_url, embed_url }) => {
  const backendUrl = `${apiBaseUrl}`;
  const imageUrl = image ? `${backendUrl}${image}` : null;

  return (
    <div className="card h-100">
      {/* Thumbnail (optional) */}
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={title} />}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        {/* Embedded Power BI Dashboard */}
        {embed_url && (
          <div className="mb-3">
            <iframe
              title={title}
              width="100%"
              height="300"
              src={embed_url}
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          </div>
        )}

        {/* Action buttons */}
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
