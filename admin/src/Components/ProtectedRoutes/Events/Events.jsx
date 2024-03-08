import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { client,imageUrl } from '../../clientaxios/Clientaxios';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    client.get('/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await client.delete(`/events/${eventId}`);
      console.log('Response:', response.data);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', imageFile);
      formData.append('category', selectedCategory);
  
      const response = await client.post('/events/resize', formData);
  
      console.log('Response:', response.data);
  
      clearForm();
      fetchEvents();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImageFile(null);
    setSelectedCategory('');
  };

  return (
    <div>

     
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mt-4">
                <h2>Admin Events</h2>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <select
                        className="form-control"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="" disabled>Select a Category</option>
                        <option value="ANNUAL_DAY">Annual Day</option>
                        <option value="SPORTS_DAY">Sports Day</option>
                        <option value="REPUBLIC_DAY">Republic Day</option>
                        <option value="CHILDRENS_DAY">Children's Day</option>
                        <option value="TEACHERS_DAY">Teachers Day</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleFormSubmit}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-12 mt-4">
                <h3>Events</h3>
                <div className="row">
                  {events.map(event => (
                    <div className="col-md-4" key={event._id}>
                      <div className="card mb-3">
                        <img
                          src={event.imageUrl}
                          className="card-img-top"
                          alt={event.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{event.title}</h5>
                          <p className="card-text">{event.category}</p>
                          <p className="card-text">{event.description}</p>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default Events;
