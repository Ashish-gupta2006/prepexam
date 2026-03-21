import React, { useEffect, useState } from "react";
import "./userProfile.css";
import axios from 'axios';
const UserProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState({
   name:'',
   email:'',
   number:'',
   address:'',
  });
      const fetchData = ()=>{
        const userId = localStorage.getItem('userId');
      
          axios.get(`${backendUrl}/api/examinee/${userId}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
          });
      }
  // Fetch user data when the component mounts
      useEffect(() => {
        fetchData();       
      }, []);
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg rounded-4 p-4">
            <div className=" text-center ">
              <div className="userImage text-center ">
                <i className="fa fa-user fa-4x "></i>
              </div>
             <h4 className="fw-bold mt-2 rounded">{user.name}</h4>
            </div>

            <hr />

            <div className="mt-3">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong>+91 {user.number}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary px-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
