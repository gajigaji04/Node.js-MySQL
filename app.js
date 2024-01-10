const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

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

// 문의사항 MySQL 저장
app.post("/contactProc", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  var sql = `insert into contact (name, phone, email, memo, regdate) values('${name}', '${phone}','${email}','${memo}', now() )`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err);
      res.send(
        "<script>alert('문의사항 등록 불가');location.href='/';</script>"
      );
      return;
    }

    console.log(`자료 1개를 저장했습니다.`);
    res.send(
      "<script>alert('문의사항이 등록되었습니다.'); location.href='/';</script>"
    );
  });
});

// 문의사항 삭제
app.get("/contactDelete", (req, res) => {
  var idx = req.query.idx;
  var sql = `DELETE FROM contact WHERE idx='${idx}'`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(
      "<script>alert('문의사항이 삭제되었습니다.'); location.href='/contactList';</script>"
    );
  });
});

// 문의사항 리스트 표시
app.get("/contactList", (req, res) => {
  var sql = "SELECT * FROM contact";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render("contactList", { lists: result });
  });
});

app.listen(port, () => {
  console.log(`서버 실행 완료. 접속 주소: http://localhost:${port}`);
});
