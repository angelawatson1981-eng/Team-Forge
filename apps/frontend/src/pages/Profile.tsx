import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("tf_name") || "");
    setRole(localStorage.getItem("tf_role") || "");
    setAvatar(localStorage.getItem("tf_avatar") || "");
  }, []);

  function saveProfile() {
    localStorage.setItem("tf_name", name);
    localStorage.setItem("tf_role", role);
    localStorage.setItem("tf_avatar", avatar);
    alert("Profile saved!");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Your Profile</h1>

      <div
        style={{
          padding: "1.5rem",
          background: "#f7f7fb",
          borderRadius: "12px",
          maxWidth: "500px",
        }}
      >
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Role</option>
          <option>Developer</option>
          <option>Tester</option>
          <option>Designer</option>
          <option>Publisher</option>
          <option>Student</option>
          <option>Hobbyist</option>
        </select>

        <label>Avatar URL (optional)</label>
        <input
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.png"
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={saveProfile}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            background: "#4a6cf7",
            color: "white",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}