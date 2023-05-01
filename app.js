const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const env = require("./.env");
const getUserFromJwt = require("./middlewares/getUserFromJwt");
const app = express();

//routers
const apiRouter = require("./routers");

//db연결
mongoose.connect(env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("disconnected", (err) => {
  if (err) {
    console.log(`MongoDB 연결중 에러 발생: ` + err);
  }
  console.log("MongoDB disconnected");
  console.log("byebye");
});
//cors 설정해야함, http://example.com 도메인에서의 요청만 허용하도록
// const corsOptions = {
//   origin: 'http://example.com',
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//const dir_name ='/home/elice/server/back-end/uploads/'
require("./passport")();
// 애플리케이션 수준 미들웨어
app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
//app.use(express.static('public')); // 정적 파일 서비스
//app.use(express.static('back-end/'));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "back-end", "uploads"))
);
//app.use('/',express.static(dir_name))
//app.use(dir_name, express.static('public'))
//app.use(express.static(dir_name + 'uploads/'));
//app.use('/static', express.static(__dirname, '/uploads'));

// app.use(logger('dev'));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//    session({
//       secret: 'secret',
//       resave: false,
//       saveUninitialized: true,
//    })
// );

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(passport.initialize());
app.use(cors(corsOptions));
app.use("/api", apiRouter);
//app.use('/uploads', express.static('/uploads'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

app.get("/", (req, res) => {
  res.send("this is HOME PAGE");
});

//서버연결
app.listen(env.PORT, "0.0.0.0", (err) => {
  if (err) {
    console.log(`서버 연결 실패 : ${err}`);
  } else {
    console.log(`${env.PORT}서버 연결 성공`);
  }
});
