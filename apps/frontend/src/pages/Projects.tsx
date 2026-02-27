import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tf_projects") || "[]");
    setProjects(saved);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif", color: "#333" }}>
      <h1 style={{ marginBottom: "1rem" }}>Your Projects</h1>

      <button
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          background: "#4a6cf7",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
        onClick={() => navigate("/projects/new")}
      >
        New Project
      </button>

      {projects.length === 0 ? (
        <p style={{ opacity: 0.8 }}>You don’t have any projects yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{
                padding: "1.5rem",
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                maxWidth: "600px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <h2 style={{ marginBottom: "0.5rem" }}>{project.name}</h2>
              <p style={{ opacity: 0.8 }}>
                {project.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}