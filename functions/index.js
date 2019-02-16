//firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
"use strict";
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Sends an email message when this url is triggered.
exports.sendEmail = functions.https.onRequest((req, res) => {
  console.log(req.query);
  console.log(req.query.to, "TO");
  console.log(req.query.from, "FROM");
  console.log(req.query.message, "Message");
  console.log(req.query.subject, "Subject");

  const mailOptions = {
    from: req.query.from + " <noreply@service.com>",
    to: req.query.to
  };

  // Building Email message.
  mailOptions.subject = req.query.subject;
  mailOptions.text = req.query.message;

  try {
    return mailTransport
      .sendMail(mailOptions)
      .then(() => {
        console.log(`New Email sent: ${emailMessage}`);
        return res.end();
      })
      .catch(error => {
        console.error("There was an error while sending the email:", error);
        res.end();
      });
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
  return null;
});

//Client sender..
// var obj = {
//     to: "tolangerard@gmail.com",
//     from: "test@emailservice.com",
//     message: "This is a bs message test",
//     subject: "Subject of email-test"
// }

// var str = `to=${obj.to}&from=${obj.from}&message=${obj.message}&subject=${obj.subject}';

// var s = encodeURI(str)
// var cu = "https://us-central1-service-48e84.cloudfunctions.net/sendEmail?";
// var url = cu + s;

// fetch(url, {
//     method: 'POST', // or 'PUT'
//     mode:'no-cors',
//     body: s, // data can be `string` or {object}!
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));
