import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleCreate() {
    if (!name.trim()) {
      alert("Please enter a project name.");
      return;
    }

    // Save project to localStorage for now
    const existing = JSON.parse(localStorage.getItem("tf_projects") || "[]");

    const newProject = {
      id: Date.now(),
      name,
      description,
    };

    localStorage.setItem("tf_projects", JSON.stringify([...existing, newProject]));

    navigate("/projects");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif", color: "#333" }}>
      <h1 style={{ marginBottom: "1rem" }}>Create New Project</h1>

      <div style={{ maxWidth: "500px" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Project Name</label>
        <input
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
        />

        <label style={{ display: "block", marginBottom: "0.5rem" }}>Description</label>
        <textarea
          style={{
            width: "100%",
            padding: "0.75rem",
            height: "120px",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />

        <button
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#4a6cf7",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "1rem",
          }}
          onClick={handleCreate}
        >
          Create Project
        </button>

        <button
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}