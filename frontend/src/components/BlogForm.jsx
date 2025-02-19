import React from "react";

import { useState } from 'react';
import api from "../api"; // No curly braces for default export


export default function BlogForm({ fetchBlogs }) {
  const [form, setForm] = useState({ title: '', content: '', author: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blogs', form);
      setForm({ title: '', content: '', author: '' });
      fetchBlogs();
    } catch (err) {
      console.error('Error adding blog:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg w-full max-w-lg mx-auto">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border rounded p-2" required />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="w-full border rounded p-2" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full border rounded p-2" required />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Add Blog</button>
    </form>
  );
}