import React from "react";
import { createRoot } from "react-dom/client";
import { CareerDashboard } from "../app/career-dashboard";
import "../app/globals.css";
import "../app/linkedin.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CareerDashboard />
  </React.StrictMode>,
);
