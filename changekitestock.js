Vue.component('my-graph', {
    template: `
      <section class="trades-wrap table-wrapper">
      <div v-model="previous" @click="changeStock(previous)">Previous</div>
      <select v-model="selected" @change="onChange($event)">
      <option v-for="(value, key) in stocks" v-bind:value="key">
        {{ value.trading_symbole }}
      </option>
      </select>
      <div v-model="next" @click="changeStock(next)">Next</div>
      </section>
    `,
    data() {
      return { 
        previous: 0,
        selected: 0,
        next: 0,
        stocks: [
            { "instrument_id": 1346049, "trading_symbole": "INDUSINDBK" },
            { "instrument_id": 4268801, "trading_symbole": "BAJAJFINSV" },
            { "instrument_id": 81153, "trading_symbole": "BAJFINANCE" },
            { "instrument_id": 738561, "trading_symbole": "RELIANCE" },
            { "instrument_id": 884737, "trading_symbole": "TATAMOTORS" },
            { "instrument_id": 7458561, "trading_symbole": "INFRATEL" },
            { "instrument_id": 3834113, "trading_symbole": "POWERGRID" },
            { "instrument_id": 1270529, "trading_symbole": "ICICIBANK" },
            { "instrument_id": 2815745, "trading_symbole": "MARUTI" },
            { "instrument_id": 134657, "trading_symbole": "BPCL" },
            { "instrument_id": 1510401, "trading_symbole": "AXISBANK" },
            { "instrument_id": 633601, "trading_symbole": "ONGC" },
            { "instrument_id": 779521, "trading_symbole": "SBIN" },
            { "instrument_id": 2714625, "trading_symbole": "BHARTIARTL" },
            { "instrument_id": 1207553, "trading_symbole": "GAIL" },
            { "instrument_id": 969473, "trading_symbole": "WIPRO" },
            { "instrument_id": 2889473, "trading_symbole": "UPL" },
            { "instrument_id": 356865, "trading_symbole": "HINDUNILVR" },
            { "instrument_id": 3861249, "trading_symbole": "ADANIPORTS" },
            { "instrument_id": 60417, "trading_symbole": "ASIANPAINT" },
            { "instrument_id": 341249, "trading_symbole": "HDFCBANK" },
            { "instrument_id": 232961, "trading_symbole": "EICHERMOT" },
            { "instrument_id": 857857, "trading_symbole": "SUNPHARMA" },
            { "instrument_id": 140033, "trading_symbole": "BRITANNIA" },
            { "instrument_id": 895745, "trading_symbole": "TATASTEEL" },
            { "instrument_id": 3465729, "trading_symbole": "TECHM" },
            { "instrument_id": 415745, "trading_symbole": "IOC" },
            { "instrument_id": 177665, "trading_symbole": "CIPLA" },
            { "instrument_id": 2953217, "trading_symbole": "TCS" },
            { "instrument_id": 2977281, "trading_symbole": "NTPC" },
            { "instrument_id": 345089, "trading_symbole": "HEROMOTOCO" },
            { "instrument_id": 2939649, "trading_symbole": "LT" },
            { "instrument_id": 225537, "trading_symbole": "DRREDDY" },
            { "instrument_id": 492033, "trading_symbole": "KOTAKBANK" },
            { "instrument_id": 897537, "trading_symbole": "TITAN" },
            { "instrument_id": 348929, "trading_symbole": "HINDALCO" },
            { "instrument_id": 3001089, "trading_symbole": "JSWSTEEL" },
            { "instrument_id": 4267265, "trading_symbole": "BAJAJ-AUTO" },
            { "instrument_id": 315393, "trading_symbole": "GRASIM" },
            { "instrument_id": 5215745, "trading_symbole": "COALINDIA" },
            { "instrument_id": 4598529, "trading_symbole": "NESTLEIND" },
            { "instrument_id": 2952193, "trading_symbole": "ULTRACEMCO" },
            { "instrument_id": 975873, "trading_symbole": "ZEEL" },
            { "instrument_id": 408065, "trading_symbole": "INFY" },
            { "instrument_id": 340481, "trading_symbole": "HDFC" },
            { "instrument_id": 794369, "trading_symbole": "SHREECEM" },
            { "instrument_id": 424961, "trading_symbole": "ITC" },
            { "instrument_id": 1850625, "trading_symbole": "HCLTECH" },
            { "instrument_id": 784129, "trading_symbole": "VEDL" },
            { "instrument_id": 519937, "trading_symbole": "M&M" }
          ]
        
      }
    },
    created() {
      let selectedStock = localStorage.getItem('selectedStock');
      if(selectedStock){
        this.getTri(selectedStock);
      }else{
        this.getTri();
      }
    },
    methods: {
      getTri : function(instrument_id = false){
        if (instrument_id){
          for (let i = 0; i < this.stocks.length; i++) {
            if(this.stocks[i].instrument_id == instrument_id){
              console.log("instrument_id found");
              if(i == 0){
                this.previous = false;
                this.selected = i;
                this.next = i + 1;
              }else{
                this.previous = i - 1;
                this.selected = i;
                this.next = i + 1;
              }
            }
          }
        }else{  
          this.previous = false;
          this.selected = 0;
          this.next = 1;
        }
        
        console.log(this.previous)
        console.log(this.selected)
        console.log(this.next)
          
      },
      onChange : function(event){
        this.changeStock(this.selected);
      },
      changeStock : function (key){
        let current = JSON.parse(localStorage.getItem('mc_list'));
        var urlParams = new URLSearchParams(window.location.search);
        
        let index = urlParams.get('mc');
        
        let selectedStock = this.stocks[key];
        
        let json = [];
        json.push({ name: selectedStock.trading_symbole, token: selectedStock.instrument_id, segment: "NSE" });
        json.push({ name: selectedStock.trading_symbole, token: selectedStock.instrument_id, segment: "NSE" });
        json.push({ name: selectedStock.trading_symbole, token: selectedStock.instrument_id, segment: "NSE" });
        json.push({ name: selectedStock.trading_symbole, token: selectedStock.instrument_id, segment: "NSE" });
        
        current[index] = json;
        localStorage.setItem('mc_list', JSON.stringify(current));
        localStorage.setItem('selectedStock', selectedStock.instrument_id );
        location.reload();
      }
    }
  });
  
  window.onload = function (){
    
    var container = document.querySelector('.chart-page');
    var t = document.createElement("div");
    t.setAttribute("id", "angelda");
    container.append(t);
  
    
    new Vue({
    el: '#angelda',
    template: '<my-graph></my-graph>'
  })
  }