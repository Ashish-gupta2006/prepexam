const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

router.post("/", async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  return res.status(200).json({ message: "Session Added Successfully" });
});

router.get("/", async (req, res) => {
  const sessionData = await Session.find();
  return res.status(200).json(sessionData);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Session.findByIdAndDelete( id );
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Deletion failed" });
  }
});

router.put("/:id", async(req,res)=>{
  const {id} = req.params;
  await Session.findByIdAndUpdate(id,req.body);
  res.status(200).send({message:"updated successfully"});
});


module.exports = router;
