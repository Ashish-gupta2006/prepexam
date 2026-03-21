import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AdDashboard from "./pages/admin/AdDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import Session from "./pages/admin/Session";
import Subject from "./pages/admin/Subject";
import Examiniee from "./pages/admin/Examiniee";
import QuestionBank from "./pages/admin/QuestionBank";
import Examination from "./pages/admin/Eaxmination";
import ExamResultsDeclaration from "./pages/admin/ExamResultDeclaration";
import ChangePassword from "./pages/admin/ChangePassword";
import AdminLogin from "./pages/admin/AdminLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import Result from "./pages/user/Result";
import MyExam from "./pages/user/MyExam";
import ReportGeneration from "./pages/admin/ReportGeneration";
import Message from "./pages/user/Message";
import GetExam from "./pages/user/GetExam";
import UserChangePassword from "./pages/user/UserChangePassword";
import AdminMessage from "./pages/admin/AdminMessage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* registration route */}
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/adlogin" element={<AdminLogin />}></Route>
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdDashboard />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="session" element={<Session />} />
            <Route path="subject" element={<Subject />} />
            <Route path="examinee" element={<Examiniee />} />
            <Route path="questionBank" element={<QuestionBank />} />
            <Route path="examination" element={<Examination />} />
            <Route
              path="ExamResultDeclaration"
              element={<ExamResultsDeclaration />}
            />
            <Route path="report" element={<ReportGeneration />} />
            <Route path="Message" element={<AdminMessage />} />
            <Route path="changePassword" element={<ChangePassword />} />
          </Route>
          <Route path="/user" element={<UserDashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="exam" element={<MyExam />} />
            <Route path="message" element={<Message />} />
            <Route path="result" element={<Result />} />
            <Route path="getExam/:id" element={<GetExam />} />
            <Route path="changePassword" element={<UserChangePassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
