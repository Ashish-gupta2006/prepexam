import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const MyExam = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ;
  const [eaxm, setExam] = useState([]);
  const fetchExams = async () => {
    const res = await axios.get(`${backendUrl}/api/exams/exams`);
    setExam(res.data);
  };

  useEffect(() => {
    fetchExams();
  }, []);
  return (
    <div className="table-responsive mt-3 ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr className="text-center">
            <th>S.N</th>
            <th>Exam Name</th>
            <th>Date of Exam</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eaxm.map((item, i) => (
            <tr className="text-center" key={item._id}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{new Date(item.date).toLocaleDateString("en-In")}</td>
              <td>{item.time}</td>
              <td>
                <Link
                  to={`/user/getexam/${item._id}`}
                  className="btn  btn-sm btn-primary"
                >
                  Start Exam
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyExam;
