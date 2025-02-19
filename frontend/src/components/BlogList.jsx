// BlogList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css"; // Ensure this file exists or remove if unused

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Use the correct URL mapping for your Spring Boot controller
      const response = await axios.get("http://localhost:8080/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error?.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        // Update the blog post
        await axios.put(`http://localhost:8080/blogs/${editId}`, formData);
      } else {
        // Add a new blog post
        await axios.post("http://localhost:8080/blogs", formData);
      }
      setFormData({ title: "", content: "", author: "" });
      setIsEditing(false);
      setEditId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error?.response?.data || error.message);
    }
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content, author: blog.author });
    setIsEditing(true);
    setEditId(blog.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8080/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error?.response?.data || error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Blog App</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Blog" : "Add New Blog"}
        </h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="w-full p-2 border rounded-lg mb-4"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full p-2 border rounded-lg mb-4"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          required
          className="w-full p-2 border rounded-lg mb-4 h-32"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {isEditing ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <h2 className="text-3xl font-bold text-center mb-6">Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .slice()
            .reverse() // Show most recent blogs first
            .map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
                <p className="text-gray-700 mb-4">{blog.content}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-400 text-white py-1 px-4 rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
