const express = require("express");
const dbconnect = require("./model/db");
const bodyParser = require("body-parser");
const usersModel = require("./model/users");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: Get");
});

app.post("/adduser", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  usersModel.create(req.body, (err, doc) => {
    if (err) res.json({ failed: "Qurry failed" });
    res.json({
      suscess: "Qurry success",
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });
  });
});
app.post("/showuser", (req, res) => {
  const userid = req.body.id;
  usersModel.find({ _id: userid }, (err, doc) => {
    if (err) res.json({ qurry: "failed qurry" });
    // res.json(doc.map(doc => doc.username))
    res.send(doc);
  });
});
app.get("/showuserall", (req, res) => {
  usersModel.find((err, doc) => {
    if (err) res.json({ qurry: "failed qurry" });
    // res.json(doc.map(doc => doc.username))
    res.send(doc);
  });
});
app.post("/deleteuser", (req, res) => {
  const userid = req.body.id;
  usersModel.remove({ _id: userid }, (err, doc) => {
    if (err) res.json({ qurry: "failed" });
    res.json({ status: "success qurry" });
  });
});

app.post("/updateuser", (req, res) => {});

app.put("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: put ");
});
app.delete("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: delete");
});

app.listen(port, () => {
  console.log("App running htpp://localhost:" + port);
});
