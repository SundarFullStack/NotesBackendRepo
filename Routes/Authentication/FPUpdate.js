const router = require("express").Router();
const User = require("../../Models/Authentication/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.put("/", async (req, res) => {
  try {
    const { email,token, password } = req.body;

    // console.log(token, password);

    const userExist = await jwt.verify(token,process.env.forgot_Pass_token)

    // console.log(userExist);

    if (!userExist) {
      res.status(201).json({
        success: false,
        message: "Invalid User",
      });
    } else if (!password || !token) {
      res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const updateUser = await User.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );

      if (updateUser) {
        res.status(200).json({
          success: false,
          message: "Password Changed Successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Error in updating password",
        });
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

module.exports = router;
