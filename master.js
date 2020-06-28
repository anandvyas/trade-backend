const KiteTicker = require("kiteconnect").KiteTicker;
const { createLogger, transports, format } = require("winston");
const moment = require("moment");
const fs = require("fs");

const session = require("./configs/session.json");
const stocks = require("./configs/stocks.json");

const instrument_id = process.env.INSTRUMENT_ID;
const trading_symbol = stocks[instrument_id];

const datetime = moment().format("YYYYMMDD");

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: `./logs/${trading_symbol}-${datetime}.log`,
      json: false,
    }),
    new transports.Console(),
  ],
});

const ticker = new KiteTicker({
  api_key: session.api_key,
  access_token: session.access_token,
});

const filename = `./data/${trading_symbol}-${datetime}.txt`;
var wstream = fs.createWriteStream(filename);

ticker.connect();
ticker.on("ticks", onTicks);
ticker.on("connect", subscribe);
ticker.on("error", error);

function onTicks(ticks) {
  tick = ticks[0];
  var tmp = JSON.stringify(tick);
  // concept of sell and buy

  // save value in file
  wstream.write(tmp + "\r\n", (err) => {
    if (err) console.log(err.message);
  });
}

function subscribe() {
  logger.info('connected !!!')
  var items = [instrument_id];
  ticker.subscribe(items);
  ticker.setMode(ticker.modeFull, items);
}

function error(err) {
  ticker.disconnect();
  logger.error(err.message);
}
