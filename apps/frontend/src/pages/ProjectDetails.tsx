import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tab, setTab] = useState("overview");
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tf_projects") || "[]");
    const found = saved.find((p) => p.id === Number(id));
    setProject(found);
  }, [id]);

  function saveProject(updated) {
    const all = JSON.parse(localStorage.getItem("tf_projects") || "[]");
    const newList = all.map((p) => (p.id === updated.id ? updated : p));
    localStorage.setItem("tf_projects", JSON.stringify(newList));
    setProject(updated);
  }

  function addTask() {
    if (!taskInput.trim()) return;

    const updated = {
      ...project,
      tasks: [
        ...(project.tasks || []),
        { id: Date.now(), text: taskInput, done: false },
      ],
    };

    saveProject(updated);
    setTaskInput("");
  }

  function toggleTask(taskId) {
    const updated = {
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      ),
    };

    saveProject(updated);
  }

  if (!project) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif", color: "#333" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>{project.name}</h1>
      <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
        {project.description || "No description provided."}
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {["overview", "tasks", "milestones", "devlogs"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: tab === t ? "2px solid #4a6cf7" : "1px solid #ccc",
              background: tab === t ? "#eef1ff" : "white",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div
          style={{
            padding: "1.5rem",
            background: "#f7f7fb",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: "600px",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Overview</h2>
          <p style={{ opacity: 0.8 }}>
            This is your project workspace. You can add tasks, milestones, devlogs, and more.
          </p>
        </div>
      )}

      {/* Tasks */}
      {tab === "tasks" && (
        <div style={{ maxWidth: "600px" }}>
          <h2 style={{ marginBottom: "1rem" }}>Tasks</h2>

          {/* Add Task */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="New task..."
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: "#4a6cf7",
                color: "white",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {(project.tasks || []).map((task) => (
              <label
                key={task.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  background: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      {tab === "milestones" && (
        <p style={{ opacity: 0.8 }}>Milestones will go here.</p>
      )}

      {/* Devlogs */}
      {tab === "devlogs" && (
        <p style={{ opacity: 0.8 }}>Devlogs will go here.</p>
      )}
    </div>
  );
}