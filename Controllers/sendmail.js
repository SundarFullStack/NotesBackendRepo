const nodeMailer = require("nodemailer");


//Transporter to create transport for send Email

const mailTransporter = nodeMailer.createTransport({

    service: "gmail",
    auth:{
        user:process.env.Nodemailer_UserName,
        pass:process.env.Nodemailer_Password
    }

})

const sendMail = (gmailId,subject,content) => {
    
    try {
        const mailOptions = {
            from: "sundermernstacksms@gmail.com",
            to: gmailId,
            subject: subject,
            html:content
    
        }
    
        mailTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error occurred",error);
            } else {
                console.log("Email Send Successfully",info.response)
            }
        })
    } catch (error) {
        console.log("Error Occurred:",error);
   }
}





module.exports = {sendMail};