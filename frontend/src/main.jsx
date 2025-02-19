import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";
import BlogList from "./components/BlogList";
import "./index.css"; // Tailwind CSS import

const root = createRoot(document.getElementById("root"));
root.render(
  <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Blog App</h1>
    <BlogList />
  </div>
);
