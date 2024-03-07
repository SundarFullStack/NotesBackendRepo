const express = require("express");
const router = express.Router();
const User = require("../../Models/Authentication/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// VALIDATING THAT USER IS AUTHENTICATED OR NOT AND SEND RESPONSE

router.get("/", async (req, res) => {
  try {
    // RECEIVING TOKEN FROM HEADERS

    const token = req.headers.authorization;

    //   console.log("token",token)

    // VERIFYING RECEIVED TOKEN WITH LOGIN TOKEN

    const UserValid = await User.findOne({ token: token });

      // console.log("UserValid",UserValid.token)

    if (UserValid.token == token) {
      res
        .status(200)
        .json({ status: 200, message: "User Valid", UserData: UserValid });
    } else {
      res.status(201).json({
        success: false,
        message: "User Not Valid",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
