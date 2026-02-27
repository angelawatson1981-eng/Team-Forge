export default function Dashboard() {
  const name = localStorage.getItem("tf_name");
  const role = localStorage.getItem("tf_role");
  const hasProfile = name && role;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#f4f5f9",
          padding: "1.5rem",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Team‑Forge</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="/dashboard" style={{ textDecoration: "none", color: "#333" }}>
            Dashboard
          </a>

          <a href="/projects" style={{ textDecoration: "none", color: "#333" }}>
            Projects
          </a>

          <a href="/community" style={{ textDecoration: "none", color: "#333" }}>
            Community
          </a>

          <a href="/profile" style={{ textDecoration: "none", color: "#333" }}>
            Profile
          </a>

          <a href="/settings" style={{ textDecoration: "none", color: "#333" }}>
            Settings
          </a>
        </nav>
      </div>

      {/* Main Workspace Area */}
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>

        {/* My Projects Dropdown */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <select
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              background: "white",
              cursor: "pointer",
            }}
            onChange={(e) => {
              if (e.target.value === "new") {
                window.location.href = "/projects/new";
              }
              if (e.target.value === "list") {
                window.location.href = "/projects";
              }
            }}
          >
            <option value="">My Projects</option>
            <option value="new">New Project</option>
            <option value="list">View Existing Projects</option>
          </select>
        </div>

        {/* Greeting */}
        {hasProfile ? (
          <>
            <h1 style={{ marginBottom: "0.5rem" }}>Welcome, {name}</h1>
            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>Role: {role}</p>
          </>
        ) : (
          <>
            <h1 style={{ marginBottom: "0.5rem" }}>Welcome to Team‑Forge</h1>
            <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
              You can complete your profile anytime.
            </p>
          </>
        )}

        {/* Get Started Section */}
        <div
          style={{
            padding: "1.5rem",
            background: "#f7f7fb",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: "600px",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Get Started</h2>
          <ul style={{ lineHeight: "1.8" }}>
            <li>Create your first project</li>
            <li>Explore the workspace</li>
            <li>View the tutorial</li>
            {!hasProfile && <li>Complete your profile</li>}
          </ul>
        </div>

        {/* Projects Placeholder */}
        <div
          style={{
            padding: "1.5rem",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            maxWidth: "600px",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Your Projects</h2>
          <p style={{ opacity: 0.8 }}>You don’t have any projects yet.</p>
        </div>

      </div>
    </div>
  );
}