import React from "react";

import api from "../api"; // No curly braces for default export

export default function BlogCard({ blog, fetchBlogs }) {
  const handleDelete = async () => {
    try {
      await api.delete(`/blogs/${blog.id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-700 mb-2">{blog.content}</p>
      <p className="text-sm text-gray-500">Author: {blog.author}</p>
      <button onClick={handleDelete} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">Delete</button>
    </div>
  );
}