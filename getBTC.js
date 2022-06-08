let axios = require('axios');
let BTC_PRICE=30523.4;
let ETH_PRICE=1807.0649;

let url1 = 'https://contract.mexc.com/api/v1/contract/index_price/BTC_USDT';
axios.get(url1)
.then((res) => {
    if(res.data.success){ 
        console.log(res.data.data.symbol +" : "+ res.data.data.indexPrice); 
        BTC_PRICE = res.data.data.indexPrice;
    }
}).catch(error => { console.log(error);});

let url2 = 'https://contract.mexc.com/api/v1/contract/index_price/ETH_USDT';
axios.get(url2)
.then((res) => {
    if(res.data.success){ 
        console.log(res.data.data.symbol +" : "+ res.data.data.indexPrice); 
        ETH_PRICE = res.data.data.indexPrice;
    }
}).catch(error => { console.log(error);});
