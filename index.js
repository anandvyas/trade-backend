const server = require("http").createServer();
const KiteConnect = require("kiteconnect").KiteConnect;
const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

var session = require("./configs/session.json");

app.use(cors());

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: "./logs/all-logs.log",
      json: false
    }),
    new transports.Console(),
  ],
});

var kc = new KiteConnect({ api_key: session.api_key });

app.get("/", function (req, res) {
  res.send("Welcome to Anand's world...");
});

app.get("/zerodha/login", async (req, res) => {
  logger.info("Login hit");
  let request_token = req.query.request_token;
  kc.generateSession(request_token, session.secret_key)
    .then(function (response) {
      session.access_token = response.access_token;
      session.public_token = response.public_token;
      fs.writeFile("./configs/session.json", JSON.stringify(session), function (
        err
      ) {
        if (err) throw err;
        logger.info("session write in file successfully");
      });
      res.json({
        status: true,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(4000, () => console.log(`Example app listening on port 4000`));
