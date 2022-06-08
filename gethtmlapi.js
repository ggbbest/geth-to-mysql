// yarn add axios
// let Parser = require('rss-parser');
// let parser = new Parser();
let axios = require('axios');

////////////////////////////////////////////////////////////////
var mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
var db_config = require(__dirname + '/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());
////////////////////////////////////////////////////////////////
let _krw = 1254.80;
let result_KRW = sync_connection.query("SELECT krw,BTC,BTC_KRW,ETH,ETH_KRW FROM show_krw where idx=1 ");
_krw      = result_KRW[0].krw;
let _BTC      = result_KRW[0].BTC;
let _BTC_KRW  = result_KRW[0].BTC_KRW;
let _ETH      = result_KRW[0].ETH; 
let _ETH_KRW  = result_KRW[0].ETH_KRW;

async function main(){
  //#####################
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
  var sql_upd1 = "update show_krw set BTC="+BTC_PRICE+",BTC_KRW=krw *"+BTC_PRICE+",ETH="+ETH_PRICE+",ETH_KRW=krw *"+ETH_PRICE+" WHERE idx=1;";
  var rsql_upd1 = con.query(sql_upd1);

  //#####################

  
  let send_msg ="";
  let send_msg_save = false;

  let url = 'https://api.whale-alert.io/v1/transactions?api_key='+process.env.wHALEAPI_KEY+'&min_value=500000&limit=2&currency=usdt';
  axios.get(url)
  .then((res) => {
    // console.log(res.data.transactions);
    let rcvData = res.data.transactions;
    let i=0;
    rcvData.forEach(item => {
      i++;
      let blockchain      = item.blockchain.replace(/'/g, "`");
      let symbol          = item.symbol.replace(/'/g, "`");
      let id              = item.id.replace(/'/g, "`");
      let transaction_type = item.transaction_type.replace(/'/g, "`");
      let hash            = item.hash.replace(/'/g, "`");
      let from_address    = item.from.address.replace(/'/g, "`");
      let from_owner_type = item.from.owner_type.replace(/'/g, "`");
      let to_address      = item.to.address.replace(/'/g, "`");
      let to_owner_type   = item.to.owner_type.replace(/'/g, "`");
      let timestamp       = item.timestamp;
      let amount          = item.amount;
      let amount_usd      = item.amount_usd;
      let transaction_count = item.transaction_count;
      if(i<5){
        let result5 = sync_connection.query("SELECT count(id) dupChk FROM whaleTr where id= "+id);
        var dupChk = result5[0].dupChk;
        if(dupChk==0){
          let sql = "INSERT INTO whaleTr (blockchain,symbol,id,transaction_type,hash,from_address,from_owner_type,to_address,to_owner_type,timestamp,amount,amount_usd,transaction_count ) ";
          sql = sql + " VALUES ('" + blockchain+"','"+symbol+"','"+id+"','"+transaction_type+"','"+hash+"','"+from_address+"','"+from_owner_type+"','"+to_address+"','"+to_owner_type+"',"+timestamp+","+amount+","+amount_usd+","+transaction_count+"); ";
          console.log(sql);
          con.query(sql, function(err, result) {
            if (err) throw err;
          });
          if(!send_msg_save){
            if(from_owner_type=="unknown"){from_owner_type="특정";}
            if(to_owner_type=="unknown"){to_owner_type="특정";}
            // send_msg = encodeURI(blockchain+"☆"+symbol+" "+from_owner_type+" 에서 "+to_owner_type+" 지갑으로 ☆ "+amount_usd+"$ 출금("+jsfn_numb2Krw(amount_usd)+"원) 확인 포착 출처 - https://web.c4ei.net");
            send_msg = encodeURI("☆"+symbol+" "+"☆"+from_owner_type+"지갑 에서 "+to_owner_type+"지갑으로 ☆ "+(amount_usd).toLocaleString('ko-KR')+"$ 입출금("+jsfn_numb2Krw(amount_usd)+"원) 확인 포착 <br/>현재 비트코인 달러 가격 : $"+(_BTC).toLocaleString('en-US')+" 현재 비트코인 원화 가격 : "+(_BTC_KRW).toLocaleString('ko-KR')+" 원 <br/> ETH 달러 가격 : $"+(_ETH).toLocaleString('en-US')+" 현재 ETH 원화 가격 : "+(_ETH_KRW).toLocaleString('ko-KR')+" 원 ");
            send_msg_save = true;

            let url2 = 'https://api.telegram.org/'+process.env.TeleBot+'/sendMessage?chat_id='+process.env.TeleChatId+'&text='+send_msg;
            axios.get(url2).then((res) => {
              console.log("telegram : " + send_msg);
            }).catch(error => {
              console.log(error);
            });

            var sql3 = "DELETE FROM whaleTr WHERE regdate < DATE_ADD(NOW(), INTERVAL -1 DAY);";
            var result3 = con.query(sql3);
            console.log(sql3);
          }
        }
      }
    });
  }).catch(error => {
    console.log(error);
  });

  // https://api.telegram.org/bot5425504638:AAE517IWgNSbcnMlumqh5glwUKBiQ4UqGsg/sendMessage?chat_id=-1001638921944&text=
  // 🔴 Binance 에서 알 수 없는 지갑으로 🔴
  // 대략 499 BTC :: (165억) 출금 확인 포착
  // 현재 비트코인 달러 가격 : $29,727
  // 현재 비트코인 원화 가격 : 37,720,000원
  // 출처 - https://web.c4ei.net

  console.log(getCurTimestamp() +" / runnung !!!");
  // ####################################
}

function jsfn_numb2Krw(number) {
  var inputNumber = number < 0 ? false : number;
  inputNumber = inputNumber*_krw;  // krw
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";

  for (var i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}

function getCurTimestamp() {
  const d = new Date();

  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    )
  // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
  // and we want the first part ("2017-08-22")
  ).toISOString().replace('T','_').replace('Z','');
}

main();
const interval = setInterval(() => { main(); console.log('====== 15 Sec 마다 실행 ======'); }, 1000*15);
