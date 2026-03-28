const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://prepexam.netlify.app",
  }),
);
app.use(express.json());



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected");
  })
  .catch((err) => {
    console.log(`Error is ${err}`);
  });

//  API started
app.use("/api/examinee", require("./routes/examineeRoute"));

// admin route
app.use("/api/admin", require("./routes/adminRoute"));

// session api
app.use("/api/session", require("./routes/sessionRoute"));

// subject Api
app.use("/api/subject", require("./routes/subjectRoute"));

// question API
app.use("/api/question", require("./routes/questionRoute"));
// eami api
app.use("/api/exams", require("./routes/examinationRoute"));
// message API 
app.use("/api/message", require('./routes/messageRoute'));
// API ended
app.listen(5000, () => {
  console.log("Server is Conneted on http://localhost:5000");
});
