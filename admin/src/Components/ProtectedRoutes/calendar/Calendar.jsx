import React,{useState,useEffect}from 'react'
import axios from 'axios'



import { client, imageUrl } from '../../clientaxios/Clientaxios'
export default function Calendar() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('Event');
  const [description, setDescription] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null); // Added state for editing event ID

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const fetchCalendarEvents = () => {
    client.get('/calendar')
      .then(response => setCalendarEvents(response.data))
      .catch(error => console.error('Error fetching calendar events:', error));
  };

  const handleFormSubmit = async () => {
    try {
      if (editingEventId) {
        // If editing, send a request to update the existing event
        await client.put(`/calendar/${editingEventId}`, {
          title,
          date,
          eventType,
          description,
        });
        setEditingEventId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new event
        await client.post('/calendar', {
          title,
          date,
          eventType,
          description,
        });
      }

      clearForm();
      fetchCalendarEvents();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await client.delete(`/calendar/${id}`);
      fetchCalendarEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (id) => {
    // Find the event to edit from the calendarEvents array
    const eventToEdit = calendarEvents.find(event => event._id === id);
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setEventType(eventToEdit.eventType);
      setDescription(eventToEdit.description);
      setEditingEventId(eventToEdit._id); // Set the ID of the event being edited
    }
  };

  const clearForm = () => {
    setTitle('');
    setDate('');
    setEventType('Event');
    setDescription('');
    setEditingEventId(null);
  };


 
  

  return (
    <div>

    {/*  Header Start */}
    
    {/*  Header End */}
    <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4>Create or Edit Calendar Event</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Type</label>
              <select className="form-select" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="Event">Event</option>
                <option value="Important Day">Important Day</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
              {editingEventId ? 'Update Event' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        {calendarEvents.map(event => (
          <div className="col-md-4" key={event._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="card-text">Event Type: {event.eventType}</p>
                <p className="card-text">Description: {event.description}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                <button className="btn btn-primary" onClick={() => handleEditEvent(event._id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
</div>
  </div>

  )
}

