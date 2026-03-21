import React, { useState } from "react";
import axios from 'axios';

const AdminLogin = () => {
  const backendUrl =import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm((pre) => ({ ...pre, [name]: value }));
  }

  const handelSubmit =async(e)=>{
    e.preventDefault();
    const res = await axios.post(`${backendUrl}/api/admin/login`, form);
    console.log(res);
    if (res.data.message == "Admin login Successfully") {
      localStorage.setItem("role", res.data.admin.role);
      localStorage.setItem("email", res.data.admin.email);
      window.location.href = "/admin";
    } else {
      window.alert("Your email or password are incoorect");
    }

  
  }

  return (
    <>
      <div className="login-box text-center">
        <div className="icon-box">
          <i className="fa fa-user fa-2x"></i>
        </div>
        <h4 className="mb-4">Admin Log in</h4>
        <form onSubmit={handelSubmit}>
          {/* admin email */}
          <div className="mb-3 text-start px-4">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 text-white">
                <i className="fa-solid fa-envelope"></i>
                
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                onChange={handelChange}
                required
              />
            </div>
          </div>
          {/* Password input  */}
          <div className="mb-3 text-start px-4">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 text-white">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={handelChange}
                required
              />
            </div>
          </div>
          {/* <!-- Checkbox and Forgot --> */}
          <div className="d-flex justify-content-between align-items-center mb-3 px-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          {/* <!-- Login button --> */}
          <div className="px-4">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
