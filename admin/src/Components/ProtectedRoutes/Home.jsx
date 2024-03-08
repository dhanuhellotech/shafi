import { Grid,} from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './home.css'

import { client } from '../clientaxios/Clientaxios';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [formDataList, setFormDataList] = useState([]);

  const handleDelete = async (id) => {
    try {
      await client.delete(`/Addmission/${id}`);
      setFormDataList((prevData) => prevData.filter(formData => formData._id !== id));
    } catch (error) {
      console.error('Error deleting form data:', error);
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Server Error:', error.response.data.error);
      } else {
        console.error('Error deleting data. Please try again.');
      }
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(getGreeting(currentHour));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/Addmission');
        console.log('Response from backend:', response.data);

        const admissions = response.data.admissions || [];
        setFormDataList(admissions);
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

  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) {
      return 'Good Morning Admin';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon Admin';
    } else {
      return 'Good Evening Admin';
    }
  };

  return (
<>
      <Grid item xs={6} />
      <div className="">
        {/*  Row 1 */}
        <Container fluid>
          <Row>
            <Col xs={12}>
              <h1>{greeting}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div className="container-fluid">
                <div className="container">
                  <h2>Admission Data</h2>
                  {formDataList.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="table-header">Parent Name</th>
                          <th className="table-header">Child Name</th>
                          <th className="table-header">DOB</th>
                          <th className="table-header">Gender</th>
                          <th className="table-header">Current School</th>
                          <th className="table-header">Grade Applying For</th>
                          <th className="table-header">Preferred Start Date</th>
                          <th className="table-header">Questions/Comments</th>
                          <th className="table-header">How Did You Hear About Us</th>
                          <th className="table-header">Address</th>
                          <th className="table-header">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formDataList.map((formData) => (
                          <tr key={formData._id}>
                            <td>{`${formData.parentFirstName} ${formData.parentLastName}`}</td>
                            <td>{`${formData.childFirstName} ${formData.childLastName}`}</td>
                            <td>{`${formData.dateOfBirth.split('T')[0]}`}</td>
                            <td>{`${formData.gender}`}</td>
                            <td>{`${formData.currentSchool}`}</td>
                            <td>{`${formData.gradeApplyingFor}`}</td>
                            <td>{`${formData.preferredStartDate.split('T')[0]}`}</td>
                            <td>{`${formData.questionsComments}`}</td>
                            <td>{`${formData.howDidYouHearAboutUs}`}</td>
                            <td>{`${formData.address}`}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                style={{ backgroundColor: '#FF8F6C', color: 'white' }}
                                onClick={() => handleDelete(formData._id)}
                              >
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
            </Col>
          </Row>
        </Container>
      </div>
      </>
   
  );
};

export default Home;
