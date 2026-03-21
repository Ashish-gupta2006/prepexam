import React, { useEffect, useState } from "react";
import Clock from '../../components/Clock';
import Calender from "../../components/Calendar";
import axios from "axios";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [totalExam, setTotalExam] = useState(null);
  const[totalExaminee, setTotalExaminee] = useState(null);
  const[totalSubject, setTotalSubject] = useState(null);
 const fetchTotalExam = () => {
   axios
     .get(`${backendUrl}/api/exams/exams`)
     .then((res) => setTotalExam(res.data.length))
     .catch((err) => {
       console.error("Error fetching total exams:", err);
       alert("Error fetching data");
     });
 };

 const fetchTotalExaminee = () => {
   axios
     .get(`${backendUrl}/api/examinee`)
     .then((res) => setTotalExaminee(res.data.length))
     .catch((err) => {
       console.error("Error fetching total exams:", err);
       alert("Error fetching data");
     });
 };

  const fetchTotalSubject = () => {
    axios
      .get(`${backendUrl}/api/subject`)
      .then((res) => setTotalSubject(res.data.length))
      .catch((err) => {
        console.error("Error fetching total exams:", err);
        alert("Error fetching data");
      });
  };


  useEffect(()=>{
    fetchTotalExam();
    fetchTotalExaminee();
    fetchTotalSubject();
  },[])
  return (
    <>
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6">
            <Clock />
          </div>

          <div className="col-12 col-md-6">
            <Calender />
          </div>
        </div>
      </div>
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Card 1 */}
          <div className="col-12 col-md-4">
            <div className="card shadow p-3 text-center rounded">
              <h5 className="card-title">Total Exam</h5>
              <p className="card-text">Exam: {totalExam}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-12 col-md-4">
            <div className="card shadow p-3 text-center rounded">
              <h5 className="card-title">Total Examinee</h5>
              <p className="card-text">Examinee: {totalExaminee}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-12 col-md-4">
            <div className="card shadow p-3 text-center rounded">
              <h5 className="card-title">Total Subject</h5>
              <p className="card-text"> Subject: {totalSubject}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Current Exam</h2>
      <div className="container ">
        <div className="row g-4 justify-content-center">
          {/* Card 1 */}
          <div className="col-12 ">
            <div className="card shadow p-3 text-center rounded">
              <h5 className="card-title">current Exam</h5>
              <p className="card-text">This is the first card with shadow.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
