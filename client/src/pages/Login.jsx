import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "./Login.css";
const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ;
  const [data, setData] = useState({
    email: "",
    password: "",
  });
 
  const handelChange = (e) => {
    setData((prve) => ({ ...prve, [e.target.name]: e.target.value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const res = await axios.post(
      `${backendUrl}/api/examinee/login`,
      data
    );
    alert(res.data.message);
    if( res.data.message === "Login Successfully"){
      localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        window.location.href='/user'
    }
   
  };

  return (
    <>
      <div className="login-box text-center">
        <div className="icon-box">
          <i className="fa fa-user fa-2x"></i>
        </div>
        <h4 className="mb-4">Sign in</h4>
        <form onSubmit={handelSubmit}>
          {/* Username input  */}
          <div className="mb-3 text-start px-4">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 text-white">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
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
                placeholder="Password"
                name="password"
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
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
