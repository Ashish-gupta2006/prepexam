import React, { useState,useEffect } from "react";
import { Link, Outlet } from "react-router";
const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem('role');
  if(role == "admin"){
    var email = localStorage.getItem('email');
  }else{
    window.location.href="/adlogin"
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
    <div className={`dashboard-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h4 style={{ color: "black" }}>Admin</h4>
        </div>
        <ul className="nav-links">
          <li>
            <i className="fas fa-chart-line me-2"></i>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <i className="fas fa-calendar-alt me-2"></i>
            <Link to="session">Session</Link>
          </li>
          <li>
            <i className="fas fa-book me-2"></i>
            <Link to="subject">Subject</Link>
          </li>
          <li>
            <i className="fas fa-user-graduate me-2"></i>
            <Link to="examinee">Examinee</Link>
          </li>
          <li>
            <i className="fas fa-question-circle me-2"></i>
            <Link to="questionBank">Question Bank</Link>
          </li>
          <li>
            <i className="fas fa-user-cog me-2"></i>
            <Link to="examination">Examination</Link>
          </li>
          <li>
            <i className="fas fa-bullhorn me-2"></i>
            <Link to="ExamResultDeclaration">Result Declaration </Link>
          </li>
          <li>
            <i className="fas fa-bullhorn me-2"></i>
            <Link to="message">Message</Link>
          </li>
          <li>
            <i className="fas fa-bullhorn me-2"></i>
            <Link to="report">Report </Link>
          </li>
          <li>
            <i className="fa-solid fa-lock"></i>
            <Link to="changePassword">Change Password</Link>
          </li>
          <li>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <Link
              onClick={() => {
                localStorage.removeItem("role");
                localStorage.removeItem("email");
                window.location.href = "/adlogin";
              }}
            >
              Log out
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="toggle-btn"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <h2>Admin Dashboard</h2>
          <h4 id="greeting"></h4>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
