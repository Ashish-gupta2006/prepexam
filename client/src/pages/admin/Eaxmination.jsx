// import React from 'react'

// const Eaxmination = () => {

//   return (
//     <div className="form-wrapper">
//       <h2>Examination</h2>
//       <hr />
//       <form>
//         <div className="row g-3">
//           {/* Examinee Name */}
//           <div className="col-md-6">
//             <label className="form-label">Examinee Name</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-user"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter examinee name"
//                 name="name"
//                 autoComplete="name"
//                 required
//               />
//             </div>
//           </div>

//           {/* Subject */}
//           <div className="col-md-6">
//             <label className="form-label">Subject</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-book-open"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter subject"
//                 name="subject"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Duration */}
//           <div className="col-md-6">
//             <label className="form-label">Duration</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-hourglass-half"></i>
//               </span>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter duration (minutes)"
//                 name="duration"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Date */}
//           <div className="col-md-6">
//             <label className="form-label">Date</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-calendar-alt"></i>
//               </span>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="date"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Starting time */}
//           <div className="col-md-6">
//             <label className="form-label">Starting Time</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-clock"></i>
//               </span>
//               <input
//                 type="time"
//                 className="form-control"
//                 name="startingTime"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Passing Marks */}
//           <div className="col-md-6">
//             <label className="form-label">Passing Marks</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-check-circle"></i>
//               </span>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter passing marks"
//                 name="passingMarks"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Total Marks */}
//           <div className="col-md-6">
//             <label className="form-label">Total Marks</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-sort-numeric-up"></i>
//               </span>
//               <input
//                 type="number"
//                 className="form-control"
//                 placeholder="Enter total marks"
//                 name="totalMarks"
//                 autoComplete="off"
//                 required
//               />
//             </div>
//           </div>

//           {/* Status */}
//           <div className="col-md-6">
//             <label className="form-label">Status</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i className="fas fa-toggle-on"></i>
//               </span>
//               <select
//                 name="status"
//                 className="form-select"
//                 autoComplete="off"
//                 required
//               >
//                 <option value="">Select status</option>
//                 {/* {session.map((item) => (
//               <option value={item.name} key={item._id}>
//                 {item.name}
//               </option>
//             ))} */}
//               </select>
//             </div>
//           </div>
//           {/* questions */}
//           <div className="col-md-12">
//             <label className="form-label">questions</label>
//             <div className="input-group">
//               <span className="input-group-text">
//                 <i class="fas fa-question-circle"></i>
//               </span>
//               <select
//                 name="question"
//                 className="form-select"
//                 autoComplete="off"
//                 required
//               >
//                 <option value="">Select qestions</option>
//                 {/* {session.map((item) => (
//               <option value={item.name} key={item._id}>
//                 {item.name}
//               </option>
//             ))} */}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mt-4">
//           <button type="submit" className="btn btn-primary">
//             Add
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Eaxmination


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Examination = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, sessionRes] = await Promise.all([
          axios.get(`${backendUrl}/api/subject`),
          axios.get(`${backendUrl}/api/session`),
        ]);
        setSubjects(subjectRes.data || []); //subjectRes.data.data
        setSessions(sessionRes.data || []); //sessionRes.data.data
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load subjects or sessions');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
    setError('');
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [
        ...formData.questionDistribution,
        { subject: '', numberOfQuestions: '' },
      ],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (!formData.examName || !formData.date || !formData.time || !formData.duration || !formData.totalMarks || !formData.passingMarks || !formData.sessionId) {
      return 'All fields are required';
    }
    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }
    if (formData.questionDistribution.some(dist => !dist.subject || !dist.numberOfQuestions || parseInt(dist.numberOfQuestions) <= 0)) {
      return 'All question distributions must have a valid subject and number of questions';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/exams`, formData);
      alert('Exam Created Successfully');
      // Reset form
      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Examination</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Exam Name</label>
          <input
            type="text"
            className="form-control"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Marks</label>
          <input
            type="number"
            className="form-control"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Passing Marks</label>
          <input
            type="number"
            className="form-control"
            name="passingMarks"
            value={formData.passingMarks}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Session</label>
          <select
            className="form-select"
            name="sessionId"
            value={formData.sessionId}
            onChange={handleChange}
            required
          >
            <option value="">Select Session</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <hr />
        <h5>Question Distribution</h5>
        {formData.questionDistribution.map((item, index) => (
          <div className="row mb-2" key={index}>
            <div className="col-md-6">
              <select
                className="form-select"
                name="subject"
                value={item.subject}
                onChange={(e) => handleQuestionDistChange(index, e)}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                name="numberOfQuestions"
                placeholder="No. of Questions"
                value={item.numberOfQuestions}
                onChange={(e) => handleQuestionDistChange(index, e)}
                min="1"
                required
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeDistributionField(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="mb-3">
          <button type="button" className="btn btn-secondary" onClick={addDistributionField}>
            + Add Subject
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default Examination;
