import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f7fb",
      fontFamily: "Inter, sans-serif",
      color: "#333",
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Welcome to Team‑Forge
      </h1>

      <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: "2rem" }}>
        Your calm, structured developer workspace starts here.
      </p>

      <button
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          background: "#4a6cf7",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/onboarding")}
      >
        Enter Platform
      </button>
    </div>
  );
}