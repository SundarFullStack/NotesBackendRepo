const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../Models/Authentication/User");
const jwt = require("jsonwebtoken");


router.post("/", async (req, res) => {
  try {
    const { email, password } = await req.body;

    // console.log(email, password);

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "please Provide All Fields"
      });
    } else {
      const userExist = await User.findOne({ email: email });

        if (userExist) {

          const validPassword = await bcrypt.compare(password, userExist.password);
          
          const token = await generateLoginToken(email);

          const updateToken = await User.updateOne({ email: email }, { $set: {token:token} });

            // console.log("userToken",userExist.token );
      
            if (!validPassword) {
              res.status(201).json({
                success: false,
                message: "Invalid password",
              });
            } else {
              res.status(200).json({
                success: true,
                message: "User Login Successfully",
                token: userExist.token,
              });
            }
        }
        else {
            res.status(201).json({
                success: false,
                message: "Invalid Email Id",
              });
        }
    }
  } catch (error) {
    console.log("Error Occurred:", error);

    res.status(500).json({
        success: false,
        Error: error
    });
  }
});

// Token Generator

const generateLoginToken = async (email) => {
  try {
    const token = await jwt.sign(email, process.env.Login_Secretkey);
    return token;
  } catch (error) {
    console.log("Error Occured:",error)
  }
}

module.exports = router;
