const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json({ limit: "25mb" }));

function sendEmail(email, subject, message) {
  return new Promise((resolve, reject) => {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ymohanajay@gmail.com@",
        pass: "cuvpfhoduuqvhqfg",
      },
    });
    const mail_configs = {
      from: "ymohanajay@gmail.com",
      to: "mohanajayellapu@gmail.com",
      subject: "Get Legal advise",
      text: "Hi This is Y Mohan Ajay",
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
  sendEmail(req.query)
    .then((response) => console.log("Success"))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(PORT, () => {
  console.log("Listening to port succesfully");
});
