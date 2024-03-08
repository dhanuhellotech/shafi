import React,{useState,useEffect}from 'react'
import axios from 'axios'

import { client, imageUrl } from '../../clientaxios/Clientaxios'
export default function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', time: '' }]);
  const [editingEntryId, setEditingEntryId] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = () => {
    client.get('/time/getAll')
      .then(response => setTimetable(response.data))
      .catch(error => console.error('Error fetching timetable:', error));
  };

  const handleDelete = async (timetableId) => {
    try {
      const response = await client.delete(`/time/delete/${timetableId}`);
      console.log('Response:', response.data);
      fetchTimetable();
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (editingEntryId) {
        // If editing an entry, send a request to update the existing entry
        const updatedEntry = { day, date, subjects };
        await client.put(`/time/edit/${editingEntryId}`, updatedEntry);
        setEditingEntryId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new entry
        const newEntry = { day, date, subjects };
        await client.post('/time/timetable', newEntry);
      }
      
      clearForm();
      fetchTimetable();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const clearForm = () => {
    setDay('');
    setDate('');
    setSubjects([{ subject: '', time: '' }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject: '', time: '' }]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleEditEntry = (entryId) => {
    const entryToEdit = timetable.find(entry => entry._id === entryId);
    if (entryToEdit) {
      setDay(entryToEdit.day);
      setDate(entryToEdit.date);
      setSubjects(entryToEdit.subjects);
      setEditingEntryId(entryToEdit._id); // Set the entry ID being edited
    }
  };


 
  

  return (
    <div>

    {/*  Header Start */}

    {/*  Header End */}
    <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Timetable Management</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="day" className="form-label">Day</label>
              <select className="form-select" id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input type="text" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            {subjects.map((subject, index) => (
              <div key={index}>
                <div className="mb-3">
                  <label htmlFor={`subject-${index}`} className="form-label">Subject</label>
                  <input type="text" className="form-control" id={`subject-${index}`} value={subject.subject} onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor={`time-${index}`} className="form-label">Time</label>
                  <input type="text" className="form-control" id={`time-${index}`} value={subject.time} onChange={(e) => handleSubjectChange(index, 'time', e.target.value)} />
                </div>
                {index === subjects.length - 1 && (
                  <button type="button" className="btn btn-danger me-2" onClick={addSubject}>Add Subject</button>
                )}
                {index !== 0 && (
                  <button type="button" className="btn btn-danger" onClick={() => removeSubject(index)}>Remove Subject</button>
                )}
              </div>
            ))}
            <div className="mb-3">
              <button type="button" className="btn btn-primary mt-2" onClick={handleFormSubmit}>{editingEntryId ? 'Update Entry' : 'Add Entry'}</button>
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        {timetable.map(entry => (
          <div className="col-md-4" key={entry._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{entry.day}</h5>
                <p className="card-text">{entry.date}</p>
                {entry.subjects.map((subject, index) => (
                  <div key={index}>
                    <p className="card-text">Subject: {subject.subject}</p>
                    <p className="card-text">Time: {subject.time}</p>
                  </div>
                ))}
                <button className="btn btn-danger me-2" onClick={() => handleDelete(entry._id)}>Delete</button>
                &nbsp;     &nbsp;   
                <button className="btn btn-primary" onClick={() => handleEditEntry(entry._id)}>Edit</button>
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

