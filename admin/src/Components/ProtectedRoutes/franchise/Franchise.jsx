import React,{useState,useEffect}from 'react'
import axios from 'axios'

import { client } from '../../clientaxios/Clientaxios'
export default function Franchise() {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/franschise');
        console.log('Response from backend:', response.data);

        // Assuming the data structure is { franchises: [...] }
        const franschises = response.data.franschise || [];
        setFormDataList(franschises);
      } catch (error) {
        console.error('Error fetching form data:', error);

        if (error.response && error.response.data && error.response.data.error) {
          console.error('Server Error:', error.response.data.error);
        } else {
          console.error('Error fetching data. Please try again.');
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to your backend endpoint to delete the franchise with the specified id
      await client.delete(`/franschise/${id}`);

      // Update the state after successful deletion
      setFormDataList((prevData) => prevData.filter((franschise) => franschise._id !== id));
    } catch (error) {
      console.error('Error deleting franchise:', error);
    }
  }; 
 
  

  return (
    <div>

    {/*  Header Start */}
   
    {/*  Header End */}
    <div className="container-fluid">
    <div className="container mt-4">
      <h2>Franchise Data</h2>
      {formDataList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>State</th>
              <th>City</th>
        
              <th>Investment</th>
              <th>Yes/No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formDataList.map((formData) => (
              <tr key={formData._id}>
                <td>{formData.username}</td>
                <td>{formData.email}</td>
                <td>{formData.mobile}</td>
                <td>{formData.state}</td>
                <td>{formData.City}</td>
             
                <td>{formData.investment}</td>
                <td>{formData.yesOrNo}</td>
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

