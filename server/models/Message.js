const mongoose = require('mongoose');
const Examinee = require('./Examinee');
const messageSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  examineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Examinee",
  },
},{ timestamps: true });

module.exports = mongoose.model("Message", messageSchema);