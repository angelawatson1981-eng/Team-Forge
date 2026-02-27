import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        fontFamily: "Inter, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        How would you like to begin?
      </h2>

      <button
        style={{
          padding: "0.75rem 1.5rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          background: "#4a6cf7",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => navigate("/tutorial")}
      >
        Start Tutorial
      </button>

      <button
        style={{
          padding: "0.75rem 1.5rem",
          marginBottom: "1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #4a6cf7",
          background: "white",
          color: "#4a6cf7",
          cursor: "pointer",
        }}
        onClick={() => navigate("/profile")}
      >
        Create Your Profile
      </button>

      <button
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.9rem",
          borderRadius: "8px",
          border: "none",
          background: "transparent",
          color: "#777",
          cursor: "pointer",
          marginTop: "0.5rem",
          textDecoration: "underline",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Skip for now
      </button>
    </div>
  );
}