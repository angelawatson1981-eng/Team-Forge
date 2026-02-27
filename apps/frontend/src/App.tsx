import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Tutorial from "./pages/Tutorial";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard"; // ← this was missing
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Community from "./pages/Community";






export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/projects/new" element={<NewProject />} />
     <Route path="/projects/:id" element={<ProjectDetails />} />
     <Route path="/projects/:id" element={<ProjectDetails />} />
     <Route path="/projects/:id" element={<ProjectDetails />} />
<Route path="/profile" element={<Profile />} />
<Route path="/community" element={<Community />} />


    </Routes>
  );
}