import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import './Address.css'; // Import custom CSS for Address component

export default function Address() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/api/addresses/${id}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData({
      email: address.email,
      phone: address.phone,
      address: address.address,
    });
    setEditFormData({
      ...formData,
      id: address._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editFormData) {
        const updatedFormData = {
          email: formData.email || editFormData.email,
          phone: formData.phone || editFormData.phone,
          address: formData.address || editFormData.address,
          id: editFormData.id,
        };

        const response = await client.put(`/api/addresses/${updatedFormData.id}`, updatedFormData);
        console.log('Address updated:', response.data);
      } else {
        const response = await client.post('/api/addresses', formData);
        console.log('Address created:', response.data);
      }

      setFormData({ email: '', phone: '', address: '' });
      setEditFormData(null);
      fetchAddresses();
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await client.get('/api/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Admin Panel - Add Address</h3>
                <form onSubmit={handleSubmit} className="requires-validation" noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary custom-btn">Add Address</button>
                  </div>
                </form>
                <div className="mt-4">
                  <h4>Display Addresses</h4>
                  <ul className="list-unstyled">
                    {addresses.map((address) => (
                      <li key={address._id} className="mb-3">
                        <strong>Email:</strong> {address.email}, <strong>Phone:</strong> {address.phone}, <strong>Address:</strong> {address.address}
                        <button className="btn btn-primary  mt-2 " onClick={() => handleEdit(address)}>Edit</button>
                        &nbsp;     &nbsp;    
                         <button className="btn btn-primary mt-2 " onClick={() => handleDelete(address._id)}>Delete</button>

                      </li>
                      
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
