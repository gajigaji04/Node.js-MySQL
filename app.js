const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 5000;
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

// 라우팅
app.get("/", (req, res) => {
  res.render("index"); // ./views/index.ejs
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contactProc", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  var a = `${name} ${phone} ${email} ${memo}`;

  res.send(a);
});

app.listen(port, () => {
  console.log(`서버 실행 완료. 접속 주소: http://localhost:${port}`);
});
