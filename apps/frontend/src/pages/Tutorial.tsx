import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1>Create Your Profile</h1>
      <p>Let’s set up who you are in Team‑Forge.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <label>Name</label>
        <input
          style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={{ marginTop: "1rem", display: "block" }}>Role</label>
        <input
          style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem" }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
    </div>
  );
}