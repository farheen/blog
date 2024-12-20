import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Ensure App.js exists and is correctly configured

// Get the root DOM element
const container = document.getElementById("root");

// Create a React root and render the application
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
