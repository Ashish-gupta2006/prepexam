import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Session.css'
const Subject = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const[form, setForm] = useState({
  name:'',
  description:''
});

// handel change 
const handelChange = (e) =>{
  setForm((prev)=>({...prev, [e.target.name]:e.target.value}));
}

// handel submit
const handelSubmit = async(e) =>{
  e.preventDefault();
   try {
     if (editForm) {
       const res = await axios.put(
         `${backendUrl}/api/subject/${id}`,
         form
       );
       if (res) {
         setForm({ name: " ", description: " " });
         fetchData();
         alert(res.data.message);
       }
     } else {
       const res = await axios.post(`${backendUrl}/api/subject`, form);
      if(res.statusText === "OK"){
      setForm({name:'', description:''});
      fetchData();
      alert(res.data.message);
    }
     }
   } catch (error) {
     alert("sorry, try again later");
   }

  // try {
  //   const res =await axios.post("http://localhost:5000/api/subject",form);
  
  //   if(res.statusText === "OK"){
  //     setForm({name:'', description:''});
  //     fetchData();
  //     console.log(res.data.message);
  //   }
  // } catch (error) {
  //   console.log("sorry, try again later.");
  // }
}

const[subjectData, setSubjectData] = useState([]);
const fetchData = async()=>{
  try {
    const res = await axios.get(`${backendUrl}/api/subject`);
    setSubjectData(res.data);
  } catch (error) {
    console.log("data not fund");
  }
}

// fetch data 
useEffect(()=>{
  fetchData();
},[]);


// handel delete 
const handelDelete = async(id)=>{
  try {
    const res =await axios.delete(`${backendUrl}/api/subject/${id}`);
    if(res.statusText === "OK"){
      // setSubjectData((prev)=> prev.filter((item)=>item._id != id));
      fetchData();
      console.log(res.data.message);
    }

  } catch (error) {
    
  }

}

 const [editForm, setEditForm] = useState(false);
  const[id, setId] =useState(null);
  const handelEdit = async (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEditForm(true);
    setId(item._id);
  }

// readable formate date 
  const sessionDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="login-box text-center">
        <h4 className="mb-4">Add Subject</h4>
        <form onSubmit={handelSubmit}>
          <div className="mb-3 text-start px-4">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Subject"
                id="subject"
                onChange={handelChange}
                value={form.name}
                required
              />
            </div>
          </div>
          <div className="mb-3 text-start px-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              onChange={handelChange}
              value={form.description}
            ></textarea>
          </div>
          <div className="px-4">
            <button type="submit" className="btn">
              Add Subject
            </button>
          </div>
        </form>
      </div>
      <div className="table-responsive mt-3  margin-auto">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Subject Name</th>
              <th>Desciption</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{sessionDate(item.createdAt)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      handelDelete(item._id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      handelEdit(item);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Subject