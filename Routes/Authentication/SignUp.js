const express = require("express");
const router = express.Router();
const {
  CheckUser,
  InsertVerifyUser,
  InsertSignUpUser
} = require("../../Controllers/SignUpController");

// API for saving Verify User

router.post("/verify", async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    // console.log(name, email, password);

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please Provide All Details",
      });
    } else {
      const userExist = await CheckUser(email);

      // console.log("userExist", userExist);

      if (userExist == true) {
        res.status(201).json({
          success: false,
          message: "User Already Exist",
        });
      } else {
        const savedVerifyUser = await InsertVerifyUser(name, email, password);

        // console.log("savedVerifyUser", savedVerifyUser);

        if (savedVerifyUser) {
          res.status(200).json({
            success: true,
            message: "User Registered successfully",
            VerifyUser: savedVerifyUser,
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Error in saving verify user",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});


// API for save verify user as user with the reference of token

router.get("/:token", async (req, res) => {
  
  try {

    const token = await req.params.token;

    const savedUser = await InsertSignUpUser(token);

    // console.log(savedUser);

    if (savedUser) {
      
      res.status(200).send(
        `<!DOCTYPE html>
    <html>
      <head> </head>
      <body>
        <div
          style="
            width: 100%;
            background-color: #fff;
            box-shadow: 0px 4px 8px 0px #757575;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
          "
        >
          <div class="row">
            <div
              style="
                margin-top: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            >
              <h2 style="color: #1a73e8">Notes Web Application</h2>
            </div>
    
            <div
              style="width: 600px; height: 300px"
              class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            >
              <img
                src="https://cdn.pixabay.com/photo/2019/04/29/13/16/post-it-4166051_960_720.jpg"
                style="width: 100%; height: 100%"
              />
            </div>
            <div>
            <h3>Hi, there</h3>
            <p style="color:gray; font-weight:700;font-size:23px;">Welcome to the app</p>
            <p style="font-size:20px">Registration Successful</p>
            <p style="font-size:20px;">You are successfully register!!!</p>
            <p  style="font-size:17px;font-weight:600">Regards</p>
            <p style="font-size:17px;font-weight:600">Sundar</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `
      )
    }

    // console.log("token", token);
  } catch (error){
    console.log("Error Occurred:", error);
    res.status(500).send(`<!DOCTYPE html>
              <html>
                <head> </head>
                <body>
                  <div
                    style="
                      width: 100%;
                      background-color: #fff;
                      box-shadow: 0px 4px 8px 0px #757575;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: 10px;
                    "
                  >
                    <div class="row">
                      <div
                        style="
                          margin-top: 25px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                        class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                      >
                        <h2 style="color: #1a73e8">Farmer Super Market</h2>
                      </div>
              
                      <div
                        style="width: 600px; height: 300px"
                        class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                      >
                        <img
                          src="https://cdn.pixabay.com/photo/2019/04/29/13/16/post-it-4166051_960_720.jpg"
                          style="width: 100%; height: 100%"
                        />
                      </div>
                      <div>
                      <h3>Hi, there</h3>
                      <p style="font-size:20px">Registration Failed</p>
                      <p style="font-size:20px;color:red;">Can't able to register...</p>
                      <p  style="font-size:17px;font-weight:600">Regards</p>
                      <p style="font-size:17px;font-weight:600">Sundar</p>
                      </div>
                    </div>
                  </div>
                </body>
              </html>
              `);
}
  
})

module.exports = router;

