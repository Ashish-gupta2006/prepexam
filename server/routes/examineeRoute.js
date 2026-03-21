const Examinee = require("../models/Examinee");
const express = require("express");
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
router.get("/", async (req, res) => {
  const examinee = await Examinee.find();
  res.status(200).send(examinee);
});
// regisetr
router.post("/", async (req, res) => {
  const {email, name} = req.body;
  const existingExaminee= await Examinee.findOne({email:email});
  if(existingExaminee){
    return res.status(400).send("Examinee with this email already exists");
  }
  const examinee = new Examinee(req.body);
  await examinee.save();
  res.status(200).send("You are  registered successfully.");
 const html = `
  <div style="font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e3f2fd, #ffffff); padding: 40px;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
     
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #007bff, #00c6ff); padding: 25px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 Welcome to Softpro!</h1>
      </div>
     
      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333;"><strong>Dear ${name},</strong></p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          We're excited to welcome you to the <strong>Softpro Exam Prep</strong>! Your registration was successful, and your account is now active.
        </p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          You can now log in to access your dashboard, take exams, track your progress, and explore learning resources.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://localhost:5000/login&quot; style="background: #007bff; color: #fff; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; display: inline-block;">
            🔐 Log in to Your Account
          </a>
        </div>

        <p style="font-size: 16px; color: #555;">
          If you have any questions or face issues logging in, feel free to contact our support team.
        </p>

        <p style="margin-top: 30px; font-size: 16px; color: #333;">
          Best regards,<br>
          <strong>Team Softpro</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 12px; color: #777;">
        This is an automated message. Please do not reply to this email.
      </div>
    </div>
  </div>`
  setTimeout(async () => {
    await sendEmail(email, "Welcome to the Exam Portal", html);
  }, 100);

});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const examinee = await Examinee.findOne({email:email});
  if (!examinee) {
    return res.status(400).send({ message: "your Email Incorrect." });
  }
  if (examinee.password === password) {
    return res.status(200).json({
      message: "Login Successfully",
      user: {
        email: examinee.email,
        role: "user",
        id: examinee._id,
      },
    });
  } else {
    return res.json({ message: "Incorrect password" });
  }
});

// delete examinee
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Examinee.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ message: "User not register" });
  }
  res.status(200).json({ message: "Examinee deleted successfully." });
});

// change password
router.post("/change", async(req,res)=>{
  const{oldPass, newPass, conPass ,email} = req.body;
  const dbPass = await Examinee.findOne({email:email});
  if(oldPass === newPass){
    return res.json({message:"Your old and new password are same"});
  }

  if(newPass != conPass){
    return res.json({ message: "Your new and conform new password are not same" });
  }

  if(oldPass != dbPass.password){
    return res.json({ message: "Enter your password is not currect" });
  }

   await Examinee.findByIdAndUpdate(dbPass._id, { password: newPass });
   res.json({message:"password successully update"});

});

// access to indiviual examinee data
router.get('/:id', async(req, res)=>{
  const{id} = req.params;
  const examinee = await Examinee.findById(id); 

  res.status(200).json(examinee);
});
module.exports = router;
