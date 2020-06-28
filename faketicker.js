// three data we need 1. tradingsymbol 2. date 3. start time
const server = require("http").createServer();
const io = require("socket.io")(server);
const LineByLineReader = require("line-by-line");
const fs = require("fs");

const trading_symbol = "AXISBANK";
const date = process.env.DATE | "20200605";
const start_time = process.env.START_TIME | "9:15";

const filename = "data/" + trading_symbol + "-" + date + ".txt"

var lineno = 0;
io.on("connection", function (socket) {
  console.log("Connection establish with client");
  let lr = new LineByLineReader(filename);
  lr.on("error", function (err) { 
    console.log(err);
  });
  lr.on("line", function (line) {
    lr.pause();
    setTimeout(function () {
      sendStockData(socket, line.trim());
      lr.resume();
    }, 1000);
  });
  lr.on("end", function () {});
});

const sendStockData = (socket, line) => {
  line = line.replace(/(\r\n|\n|\r)/gm, "");
  let json = JSON.parse(line);
  socket.emit("data", json);
};

server.listen(5000, function (err) {
  if (err) throw err;
  console.log("listening on port 5000");
});
