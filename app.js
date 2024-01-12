const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
var session = require("express-session");

require("dotenv").config(); // .config() 메서드에 인자를 전달하지 않음

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

connection.query("SET time_zone='Asia/Seoul'");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "gajigaji04",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.user_id = "";
  res.locals.name = "";

  if (req.session.member) {
    res.locals.user_id = req.session.member.user_id;
    res.locals.name = req.session.member.name;
  }
  next();
});

// 라우팅
app.get("/", (req, res) => {
  res.render("index"); // ./views/index.ejs
});

app.get("/profile", (req, res) => {
  res.render("profile", { member: req.session.member });
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

  var sql = `insert into contact (name, phone, email, memo, regdate) values(?, ?, ?, ?, now() )`;

  var values = [name, phone, email, memo];

  connection.query(sql, values, function (err, result) {
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
  connection.query(sql, function (err, lists, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(lists);
      res.render("contactList", { lists: lists });
    }
  });
});

// 회원 로그인
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/loginProc", (req, res) => {
  const user_id = req.body.user_id;
  const pw = req.body.pw;

  var sql = "SELECT * FROM member where user_id=? and pw=?";

  var values = [user_id, pw];

  connection.query(sql, values, function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.send(
        "<script>alert('존재하지 않는 아이디입니다.'); location.href='/login';</script>"
      );
    } else {
      //console.log(result[0]);

      req.session.member = result[0];

      res.send("<script>alert('환영합니다.'); location.href='/';</script>");
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.member = null;

  res.send(
    "<script>alert('로그아웃 되었습니다.'); location.href='/';</script>"
  );
});

app.listen(port, () => {
  console.log(`서버 실행 완료. 접속 주소: http://localhost:${port}`);
});
