const Admin = require("../models/admin");
const express = require("express");
const router = express.Router();

// admin registeration  route
// router.post("/register", async (req, res) => {
//   const admin = await new Admin(req.body);
//    await admin.save();
//   return res.status(200).send("Admin register sucessfully");
// });

// admin login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });
  
  if (!admin) {
    return res.status(401).json({ error: "Admin not found" });
  }
  if (admin.password == password ) {
    return res.json({ message: "Admin login Successfully", admin:{
      role:"admin",
      id:admin._id,
      email:admin.email
    }});
  } else {
    return res.json({ message: "Email or password incorrect" });
  }
});

// change password

router.post("/change", async(req,res)=>{
  const{oldPass, newPass, conPass ,email} = req.body;
  const dbPass = await Admin.findOne({email:email});

  if(oldPass === newPass){
    return res.json({message:"Your old and new password are same"});
  }

  if(newPass != conPass){
    return res.json({ message: "Your new and conform new password are not same" });
  }

  if(oldPass != dbPass.password){
    return res.json({ message: "Enter your password is not currect" });
  }

   await Admin.findByIdAndUpdate(dbPass._id, { password: newPass });
   res.json({message:"password successully updated"});

});

module.exports = router;
