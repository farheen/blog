import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "../css/ProjectTile.css";

const apiBaseUrl = process.env.REACT_APP_API_URL;

const ProjectTile = ({ title, image, description, embed_url, code_url, blog_url }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // The first paragraph is the summary; the rest is shown on "Read more"
  const [summary, ...rest] = (description || "").trim().split(/\r?\n\s*\r?\n/);
  const hasMore = rest.length > 0;

  return (
    <div className="card h-100 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
      {/* Render iframe if there's an embed, otherwise the project image */}
      {!embed_url && image && !imageFailed && (
        <img
          src={`${apiBaseUrl}${image}`}
          alt={title}
          className="card-img-top"
          style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>

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

        {description && (
          <div className="project-description text-secondary mb-3">
            <ReactMarkdown>{expanded ? description : summary}</ReactMarkdown>
            {hasMore && (
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between mt-auto">
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
