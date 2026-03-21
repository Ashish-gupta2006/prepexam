import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')
    const handlefetch = async () => {
        const res = await axios.get(`${backendUrl}/api/exams/examinee-result/${userId}`);
        console.log(res.data.message)
        setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

    }
    useEffect(() => {
        handlefetch()
    }, [])
    return (
      <div className="table-responsive mt-3 ">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <td>S.N</td>
              <td>Exam name</td>
              <td>Your Name</td>
              <td>Total Marks</td>
              <td>Score</td>
              <td>Passing Marks</td>
              <td>Status</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.examId.title}</td>
                <td>{item.ExamineeId.name || item.ExamineeId}</td>
                <td>{item.totalMarks}</td>
                <td>{item.score}</td>
                <td>{item.passingMarks}</td>
                <td>{item.status}</td>
                <td>{new Date(item.createdAt).toLocaleDateString("en-In")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Result
