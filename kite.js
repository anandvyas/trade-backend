Vue.component('my-orders', {
    template: `
      <section class="trades-wrap table-wrapper">
      <header class="row data-table-header">
        <h3 class="page-title small">
          <span class="title"><span>AngelDa - Intraday</span>
        </h3>
      </header>
  
      <div class="data-table fold-header">
        <div class="fund">
          <span class="fund"><input type="text" v-model="fund" /></span>
          <span class="icon icon-settings" @click="refreshFund()"></span>
        </div>
        <table class="table">
          <thead>
            <tr>
            <th>Instrument</th>
            <th>Quantity</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Diff</th>
            <th>ltp</th>
            <th>operation</th>
            </tr>
          </thead>
          <tbody>
          <template v-for="(val, key) in ticks">
            <tr>
              <td class="instrument right-border">{{ val.trading_symbole }}</td>
              <td>{{ val.quantity }}</td>
              <td>{{ val.buyer }}</td>
              <td>{{ val.seller }}</td>
              <td v-html="val.precentageDiff_html"></td>
              <td>{{ val.lastPrice }}</td>
              <td><input type="button" value="Buy" @click="placeOrder(100, val.lastPrice)" /></td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      </section>
    `,
    data() {
      return { 
        stocks: {
            1346049: { "trading_id": 1346049, "trading_symbole": "INDUSINDBK", "margin": 25.9 },
            4268801: { "trading_id": 4268801, "trading_symbole": "BAJAJFINSV", "margin": 20 },
            81153: { "trading_id": 81153, "trading_symbole": "BAJFINANCE", "margin": 20 },
            738561: { "trading_id": 738561, "trading_symbole": "RELIANCE", "margin": 10.15 },
            884737: { "trading_id": 884737, "trading_symbole": "TATAMOTORS", "margin": 20 },
            7458561: { "trading_id": 7458561, "trading_symbole": "INFRATEL", "margin": 20 },
            3834113: { "trading_id": 3834113, "trading_symbole": "POWERGRID", "margin": 7.9 },
            1270529: { "trading_id": 1270529, "trading_symbole": "ICICIBANK", "margin": 20 },
            2815745: { "trading_id": 2815745, "trading_symbole": "MARUTI", "margin": 9.99 },
            134657: { "trading_id": 134657, "trading_symbole": "BPCL", "margin": 22.01 },
            1510401: { "trading_id": 1510401, "trading_symbole": "AXISBANK", "margin": 20 },
            633601: { "trading_id": 633601, "trading_symbole": "ONGC", "margin": 25.48 },
            779521: { "trading_id": 779521, "trading_symbole": "SBIN", "margin": 20 },
            2714625: { "trading_id": 2714625, "trading_symbole": "BHARTIARTL", "margin": 20 },
            1207553: { "trading_id": 1207553, "trading_symbole": "GAIL", "margin": 9.92 },
            969473: { "trading_id": 969473, "trading_symbole": "WIPRO", "margin": 20 },
            2889473: { "trading_id": 2889473, "trading_symbole": "UPL", "margin": 20 },
            356865: { "trading_id": 356865, "trading_symbole": "HINDUNILVR", "margin": 7.74 },
            3861249: { "trading_id": 3861249, "trading_symbole": "ADANIPORTS", "margin": 20 },
            60417: { "trading_id": 60417, "trading_symbole": "ASIANPAINT", "margin": 8.31 },
            341249: { "trading_id": 341249, "trading_symbole": "HDFCBANK", "margin": 8.53 },
            232961: { "trading_id": 232961, "trading_symbole": "EICHERMOT", "margin": 10.43 },
            857857: { "trading_id": 857857, "trading_symbole": "SUNPHARMA", "margin": 9.17 },
            140033: { "trading_id": 140033, "trading_symbole": "BRITANNIA", "margin": 9.17 },
            895745: { "trading_id": 895745, "trading_symbole": "TATASTEEL", "margin": 20 },
            3465729: { "trading_id": 3465729, "trading_symbole": "TECHM", "margin": 9.51 },
            415745: { "trading_id": 415745, "trading_symbole": "IOC", "margin": 8.58 },
            177665: { "trading_id": 177665, "trading_symbole": "CIPLA", "margin": 9.17 },
            2953217: { "trading_id": 2953217, "trading_symbole": "TCS", "margin": 8.29 },
            2977281: { "trading_id": 2977281, "trading_symbole": "NTPC", "margin": 8.19 },
            345089: { "trading_id": 345089, "trading_symbole": "HEROMOTOCO", "margin": 10.5 },
            2939649: { "trading_id": 2939649, "trading_symbole": "LT", "margin": 9.06 },
            225537: { "trading_id": 225537, "trading_symbole": "DRREDDY", "margin": 8.02 },
            492033: { "trading_id": 492033, "trading_symbole": "KOTAKBANK", "margin": 20 },
            897537: { "trading_id": 897537, "trading_symbole": "TITAN", "margin": 10.28 },
            348929: { "trading_id": 348929, "trading_symbole": "HINDALCO", "margin": 13.63 },
            3001089: { "trading_id": 3001089, "trading_symbole": "JSWSTEEL", "margin": 13.14 },
            4267265: { "trading_id": 4267265, "trading_symbole": "BAJAJ-AUTO", "margin": 8.68 },
            315393: { "trading_id": 315393, "trading_symbole": "GRASIM", "margin": 20 },
            5215745: { "trading_id": 5215745, "trading_symbole": "COALINDIA", "margin": 8.74 },
            4598529: { "trading_id": 4598529, "trading_symbole": "NESTLEIND", "margin": 8.25 },
            2952193: { "trading_id": 2952193, "trading_symbole": "ULTRACEMCO", "margin": 8.99 },
            975873: { "trading_id": 975873, "trading_symbole": "ZEEL", "margin": 20 },
            408065: { "trading_id": 408065, "trading_symbole": "INFY", "margin": 9.18 },
            340481: { "trading_id": 340481, "trading_symbole": "HDFC", "margin": 12.94 },
            794369: { "trading_id": 794369, "trading_symbole": "SHREECEM", "margin": 9.21 },
            424961: { "trading_id": 424961, "trading_symbole": "ITC", "margin": 8.34 },
            1850625: { "trading_id": 1850625, "trading_symbole": "HCLTECH", "margin": 9.36 },
            784129: { "trading_id": 784129, "trading_symbole": "VEDL", "margin": 20 },
            519937: { "trading_id": 519937, "trading_symbole": "M&M", "margin": 15.10 }
          },
        ticks: {},
        fund: 211125,
        user_id: localStorage.getItem('__storejs_kite_user_id')
        
      }
    },
    created() {
      
      
      setInterval(() => {
            this.ticks = this.filterData(JSON.parse(localStorage.getItem('__storejs_kite_ticker/ticks')));
        }, 1000)
    },
    methods: {
      filterData: function(obj){
        var vm = this;
        let validdata = {};
        for (const key in obj) {
          if(vm.stocks[key]){
             validdata[key] =  obj[key]; 
             validdata[key]['trading_symbole'] =  vm.stocks[key]['trading_symbole']; 
             validdata[key]['trading_id'] =  vm.stocks[key]['trading_id']; 
             validdata[key]['margin'] =  vm.stocks[key]['margin']; 
             validdata[key]['ltp_margin'] =  obj[key]['lastPrice'] * vm.stocks[key]['margin'] / 100; 
             validdata[key]['buyer'] =  obj[key]['totalBuyQuantity'] | 0; 
             validdata[key]['seller'] =  obj[key]['totalSellQuantity'] | 0; 
            
             let percentageClass = validdata[key]['buyer'] >= validdata[key]['seller'] ? "green" : "red";
             let precentageDiff = 100 * Math.abs( (validdata[key]['buyer'] - validdata[key]['seller']) / ( ( validdata[key]['buyer'] + validdata[key]['seller'])/2 ) );
            
             validdata[key]['precentageDiff'] =  percentageClass;
             validdata[key]['precentageDiff_html'] =  '<p style="color:' + percentageClass + ';">' + precentageDiff +'</p>';
             validdata[key]['quantity'] =  Math.round(vm.fund / validdata[key]['ltp_margin']) - 1; 
          }
          
        }
        
        return validdata;
      },          
      placeOrder : function(quantity,price){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: quantity, price: price, exchange: "NSE", transaction_type: "BUY", order_type: "LIMIT", product: "CNC", validity: "DAY", 
                                disclosed_quantity: 0, trigger_price:0, squareoff: 0, stoploss: 0, trailing_stoploss: 0, variety: "regular", user_id: this.user_id })
        };
        
        console.log(requestOptions);
      },
      refreshFund: async function(){
        
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: 0, price: 0, exchange: "NSE", transaction_type: "BUY", order_type: "LIMIT", product: "CNC", validity: "DAY", 
                                disclosed_quantity: 0, trigger_price:0, squareoff: 0, stoploss: 0, trailing_stoploss: 0, variety: "regular", user_id: this.user_id })
        };
        
  //       const headers = { "Content-Type": "application/json, text/plain, */*" };
  //       fetch('https://anandvyas.in/getdata', { headers }).then(response => {
  //         console.log('response came');
  //       })
        
      },
      sendRequest: async function(){
        
        const headers = { 
          "Content-Type": "application/json, text/plain, */*",
          "authorization": "enctoken " + localStorage.getItem('__storejs_kite_enctoken'),
          "cookie": document.cookie,
          "Referer": "https://kite.zerodha.com/funds",
          "x-kite-version": "2.3.6"
        };
        
        fetch('https://anandvyas.in/getdatayyy', { headers }).then(response => {
          console.log('response came');
        })
        
        console.log(headers);
      }
    }
  });
  
  
  window.onload = function (){
    
    var container = document.querySelector('.orderbook');
    var t = document.createElement("div");
    t.setAttribute("id", "angelda");
    container.append(t);
    
    new Vue({
    el: '#angelda',
    template: '<my-orders></my-orders>'
  })
  }
  