import React from "react";
import "./AdDashboard.css";
import { Link, Outlet } from "react-router";

const AdDashboard = () => {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        <h4>Admin Dashboard</h4>
        <Link to="dashboard">
          {" "}
          <i className="fas fa-chart-line me-2"></i> Dashboard
        </Link>
        <Link to="session">
          {" "}
          <i className="fas fa-calendar-alt me-2"></i>Session
        </Link>
        <Link to="subject">
          {" "}
          <i className="fas fa-book me-2"></i>Subject
        </Link>
        <Link to="examination">
          {" "}
          <i className="fas fa-pen-alt me-2"></i> Examination
        </Link>
        <Link to="examinee">
          {" "}
          <i className="fas fa-user-graduate me-2"></i>Examinee
        </Link>
        <Link to="questionBank">
          {" "}
          <i className="fas fa-question-circle me-2"></i> Question Bank
        </Link>
        <Link to="report">
          {" "}
          <i className="fas fa-file-alt me-2"></i>Report Generation{" "}
        </Link>

        <Link to="message">
          <i className="fas fa-envelope me-2"></i> Message
        </Link>
        <Link to="ExamResultDeclaration">
          {" "}
          <i className="fas fa-bullhorn me-2"></i> Declare Result{" "}
        </Link>
        <Link to="changePassword">
          {" "}
          <i className="fas fa-key me-2"></i> Change Password
        </Link>
        <Link
          onClick={() => {
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            window.location.href = "/adlogin";
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>  Log out
        </Link>
      </div>

      {/* <!-- Main Content --> */}

      <div className="content">
        <h4>Welcome Admin</h4>
        <Outlet />
      </div>
    </>
  );
};

export default AdDashboard;
