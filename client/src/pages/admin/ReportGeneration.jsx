import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import {handlePrintReport} from '../../helper/handlePrintReport.js';

const ReportGeneration = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);

  const handleFetch  = async()=>{
    try {
      const res = await axios.get(`${backendUrl}/api/exams/report`);
      setData(res.data);
    } catch (error) {
      alert("sorry , fetching report",error);
    }
  }

  useEffect(()=>{
    handleFetch()
  },[]);

 
  const handlePrint = (item) => {
    handlePrintReport(item);
  };

  return (
    <div className="table-responsive mt-3 ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr className='text-center'>
            <th>S.N</th>
            <th>Exam Name</th>
            <th>Examinee</th>
            <th>Email</th>
            <th>Total marks</th>
            <th>passing marks</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date of Eaxm</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.examTitle}</td>
              <td>{item.examineeName}</td>
              <td>{item.examineeEmail}</td>
              <td>{item.totalMarks}</td>
              <td>{item.passingMarks}</td>
              <td>{item.score}</td>
              <td>{item.status}</td>
              <td>{new Date(item.attemptedAt).toLocaleDateString()}</td>
              <td>
                <button className="btn  btn-sm btn-success" onClick={()=>{handlePrint(item)}}>
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportGeneration