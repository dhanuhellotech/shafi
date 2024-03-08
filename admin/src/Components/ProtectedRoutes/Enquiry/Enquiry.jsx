import React,{useState,useEffect}from 'react'
import axios from 'axios'

import { client } from '../../clientaxios/Clientaxios'
export default function Enquiry() {
  const [formDataList, setFormDataList] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await client.get('/enquiry');
      console.log('Response from backend:', response.data);

      // Assuming the data structure is { enquiry: [...] }
  
      setFormDataList(response.data.contacts); // <-- Here's the issue
    } catch (error) {
      console.error('Error fetching form data:', error);
      // Error handling
    }
  };

  fetchData();
}, []);
 
  
  
  
  // Empty dependency array ensures useEffect runs only once, similar to componentDidMount
  
  
  
  
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to your backend API to delete the entry with the specified id
      await client.delete(`/enquiry/${id}`);

      // Update the state to reflect the changes
      setFormDataList((prevData) => prevData.filter((formData) => formData._id !== id));
    } catch (error) {
      console.error('Error deleting form data:', error);
    }
  };


  

  return (
    <div>

    {/*  Header Start */}
  
    {/*  Header End */}
    <div className="container-fluid">
    <div className="container mt-4">
      <h2>Enquiry Data</h2>
      {formDataList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>State</th>
              <th>Childname</th>
              <th>ChildGrade</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formDataList.map((formData) => (
              <tr key={formData._id}>
                <td>{formData.username}</td>
                <td>{formData.email}</td>
                <td>{formData.mobile}</td>
                <td>{formData.Address}</td>
                <td>{formData.state}</td>
                <td>{formData.childname}</td>
                <td>{formData.childgrade}</td>
                <td>{formData.message}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(formData._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>

</div>
  </div>

  )
}

