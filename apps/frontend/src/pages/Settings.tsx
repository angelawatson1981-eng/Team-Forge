import { useState, useEffect } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [theme, setTheme] = useState("light");
  const [mode, setMode] = useState("developer");

  useEffect(() => {
    setName(localStorage.getItem("tf_name") || "");
    setRole(localStorage.getItem("tf_role") || "");
    setAvatar(localStorage.getItem("tf_avatar") || "");
    setTheme(localStorage.getItem("tf_theme") || "light");
    setMode(localStorage.getItem("tf_mode") || "developer");
  }, []);

  function saveProfile() {
    localStorage.setItem("tf_name", name);
    localStorage.setItem("tf_role", role);
    localStorage.setItem("tf_avatar", avatar);
    alert("Profile updated.");
  }

  function clearLocalData() {
    if (confirm("This will remove all saved data. Continue?")) {
      localStorage.clear();
      alert("Local data cleared.");
      window.location.reload();
    }
  }

function toggleTheme() {
  const next = theme === "light" ? "dark" : "light";
  setTheme(next);
  localStorage.setItem("tf_theme", next);

  // Apply theme immediately
  document.body.setAttribute("data-theme", next);
}

  function toggleMode() {
    const next = mode === "developer" ? "tester" : "developer";
    setMode(next);
    localStorage.setItem("tf_mode", next);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ marginBottom: "2rem" }}>Settings</h1>

      {/* Profile Section */}
      <section
        style={{
          padding: "1.5rem",
          background: "#f7f7fb",
          borderRadius: "12px",
          marginBottom: "2rem",
          maxWidth: "600px",
        }}
      >
        <h2>Edit Profile</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={inputStyle}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Role</option>
          <option>Developer</option>
          <option>Tester</option>
          <option>Designer</option>
          <option>Publisher</option>
          <option>Student</option>
          <option>Hobbyist</option>
        </select>

        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL (optional)"
          style={inputStyle}
        />

        <button onClick={saveProfile} style={buttonPrimary}>
          Save Profile
        </button>
      </section>

      {/* Theme Section */}
      <section
        style={{
          padding: "1.5rem",
          background: "#ffffff",
          borderRadius: "12px",
          marginBottom: "2rem",
          maxWidth: "600px",
          border: "1px solid #e0e0e0",
        }}
      >
        <h2>Theme</h2>
        <button onClick={toggleTheme} style={buttonSecondary}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </section>

      {/* Mode Section */}
      <section
        style={{
          padding: "1.5rem",
          background: "#ffffff",
          borderRadius: "12px",
          marginBottom: "2rem",
          maxWidth: "600px",
          border: "1px solid #e0e0e0",
        }}
      >
        <h2>Mode</h2>
        <button onClick={toggleMode} style={buttonSecondary}>
          Switch to {mode === "developer" ? "Tester" : "Developer"} Mode
        </button>
      </section>

      {/* Clear Data */}
      <section
        style={{
          padding: "1.5rem",
          background: "#ffecec",
          borderRadius: "12px",
          maxWidth: "600px",
          border: "1px solid #ffb3b3",
        }}
      >
        <h2>Danger Zone</h2>
        <button
          onClick={clearLocalData}
          style={{
            ...buttonPrimary,
            background: "#d9534f",
          }}
        >
          Clear Local Data
        </button>
      </section>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonPrimary = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  background: "#4a6cf7",
  color: "white",
  cursor: "pointer",
};

const buttonSecondary = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
};