
const express = require('express');
const Subject = require('../models/Subject');
const router = express.Router();

router.post("/",async(req, res)=>{
    const {name, description} = req.body;
    const subjectData = new Subject({name, description});
    await subjectData.save();
    res.status(200).send({message:"Subject added successfully."});
});

router.get("/", async(req, res)=>{
    const subjectData = await Subject.find();
    if(!subjectData){
        return res.status(400).send("data are not found.")
    }
    res.status(200).send(subjectData);
});

router.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    await Subject.findByIdAndDelete(id);
    res.status(200).send({message:"deleted successfully"});
});

router.put("/:id", async(req,res)=>{
  const {id} = req.params;
  await Subject.findByIdAndUpdate(id,req.body);
  res.status(200).send({message:"updated successfully"});
});

module.exports = router;