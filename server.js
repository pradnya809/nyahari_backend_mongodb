const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const config = require("config");
const mongoose = require("mongoose");

const serviceID = "MGa5d7cee7aad5961ed11ca29b500e514b";
const accountSID = "AC869b65d25d2bca524060ba2948774e69";
const authToken = "5b892d6bbaf8fdb3c49a74d46f130f82";
const client = require("twilio")(accountSID, authToken);
const app = express();
var authy = require("authy")("APIKEY");
app.use(cors());
mongoose.connect(
  "mongodb+srv://admin:gaurav54321@cluster0.9mvsd.mongodb.net/Nyahari?retryWrites=true&w=majority",
  () => {
    console.log("Connected Successfully");
  }
);
// connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/login", async (req, res) => {
  // client.verify
  //   .services(serviceID)
  //   .verifications.create({
  //     to: `+${req.query.phonenumber}`,
  //     channel: req.query.channel,
  //   })
  //   .then((data) => {
  //     res.status(200).send(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // sendTextMessage();
  // client.verify
  //   .services("MG4242a4c6d3e7fa99852cb0afa8a643a9")
  //   .verifications.create({
  //     // to: "+919307854081"
  //     to: `+${req.query.phonenumber}`,
  //     channel: "sms",
  //   })
  //   .then((verification) => console.log(verification.status))
  //   .catch((error) => {
  //     console.log(error);
  //     res.json(error);
  //   });
  // client.verify
  //   .services(serviceID)
  //   .verifications.create({
  //     channel: "sms",
  //     to: "+91 9307854081",
  //     friendlyName: "Testing",
  //   })
  //   .then((verification) => console.log(verification.status))
  //   .catch((error) => {
  //     console.log(error);
  //     res.json(error);
  //   });
  const { sid } = await client.verify.services.create({
    friendlyName: "Testing",
  });

  const response = await client.verify.services(sid).verifications.create({
    to: "+919307854081",
    channel: "sms", // sms, call, or email
  });
  res.json(response);

  // sendTextMessage();
});

app.get("/verify", async (req, res) => {
  // const { sid } = await client.verify.services.create({
  //   friendlyName: "Testing",
  // });

  // const response = await client.verify
  //   .services(sid)
  //   .verificationChecks.create({
  //     to: "+919307854081",
  //     code: "114474", // sms, call, or email
  //   })
  //   .then((verification_check) => console.log(verification_check.status));
  // res.json(response);

  client.verify
    .services(serviceID)
    .verificationChecks.create({ to: "+919307854081", code: "114474" })
    .then((verification_check) => {
      res.json(verification_check);
      console.log(verification_check.status);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// from: "+15392455530",
// friendlyName: "My First Verify Service",
// customFriendlyName: "(539) 245-5530",

// body: "This is the ship that made the Kessel Run in fourteen parsecs?",
// from: "+15392455530",
// to: `+${req.query.phonenumber}`,
// channel: req.query.channel,

function sendTextMessage() {
  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+15392455530",
      to: "+919307854081",
      channel: "sms",
    })
    .then((message) => {
      console.log(message);
      res.json(message);
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
}
//login
// phonenumber
// channel(sms/call)

//verify
// phonenumber
// code

app.use("/api/register", require("./api/register"));
app.use("/api/login", require("./api/login"));
app.use("/api/profile", require("./api/profile"));
app.use("/api/menu", require("./api/menu"));

app.use("/api/feedback", require("./api/feedback"));
app.use("/api/schedule", require("./api/schedule"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
