const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  correctAnswer:{
    type:String,
    required:true,
  },
  subject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'subject',
    required:true,
  },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Question", questionSchema);
