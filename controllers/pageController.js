const nodemailer = require("nodemailer");
const dotenv =require("dotenv")

require('dotenv').config();
exports.getİndexPge=(req, res) => {
    res.status(200).render('index',{
      Page_Name:"index"
    });
  }
  exports.getAboutPage =  (req, res) => {
    res.status(200).render('about',{
      Page_Name:"about"
    });
  }
  
  exports.getRegisterPage =  (req, res) => {
    res.status(200).render('register',{
      Page_Name:"register"
    });
  }
  exports.getLoginPage =  (req, res) => {
    res.status(200).render('login',{
      Page_Name:"login"
    });
  }
  exports.getContactPage=(req,res)=>{
   res.status(200).render("contact",{
    Page_Name:"contact"

   })
  }

  exports.sendEmail= async (req,res)=>{
const outputMessage=`
<h1>Mail Details </h1>
<ul>
<li>Name:${req.body.name} </li>
<li>Email:${req.body.email} </li>

<h1>Messsage</h1>
<p>${req.body.message}</p>
</ul>
`

try {
  
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "frontend@gmail.com",
    pass: process.env.MAIL_PASSWORD
  },
});


  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Smart Edu Contact Form :" <frontend@gmail.com>', // sender address
    to: "mail.to@gmail.com", // list of receivers
    subject: "Smart Edu Contact Form", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>


res.status(200).redirect("contact")
console.log("Message sent successfully");

} catch (error) {
  console.error("Error sending email:", error.message); // Hata mesajını yazdırın
  res.status(500).send("Failed to send email");


}


  }