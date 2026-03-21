import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const QuestionBank = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // setQuestions([...questions, formData]);
    try {
      if (editForm) {
        console.log(editForm);
        await axios
          .put(`${backendUrl}/api/question/${id}`, formData)
          .then((res) => alert(res.data.message))
          .catch((err) => console.err(err));
      } else {
        const res = await axios.post(
          `${backendUrl}/api/question`,
          formData
        );
        if (res) {
          alert("question Added Successfully");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Sorry, Try again");
    }

    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      subject: "",
    });
    handelData();
  };

  const handelData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/question`);
      setQuestions(res.data.data);
      const res1 = await axios.get(`${backendUrl}/api/subject`);
      setSubjects(res1.data);
    } catch (error) {
      console.log("sorry, try again");
    }
  };

  const handelDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/question/${id}`
      );
      handelData();
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  // edit form
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState(null);
  const handelEdit = (question) => {
    setFormData({
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
    });
    setEditForm(true);
    setId(question._id);
  };
  useEffect(() => {
    handelData();
  }, []);

  return (
    <>
      <div className="form-wrapper">
        <h2>Question</h2>
        <hr />
        <form onSubmit={handelSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <textarea
                name="question"
                id="question"
                placeholder="write your question here."
                rows={3}
                className="form-control"
                onChange={handelChange}
                value={formData.question}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text"> A </span>
              <input
                type="text"
                className="form-control"
                placeholder="option A"
                name="optionA"
                onChange={handelChange}
                value={formData.optionA}
                required
              />
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text"> B </span>
              <input
                type="text"
                className="form-control"
                placeholder="option B"
                name="optionB"
                onChange={handelChange}
                value={formData.optionB}
                required
              />
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text"> C </span>
              <input
                type="text"
                className="form-control"
                placeholder="option C"
                name="optionC"
                onChange={handelChange}
                value={formData.optionC}
                required
              />
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text"> D </span>
              <input
                type="text"
                className="form-control"
                placeholder="option D"
                name="optionD"
                onChange={handelChange}
                value={formData.optionD}
                required
              />
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text">Answer </span>
              <input
                type="text"
                className="form-control"
                placeholder="Answer"
                name="correctAnswer"
                onChange={handelChange}
                value={formData.correctAnswer}
                required
              />
            </div>
          </div>

          <div className="col-md-3 mt-3">
            <div className="input-group">
              <span className="input-group-text">subject </span>
              <select
                name="subject"
                value={formData.subject}
                onChange={handelChange}
                className="form-select"
                required
              >
                <option value="">select subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Add Question
            </button>
          </div>
        </form>
      </div>
      <h2 className="mt-5">All question</h2>
      <div className="table-responsive mt-3 ">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr className="text-center">
              <th>S.N</th>
              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, i) => (
              <tr key={question._id}>
                <td >{i + 1}</td>
                <td>{question.question}</td>
                <td>{question.optionA}</td>
                <td>{question.optionB}</td>
                <td>{question.optionC}</td>
                <td>{question.optionD}</td>
                <td>{question.correctAnswer}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      handelDelete(question._id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      handelEdit(question);
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
};

export default QuestionBank;
