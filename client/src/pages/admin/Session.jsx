import React from "react";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
// import './Session.css';

const Session = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // fetch data
  const [data, setData] = useState([]);

  // handel change function
  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // handel submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        const res = await axios.put(`${backendUrl}/api/session/${id}`, form);
        if (res) {
          setForm({ name: " ", description: " " });
          fetchSessions();
          alert("session updated  successfully");
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/session`, form);
        if (res) {
          setForm({ name: " ", description: " " });
          fetchSessions();
          alert("session Added successfully");
        }
      }
    } catch (error) {
      alert("sorry, try again later");
    }
  };

  // handel fetch data
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/session/`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };
  useEffect(() => {
    fetchSessions();
  }, []);

  // handelDelete method.
  const handelDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/session/${id}`);
      setData((prev) => prev.filter((item) => item._id != id));
      console.log(res.message);
    } catch (error) {
      console.error("Delete Faild", error);
    }
  };

  // convert time to readable
  const sessionDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // handel edit form
  const [editForm, setEditForm] = useState(false);
  const[id, setId] =useState(null);
  const handelEdit = async (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEditForm(true);
    setId(item._id);
  };

  return (
    <>
      <div className="login-box text-center">
        <h4 className="mb-4">Add Session</h4>
        <form onSubmit={handelSubmit}>
          <div className="mb-3 text-start px-4">
            <label htmlFor="sesion" className="form-label">
              Session
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Session"
                id="session"
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
              Add Session
            </button>
          </div>
        </form>
      </div>
      <div className="table-responsive mt-3  margin-auto">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Session Name</th>
              <th>Desciption</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
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
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Session;
