### Before excuting any command we need to login on zero
# At morning 9 hit login api
Asia/Kolkata
sudo timedatectl set-timezone Asia/Kolkata

### We need four argument to pass into the docker 
- api_key
- access_token
- tradingsymbol
- instrument_id

const api_key = process.env.API_KEY;
const access_token = process.env.ACCESS_TOKEN;
const trading_symbol = process.env.TRANDING_SYMBOL;
const instrument_id = process.env.INSTRUMENT_ID;

docker run -d --rm -e INSTRUMENT_ID="1510401" -v $(pwd):/usr/src/app master:latest
docker run -d --rm -e INSTRUMENT_ID="1270529" -v $(pwd):/usr/src/app master:latest
docker run -d --rm -e INSTRUMENT_ID="1207553" -v $(pwd):/usr/src/app master:latest
docker run -d --rm -e INSTRUMENT_ID="341249" -v $(pwd):/usr/src/app master:latest
docker run -d --rm -e INSTRUMENT_ID="2939649" -v $(pwd):/usr/src/app master:latest

### Ticker Connect WS
- connect -  when connection is successfully established.
- ticks - when ticks are available (Arrays of `ticks` object as the first argument).
- disconnect - when socket connection is disconnected. Error is received as a first param.
- error - when socket connection is closed with error. Error is received as a first param.
- close - when socket connection is closed cleanly.
- reconnect - When reconnecting (current re-connection count and reconnect interval as arguments respectively).
- noreconnect - When re-connection fails after n number times.
- order_update - When order update (postback) is received for the connected user (Data object is received as first argument).