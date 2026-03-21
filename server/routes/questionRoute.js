const express = require('express');
const Question = require('../models/Question');
const router = express.Router();


router.post('/',async(req, res)=>{
    const question = new Question(req.body);
    await question.save();
    return res.status(200).json({message:"Question Added Successfully"});
});

router.get('/', async(req, res)=>{
    const question = await Question.find();
    return res.status(200).json({data:question});
});


router.delete("/:id",async(req, res)=>{
    const{id} = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({message:"deleted Successfully"});
});

router.put("/:id",async(req, res)=>{
    const{id} = req.params;
    await Question.findByIdAndUpdate(id,req.body);
    res.status(200).json({message:"Updated successfully"});
});

module.exports = router;