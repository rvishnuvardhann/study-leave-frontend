import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyLeave() {
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    tid: '',
    fid: '',
    name: '',
    designation: '',
    department: '',
    startDate: '',
    endDate: '',
  });

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/study-leave/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching study leave applications:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/study-leave/apply', formData);
      setFormData({
        tid: '',
        fid: '',
        name: '',
        designation: '',
        department: '',
        startDate: '',
        endDate: '',
      });
      fetchApplications();
    } catch (error) {
      console.error('Error submitting study leave application:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Study Leave Applications</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for study leave application */}
        <div>
          <label htmlFor="tid">Teacher ID:</label>
          <input
            type="text"
            id="tid"
            name="tid"
            value={formData.tid}
            onChange={(e) => setFormData({ ...formData, tid: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="fid">Faculty ID:</label>
          <input
            type="text"
            id="fid"
            name="fid"
            value={formData.fid}
            onChange={(e) => setFormData({ ...formData, fid: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
      <div>
        <h2>Applications</h2>
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              {/* Display application details */}
              <p>Teacher ID: {application.tid}</p>
              <p>Faculty ID: {application.fid}</p>
              <p>Name: {application.name}</p>
              <p>Designation: {application.designation}</p>
              <p>Department: {application.department}</p>
              <p>Start Date: {application.startDate}</p>
              <p>End Date: {application.endDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudyLeave;
