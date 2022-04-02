const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

const Speakeasy = require("speakeasy");
const uuid = require("uuid");

router.post("/sendotp", (req, res) => {
  const { sender, receiver } = req.body;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  let userid = uuid.v4();
  // console.log("Tried");
  //   let path = `user/${userid}`;
  let temp_secret = speakeasy.generateSecret();
  //   db.push(path, { userid, temp_secret });
  let secret1 = temp_secret.base32;
  // we only need the base32
  let token1 = Speakeasy.totp({ secret: secret1, encoding: "base32" });

  res.json({
    userid,
    secret: temp_secret.base32,
    token: Speakeasy.totp({
      secret: secret1,
      encoding: "base32",
    }),
  });

  let mailDetails = {
    from: sender,
    to: receiver,
    subject: "Nyahari Verification OTP",
    text: "OTP for two factor Authentication",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      token1 +
      "</h1>", // html body
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
});

router.post("/totp-validate", (request, response, next) => {
  let valid = Speakeasy.totp.verify({
    secret: request.body.secret,
    encoding: "base32",
    token: request.body.token,
    window: 5,
  });
  response.send({ valid: valid });
});

module.exports = router;
