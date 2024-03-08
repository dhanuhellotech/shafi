import React,{useState,useEffect}from 'react'
import axios from 'axios'

import { client, imageUrl } from '../../clientaxios/Clientaxios'
export default function Teacher() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [hobby, setHobby] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [degree, setDegree] = useState('');
  const [teachingGoal, setTeachingGoal] = useState('');
  const [position, setPosition] = useState('');
  const [homeTown, setHomeTown] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = () => {
    client.get('/teachers') // Replace with your actual backend endpoint
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teachers:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('hobby', hobby);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('degree', degree);
      formData.append('teachingGoal', teachingGoal);
      formData.append('position', position);
      formData.append('homeTown', homeTown);
      formData.append('image', imageFile);
  
      if (editingTeacherId) {
        // If editing, send a request to update the existing teacher
        await client.put(`/teachers/${editingTeacherId}`, formData);
        setEditingTeacherId(null); // Reset editing state
      } else {
        // If not editing, send a request to create a new teacher
        await client.post('/teachers/resize', formData);
      }
  
      clearForm();
      fetchTeachers();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const handleEditTeacher = (teacherId) => {
    const teacherToEdit = teachers.find(teacher => teacher._id === teacherId);
    if (teacherToEdit) {
      setName(teacherToEdit.name);
      setAbout(teacherToEdit.about);
      setHobby(teacherToEdit.hobby);
      setDateOfBirth(teacherToEdit.dateOfBirth);
      setDegree(teacherToEdit.degree);
      setTeachingGoal(teacherToEdit.teachingGoal);
      setPosition(teacherToEdit.position);
      setHomeTown(teacherToEdit.homeTown);
      setEditingTeacherId(teacherToEdit._id); // Set the teacher ID being edited
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await client.delete(`/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setAbout('');
    setHobby('');
    setDateOfBirth('');
    setDegree('');
    setTeachingGoal('');
    setPosition('');
    setHomeTown('');
    setImageFile(null);
    setEditingTeacherId(null);
  };


  

  return (
    <div>

    {/*  Header Start */}
  
    {/*  Header End */}
    <div className="container-fluid">
    <div className="container">
      <div className="card" style={{ padding: '20px', margin: '20px 0' }}>
        <h4 className="card-title">Teacher Admin Panel</h4>
        <form method="post" action="/your-upload-endpoint" encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>About</label>
              <input type="text" className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Hobby</label>
              <input type="text" className="form-control" value={hobby} onChange={(e) => setHobby(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Date of Birth</label>
              <input type="date" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Position</label>
              <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Home Town</label>
              <input type="text" className="form-control" value={homeTown} onChange={(e) => setHomeTown(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Degree</label>
              <input type="text" className="form-control" value={degree} onChange={(e) => setDegree(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Teaching Goal</label>
              <input type="text" className="form-control" value={teachingGoal} onChange={(e) => setTeachingGoal(e.target.value)} />
            </div>
            <div className="col-md-12 mt-3">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="col-md-12 mt-3">
              <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>{editingTeacherId ? 'Update Teacher' : 'Add Teacher'}</button>
            </div>
          </div>
        </form>
      </div>
      {/* Display existing teachers */}
      <h5 style={{ marginTop: '20px' }}>Existing Teachers</h5>
      <div className="row">
  {teachers.map(teacher => (
    <div className="col-md-4" key={teacher._id}>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Name: {teacher.name}</h5>
          <p className="card-text">About: {teacher.about}</p>
          <p className="card-text">Hobby: {teacher.hobby}</p>
          <p className="card-text">Date of Birth: {teacher.dateOfBirth}</p>
          <p className="card-text">Degree: {teacher.degree}</p>
          <p className="card-text">Position: {teacher.position}</p>
          <p className="card-text">Home Town: {teacher.homeTown}</p>
          <p className="card-text">Teaching Goal: {teacher.teachingGoal}</p>
          <img src={`${imageUrl}/${teacher.imageUrl}`} alt={teacher.name} className="card-img-top" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
          <div>
            <button className="btn btn-danger me-2" onClick={() => handleDeleteTeacher(teacher._id)}>Delete</button>
            <button className="btn btn-primary" onClick={() => handleEditTeacher(teacher._id)}>Edit</button>
          </div>
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

