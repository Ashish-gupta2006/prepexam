import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Examiniee = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const[data, setData] = useState([]);
  const handelFetch= async()=>{
    try {
      const res = await axios.get(`${backendUrl}/api/examinee`);
      setData(res.data);
    } catch (error) {
      console.error("con't fatch data ",error);
    }
  }
const handelDelete = async(id) =>{
await axios.delete(`${backendUrl}/api/examinee/${id}`)
  .then((res) => {
    if (res.statusText === "OK") {
      alert(res.data.message);
      handelFetch();
    } else {
      alert("Something went wrong: " + res.data.message);
    }
  })
  .catch((err) => {
    console.error(err);
    alert("Error occurred while deleting.");
  });
}
// handel edit 
// const[editForm, setEditForm] = useState(false);
// const[id, setId] = useState(null);
// const handelEdit = (item) =>{
// setData({

// });
// }
  useEffect(()=>{
    handelFetch()
  },[]);

  return (
    <div className="table-responsive mt-3 ">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Email</th>
            <th>College</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Qualification</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.college}</td>
              <td>{item.number}</td>
              <td>{item.address}</td>
              <td>{item.qualification}</td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Examiniee;