import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';


const Message = () => {
const backendUrl = import.meta.env.VITE_BACKEND_URL ;
  const [formData, setFormData] = useState({
    question: "",
    email : localStorage.getItem('userEmail') || "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/message`, formData);
      alert(response.data.message);
      setFormData({question:'', email:formData.email});
      fetchMessage();
    } catch (error) {
      console.error('error sending message', error);
      alert('faied to send message');
    }
  }

  const[message, setMessage] = useState([]);
  const fetchMessage = async()=>{
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${backendUrl}/api/message/${userId}`);
      setMessage(response.data.message);
      
    } catch (error) {
      console.error('Error fetching message', error);
    }
  }

  useEffect(()=>{
    fetchMessage();
  },[]);
  
  return (
    <>
      <div className="form-wrapper">
        <h2>Chat to admin</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Question</label>
              <div className="input-group">
                <span className="input-group-text">
                  {/* <i className="fas fa-user"></i> */}
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write here some message..."
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* all meaasge table */}
      <div className="table-responsive mt-3 ">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <th>S.N</th>
              <th>Question</th>
              <th>Date</th>
              <th>Reply By Admin</th>
            </tr>
          </thead>

          <tbody>
            {message.map((message, index) => (
              <tr key={message._id} >
                <td>{index + 1}</td>
                <td>{message.question}</td>
                <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                <td>{message.answer || "No reply yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Message