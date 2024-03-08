import React, { useState, useEffect } from 'react';
import { client, imageUrl } from '../../clientaxios/Clientaxios';
import './Blog.css'; // Import custom CSS for Blog component

export default function Blog() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState(0);
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    client.get('/blogs') // Replace with your actual backend endpoint
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', date);
      formData.append('category', category);
      formData.append('author', author);
      formData.append('comments', comments);
      formData.append('content', content);
      formData.append('link', link);
      formData.append('image', imageFile);

      if (editingBlogId) {
        await client.put(`/blogs/${editingBlogId}`, formData);
        setEditingBlogId(null); // Reset editing state
      } else {
        await client.post('/blogs/resize', formData);
      }

      clearForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditBlog = (blogId) => {
    const blogToEdit = blogs.find(blog => blog._id === blogId);
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setDate(blogToEdit.date);
      setCategory(blogToEdit.category);
      setAuthor(blogToEdit.author);
      setComments(blogToEdit.comments);
      setContent(blogToEdit.content);
      setLink(blogToEdit.link);
      setEditingBlogId(blogToEdit._id); // Set the blog ID being edited
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await client.delete(`/blogs/${blogId}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDate('');
    setCategory('');
    setAuthor('');
    setComments(0);
    setContent('');
    setLink('');
    setImageFile(null);
    setEditingBlogId(null);
  };

  return (
    <div className="container mt-4">
      <h4>Blog Admin Panel</h4>
      <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Comments</label>
              <input type="number" className="form-control" value={comments} onChange={(e) => setComments(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea className="form-control" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Link</label>
              <input type="text" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Add Blog</button>
          </form>
      <div className="row mt-4">
        {/* Display blogs */}
        {blogs.map(blog => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card">
              <img src={`${imageUrl}/${blog.imageUrl}`} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.category}</p>
                <p className="card-text">{blog.author}</p>
                <p className="card-text">{blog.content}</p>
                <p className="card-text">{blog.link}</p>
                <p className="card-text">{blog.date}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                <button className="btn btn-primary  " onClick={() => handleEditBlog(blog._id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
