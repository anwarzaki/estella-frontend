import React from "react";
import ReactDOM from "react-dom/client";  // Import from react-dom/client for React 18
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
