import axios from 'axios';
import React, { useState } from 'react'

const UserChangePassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const email = localStorage.getItem('userEmail');
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    conPass: "",
    email:email,
  });

const handelChange = (e)=>{
  setData((prev)=>({...prev, [e.target.name]: e.target.value}));
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    const res = await axios.post(`${backendUrl}/api/examinee/change`, data);
    alert(res.data.message);
    if (res.data.message === "password successully update") {
       localStorage.removeItem("userRole");
       localStorage.removeItem("userEmail");
       window.location.href = "/";
    }
  } catch (error) {
    alert("Sorry, Try again...");
  }
  
}

  return (
    <div className="login-box text-center">
      <div className="icon-box">
        <i className="fa fa-user fa-3x"></i>
      </div>
      <h5 className="mb-4">Change Password</h5>
      <form onSubmit={handleSubmit}>
        {/* Password input  */}
        <div className="mb-3 text-start px-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0 text-white">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Old Password"
              name="oldPass"
              onChange={handelChange}
              required
            />
          </div>
        </div>
        {/* new password  */}
        <div className="mb-3 text-start px-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0 text-white">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              name="newPass"
              onChange={handelChange}
              required
            />
          </div>
        </div>
        {/* conform new password */}
        <div className="mb-3 text-start px-4">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0 text-white">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="conform new Password"
              name="conPass"
              onChange={handelChange}
              required
            />
          </div>
        </div>

        {/* <!-- Login button --> */}
        <div className="px-4">
          <button type="submit" className="btn btn-primary btn-sm">
            <strong>Change Password</strong>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserChangePassword;