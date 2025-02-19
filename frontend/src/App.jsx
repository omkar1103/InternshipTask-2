import React from "react";

import { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import api from "./api"; // No curly braces for default export
import './App.css';
import "./index.css"; // Ensure Tailwind is properly imported

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/blogs');
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">📖 Blog Application</h1>
      <BlogForm fetchBlogs={fetchBlogs} />
      <BlogList />
    </div>
  );
}