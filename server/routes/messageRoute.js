const express = require("express");
const router = express.Router();
const Examinee = require("../models/Examinee");
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const { question, email } = req.body;
  const user = await Examinee.findOne({ email: email });
  const id = user._id;
  const contact = new Message({ question: question, examineeId: id });
  await contact.save();
  res.json({ message: "Message Sended Successfully" });
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  const msg = await Message.find({ examineeId: id }).populate("examineeId");
  return res.json({ message: msg });
});

// admin replay
router.post("/:id", async (req, res) => {
  const { answer, email } = req.body;
  const {id} = req.params;
  const message = await Message.findByIdAndUpdate(id,{answer:answer});
  res.json({ message: "Message Sended Successfully" });
});
module.exports = router;
