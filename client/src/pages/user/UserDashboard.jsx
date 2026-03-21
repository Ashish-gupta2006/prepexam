import React, { useState,useEffect } from "react";
import { Link, Outlet } from "react-router";
import './UserDashboard.css';
const UserDashboard = () => {
 const [collapsed, setCollapsed] = useState(false);

  const userRole = localStorage.getItem("userRole");
  if (userRole == "user") {
    var userEmail = localStorage.getItem("userEmail");
  } else {
    window.location.href = "/";
  }


  const dateAndTime = ()=>{
    const showTime = document.getElementById("showTime");
    const time = new Date().toLocaleTimeString("en-In");
    showTime.textContent = time;
  }
  function setGreeting() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
      greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    greetingElement.textContent = greeting;
  }

  useEffect(()=>{
    setGreeting();
  },[]);

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        <h4>Student Dashboard</h4>
        <Link to="profile">profile</Link>
        <Link to="Exam">My Exam</Link>
        <Link to="result">Result</Link>
        <Link to="message">Message</Link>
        <Link to="changePassword">Change Password</Link>
        <Link
          onClick={() => {
            localStorage.removeItem("userRole");
            localStorage.removeItem("userEmail");
            window.location.href = "/";
          }}
        >
          Log out
        </Link>
      </div>

      {/* <!-- Main Content --> */}

      <div className="content">
          <div className="d-flex justify-content-between align-items-center mb-4 color">
            <h3 id="greeting" className="px-4"></h3>
            <div className="dropdown">
              <div
                className="profile-pic "
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user fa-2x "></i>
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <span className="dropdown-item-text">
                    ashishgupta16082@gmail.com
                  </span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        <Outlet />
      </div>
    </>
  );
};

export default UserDashboard;
