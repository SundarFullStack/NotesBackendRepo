const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const port = 4050;
const connectDB = require("./DBConnection/dbConnection");
connectDB();
const SignupRouter = require("./Routes/Authentication/SignUp");
const LoginRouter = require("./Routes/Authentication/Login");
const ForgotPasswordRouter = require("./Routes/Authentication/ForgotPassword");
const FPUpdateRouter = require("./Routes/Authentication/FPUpdate");
const UserValidRouter = require("./Routes/Application/UserValidation");
const BlogsRouter = require("./Routes/Application/Blogs");

dotenv.config();

app.use(bodyParser.json(), cors({ origin: "*" }));

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Blogs Server started successfully 😊");
});

app.use("/signup", SignupRouter);

app.use("/login", LoginRouter);

app.use("/forgotpassword", ForgotPasswordRouter);

app.use("/FPUpdate", FPUpdateRouter);

app.use("/validUser", UserValidRouter);

app.use("/notes", BlogsRouter);

app.listen(port, () => {
  console.log(`Server started successfully in the port: ${port}`);
});
