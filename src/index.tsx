// Minimal entry used by Vite/Storybook when previewing components.
// Not a full app — Storybook renders components directly.
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

const App = () => {
  return <div>Timeline Component - Run Storybook to view components</div>;
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(<App />);
}

