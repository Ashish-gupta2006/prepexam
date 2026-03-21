import React, { useEffect, useState } from "react";
import "./Registration.css";
import axios from "axios";
function Registration() {
  const backendURL = import.meta.env.VITE_BACKEND_URL ;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    college: "",
    qualification: "",
    session: "",
  });

  const [session, setSession] = useState([]);
  const handelFetch = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/session/`);
      setSession(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handelFetch();
  }, []);
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendURL}/api/examinee`,
        formData
      );
      alert("examinee registered successfully");
      setFormData({
        name: "",
        email: "",
        number: "",
        address: "",
        password: "",
        college: "",
        qualification: "",
        session: "",
      });
    } catch (error) {
      console.error(`sumbission error :${error}`);
      alert("failed to register");
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <h2>Sign up</h2>
        <hr />
        <form onSubmit={handelSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  name="name"
                  value={formData.name}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Mobile Number</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-phone"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile number"
                  name="number"
                  value={formData.number}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Address</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">College</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-building-columns"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter college name"
                  name="college"
                  value={formData.college}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Qualification</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-graduation-cap"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handelChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">session</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i class="fa-solid fa-calendar"></i>
                </span>
                <select
                  name="session"
                  className="form-select"
                  value={FormData.session}
                  onChange={handelChange}
                  required
                >
                  <option value="">select session</option>
                  {session.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
