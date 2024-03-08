import React,{useState,useEffect}from 'react'
import axios from 'axios'

import { client, imageUrl } from '../../clientaxios/Clientaxios'
export default function Class() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gameName, setGameName] = useState('');
  const [price, setPrice] = useState('');
  const [staffName, setStaffName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await client.get('/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gameName', gameName);
      formData.append('price', price);
      formData.append('staffName', staffName);
      formData.append('image', imageFile);

      if (editingClassId) {
        await client.put(`/classes/${editingClassId}`, formData);
        setEditingClassId(null);
      } else {
        await client.post('/classes/resize', formData);
      }

      clearForm();
      fetchClasses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditClass = (classId) => {
    const classToEdit = classes.find(cls => cls._id === classId);
    if (classToEdit) {
      setName(classToEdit.name);
      setAge(classToEdit.age);
      setGameName(classToEdit.gameName);
      setPrice(classToEdit.price);
      setStaffName(classToEdit.staffName);
      setEditingClassId(classToEdit._id);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await client.delete(`/classes/${classId}`);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setAge('');
    setGameName('');
    setPrice('');
    setStaffName('');
    setImageFile(null);
    setEditingClassId(null);
  };



  

  return (
    <div>

    {/*  Header Start */}
 
    {/*  Header End */}
    <div className="container-fluid">
    <div className="container">
      <div className="card" style={{ padding: '20px', margin: '20px 0' }}>
        <h4 className="card-title">Class Admin Panel</h4>
        <form>
          <div className="row">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Age</label>
              <input type="text" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Game Name</label>
              <input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Price</label>
              <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Staff Name</label>
              <input type="text" className="form-control" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange}  />
            </div>
            <div className="col-md-12 mt-4">
              <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Add Class</button>
            </div>
          </div>
        </form>
      </div>

      <h5 style={{ marginTop: '20px' }}>Existing Classes</h5>
      <div className="row">
        {classes.map(cls => (
          <div className="col-md-4" key={cls._id}>
            <div className="card" style={{ padding: '10px', margin: '10px 0' }}>
              <h6>Name: {cls.name}</h6>
              <p>Age: {cls.age}</p>
              <p>Game Name: {cls.gameName}</p>
              <p>Price: {cls.price}</p>
              <p>Staff Name: {cls.staffName}</p>
              <img src={`${imageUrl}/${cls.imageUrl}`} alt={cls.name} style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
              <div style={{ marginTop: '20px' }}>

              <button className="btn btn-danger me-2" onClick={() => handleDeleteClass(cls._id)}>Delete</button>
              <button className="btn btn-primary" onClick={() => handleEditClass(cls._id)}>Edit</button>
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

