import React, { useEffect, useState } from "react";
import ProjectTile from "./ProjectTile";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Data Science Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-6 mb-4" key={project.id}>
            <ProjectTile
              title={project.title}
              image={project.image}
              code_url={project.code_url}
              blog_url={project.blog_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
