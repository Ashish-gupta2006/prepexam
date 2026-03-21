import axios from "axios";
import React, { useState } from "react";

const ChangePassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const email = localStorage.getItem("email");
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    conPass: "",
    email: email,
  });

  const handelChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/change`,
        data
      );
      alert(res.data.message);
      if (res.data.message === "password successully updated") {
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        window.location.href = "/adlogin";
      }
    } catch (error) {
      alert("Sorry, Try again...");
    }
  };

  return (
    <div className="login-box text-center">
      <div className="icon-box">
        <i className="fa fa-user fa-2x"></i>
      </div>
      <h4 className="mb-4">Change Password</h4>
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
        <div className="d-flex justify-content-between align-items-center mb-3 px-4">
          <a href="#">Forgot password?</a>
        </div>
        {/* <!-- Login button --> */}
        <div className="px-4">
          <button type="submit" className="btn">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
