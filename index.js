const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser);

const PORT = 5000;
app.use(cors());
app.use(express.json({ limit: "25mb" }));

function sendEmail(email, subject, message) {
  return new Promise((resolve, reject) => {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ymohanajay@gmail.com@",
        pass: "okmntdqdjmrxtkuo",
      },
    });

    const mail_configs = {
      from: "ymohanajay@gmail.com",
      to: email,
      subject: subject,
      text: message,
    };

    transport.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An Error Occured` });
      }
      return resolve({ message: "An email sent Successfully" });
    });
  });
}

app.post("/sendform", (req, res) => {
  sendEmail(req.body.email, req.body.subject, req.body.message)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log("Listening to port succesfully");
});
